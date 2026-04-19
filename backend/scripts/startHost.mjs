import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const args = ["start", "--port", "4000"];

function run(command, commandArgs) {
  const child = spawn(command, commandArgs, {
    stdio: "inherit",
    shell: process.platform === "win32"
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 1);
  });

  child.on("error", (error) => {
    console.error(error.message);
    process.exit(1);
  });
}

if (process.platform === "win32") {
  const appData = process.env.APPDATA;
  const globalFuncCmd = appData ? path.join(appData, "npm", "func.cmd") : "";

  if (globalFuncCmd && fs.existsSync(globalFuncCmd)) {
    run(globalFuncCmd, args);
  } else {
    console.error(
      "Azure Functions Core Tools was not found at %APPDATA%\\npm\\func.cmd. Install it with: npm install -g azure-functions-core-tools@4"
    );
    process.exit(1);
  }
} else {
  run("func", args);
}