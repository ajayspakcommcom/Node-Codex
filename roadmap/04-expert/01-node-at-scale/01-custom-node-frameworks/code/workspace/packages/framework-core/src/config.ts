import { type ConfigFieldDefinition } from "./types.js";

export function validateConfig(
  schema: Record<string, ConfigFieldDefinition>,
  source: Record<string, string | undefined>,
): Record<string, unknown> {
  const config: Record<string, unknown> = {};

  for (const [key, definition] of Object.entries(schema)) {
    const rawValue = source[key];

    if (definition.required && !rawValue) {
      throw new Error(`missing required config: ${key}`);
    }

    if (rawValue === undefined) {
      continue;
    }

    config[key] = definition.parse ? definition.parse(rawValue) : rawValue;
  }

  return config;
}
