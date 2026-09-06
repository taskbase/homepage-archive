#!/usr/bin/env python3
"""Crude SCSS -> CSS flattener.

Enough for the old AngularJS-era stylesheets in this museum: nesting, `&`
parent refs, `$var` substitution. There is no sass binary on this box and we
refuse to install one, so this trades correctness for "renders close enough".
Unsupported at-rules (@include, @extend, @mixin bodies) are dropped.
"""
import re
import sys
from pathlib import Path

VAR_DEF = re.compile(r"^\s*(\$[\w-]+)\s*:\s*(.+?);\s*(?://.*)?$")
DROP_AT = re.compile(r"^\s*@(include|extend|import|mixin|function|return|if|else|each)\b")


def read_vars(paths):
    variables = {}
    for path in paths:
        for line in Path(path).read_text(errors="replace").splitlines():
            match = VAR_DEF.match(line)
            if match:
                variables[match.group(1)] = match.group(2).strip()
    for _ in range(4):
        for name, value in list(variables.items()):
            variables[name] = substitute(value, variables)
    return variables


def substitute(text, variables):
    for name in sorted(variables, key=len, reverse=True):
        text = text.replace(name, variables[name])
    # lighten()/darken() have no implementation here; keep the base colour.
    return re.sub(r"\b(?:lighten|darken)\(\s*([^,()]+?)\s*,[^()]*\)", r"\1", text)


def strip_comments(text):
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return re.sub(r"(?<!:)//[^\n]*", "", text)


def flatten(scss, variables, prefix=""):
    scss = strip_comments(scss)
    out = []
    _walk(scss, [prefix] if prefix else [], out)
    return "\n".join(substitute(rule, variables) for rule in out)


def _walk(body, parents, out):
    declarations, index = [], 0
    while index < len(body):
        brace = body.find("{", index)
        semi = body.find(";", index)
        if brace == -1 and semi == -1:
            break
        if brace == -1 or (semi != -1 and semi < brace):
            declarations.append(body[index:semi + 1].strip())
            index = semi + 1
            continue
        selector = body[index:brace].strip()
        close = _match_brace(body, brace)
        inner = body[brace + 1:close]
        index = close + 1
        if selector.startswith("@"):
            if not DROP_AT.match(selector):
                nested = []
                _walk(inner, parents, nested)
                out.append(selector + " {\n" + "\n".join(nested) + "\n}")
            continue
        _walk(inner, _join(parents, selector), out)
    kept = [d for d in declarations if d and not DROP_AT.match(d)]
    if kept and parents:
        out.append(", ".join(parents) + " {\n  " + "\n  ".join(kept) + "\n}")


def _join(parents, selector):
    combined = []
    for part in (p.strip() for p in selector.split(",")):
        for parent in parents or [""]:
            if part.startswith("&"):
                combined.append((parent + part[1:]).strip())
            else:
                combined.append(f"{parent} {part}".strip())
    return combined


def _match_brace(text, start):
    depth = 0
    for pos in range(start, len(text)):
        if text[pos] == "{":
            depth += 1
        elif text[pos] == "}":
            depth -= 1
            if depth == 0:
                return pos
    return len(text) - 1


if __name__ == "__main__":
    var_files = [a[7:] for a in sys.argv[1:] if a.startswith("--vars=")]
    sources = [a for a in sys.argv[1:] if not a.startswith("--")]
    table = read_vars(var_files)
    print("\n".join(flatten(Path(s).read_text(errors="replace"), table) for s in sources))
