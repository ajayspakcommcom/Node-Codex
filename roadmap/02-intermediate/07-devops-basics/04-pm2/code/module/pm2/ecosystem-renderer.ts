import type { Pm2AppConfig, Pm2EcosystemSpec } from "../../shared/pm2-types.js";

function renderApp(app: Pm2AppConfig): string[] {
  const lines = [
    "{",
    `  name: "${app.name}",`,
    `  script: "${app.script}",`,
  ];

  if (app.instances !== undefined) {
    lines.push(`  instances: ${typeof app.instances === "string" ? `"${app.instances}"` : app.instances},`);
  }

  if (app.execMode) {
    lines.push(`  exec_mode: "${app.execMode}",`);
  }

  if (app.watch !== undefined) {
    lines.push(`  watch: ${app.watch},`);
  }

  if (app.autorestart !== undefined) {
    lines.push(`  autorestart: ${app.autorestart},`);
  }

  if (app.maxRestarts !== undefined) {
    lines.push(`  max_restarts: ${app.maxRestarts},`);
  }

  if (app.env) {
    lines.push("  env: {");
    for (const [key, value] of Object.entries(app.env)) {
      lines.push(`    ${key}: "${value}",`);
    }
    lines.push("  },");
  }

  if (app.envProduction) {
    lines.push("  env_production: {");
    for (const [key, value] of Object.entries(app.envProduction)) {
      lines.push(`    ${key}: "${value}",`);
    }
    lines.push("  },");
  }

  if (app.errorFile) {
    lines.push(`  error_file: "${app.errorFile}",`);
  }

  if (app.outFile) {
    lines.push(`  out_file: "${app.outFile}",`);
  }

  lines.push("}");
  return lines;
}

export function renderEcosystem(spec: Pm2EcosystemSpec): string {
  const appBlocks = spec.apps.map((app) => renderApp(app).join("\n")).join(",\n");
  return `module.exports = {\n  apps: [\n${appBlocks
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n")}\n  ]\n};`;
}
