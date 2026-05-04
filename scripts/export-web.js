const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const projectRoot = path.resolve(__dirname, "..");
const tempDir = path.join(projectRoot, ".temp");
const expoCli = path.join(projectRoot, "node_modules", "expo", "bin", "cli");

fs.mkdirSync(tempDir, { recursive: true });

const result = spawnSync(
  process.execPath,
  ["--max-old-space-size=4096", expoCli, "export", "--platform", "web"],
  {
    cwd: projectRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      TEMP: tempDir,
      TMP: tempDir
    }
  }
);

process.exit(result.status ?? 1);
