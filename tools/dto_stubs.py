#!/usr/bin/env python3
"""Grow stubs for the DTO typings a Gradle typescript-generator would emit.

Only needed for 2023-angular-monorepo. common/client/ai/ai-dto.generated.ts and
common/client/lap-sdk-types/internal/lap-sdk-types.generated.ts come from
"./gradlew generateTypeScript", which needs the whole Kotlin backend to compile.

Reads an ng build log, collects every "has no exported member" name per module
and appends it to that module's stub. Each name gets a type alias to any and a
Proxy value, so enum-style uses like Correctness.WRONG still resolve. Run, build
again, run again until the log is clean.

    python3 tools/dto_stubs.py <ng-build.log> <monorepo-root>
"""
import pathlib
import re
import sys

MISSING = re.compile(
    r'error TS2305: Module \'"@taskbase/([a-z-]+)"\' has no exported member \'([A-Za-z0-9_]+)\'')

TARGETS = {
    'ai': 'common/client/ai/ai-dto.generated.ts',
    'lap-sdk-types': 'common/client/lap-sdk-types/internal/lap-sdk-types.generated.ts',
}

HEADER = ('// Stub for the Gradle "generateTypeScript" output, which needs the whole\n'
          '// Kotlin backend to compile. Types only; enum values echo their own key.\n'
          'const proxy: any = new Proxy({}, { get: (_t, k) => k });\n')


def main(log_path: pathlib.Path, root: pathlib.Path):
    log = log_path.read_text(errors='replace')
    found = {module: set() for module in TARGETS}
    for module, name in MISSING.findall(log):
        if module in found:
            found[module].add(name)

    for module, names in found.items():
        path = root / TARGETS[module]
        text = path.read_text() if path.exists() else ''
        if not text.strip():
            text = HEADER
        have = set(re.findall(r'export type (\w+)', text))
        new = sorted(names - have)
        for name in new:
            text += '\nexport type %s<A = any, B = any, C = any> = any;\nexport const %s: any = proxy;\n' % (name, name)
        path.write_text(text)
        print(module, '+%d (total %d)' % (len(new), len(have | names)))


if __name__ == '__main__':
    main(pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2]))
