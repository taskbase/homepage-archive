const writeFile = require("fs").writeFile;

// Configure Angular `environment.ts` file path
const targetPath = "./src/environments/environment.ts";
const targetPathDev = "./src/environments/environment.dev.ts";
const targetPathStaging = "./src/environments/environment.staging.ts";
const targetPathProd = "./src/environments/environment.prod.ts";

// Load node modules
const colors = require("colors");
require("dotenv").load();

// `environment.ts` file structure
function envFileContent(
  production: boolean,
  apiRoot: string,
  lapUrl: string,
  xForwardedHost: string
): string {
  return `import {HomepageEnvironment} from './environment.model';

export const environment: HomepageEnvironment = {
  production: ${production},
  studentPassword: '${process.env.SANDBOX_STUDENT_PASSWORD}',
  studentEmail: 'sandbox-student@taskbase.com',
  apiRoot: '${apiRoot}',
  lapApiRoot: '${lapUrl}',
  xForwardedHost: '${xForwardedHost}'
};
`;
}

function writeEnvFileToPath(path: string, content: string) {
  writeFile(path, content, (err: any) => {
    if (err) {
      throw console.error(err);
    } else {
      console.info(
        colors.magenta(
          `Angular environment.ts file generated correctly at ${path} \n`
        )
      );
    }
  });
}

writeEnvFileToPath(
  targetPath,
  envFileContent(
    false,
    "https://staging-gateway.taskbase.com",
    "http://localhost:50800/api",
    "sandbox.localhost"
  )
);
writeEnvFileToPath(
  targetPathDev,
  envFileContent(
    true,
    "https://staging-gateway.taskbase.com",
    "https://lap.taskbase.com/api",
    "sandbox.taskbase.com"
  )
);
writeEnvFileToPath(
  targetPathStaging,
  envFileContent(
    true,
    "https://staging-gateway.taskbase.com",
    "https://lap.taskbase.com/api",
    "sandbox.taskbase.com"
  )
);
writeEnvFileToPath(
  targetPathProd,
  envFileContent(
    true,
    "https://gateway.taskbase.com",
    "https://lap.taskbase.com/api",
    "sandbox.taskbase.com"
  )
);
