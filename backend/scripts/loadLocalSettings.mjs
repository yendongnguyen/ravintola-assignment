import fs from "node:fs";
import path from "node:path";

const localSettingsPath = path.join(process.cwd(), "local.settings.json");

if (fs.existsSync(localSettingsPath)) {
  const rawSettings = JSON.parse(fs.readFileSync(localSettingsPath, "utf8"));
  const values = rawSettings?.Values ?? {};

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "string" && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}