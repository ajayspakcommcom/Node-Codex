import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface NativeHashBinding {
  hashImage(input: Buffer): {
    algorithm: string;
    hash: string;
  };
}

const require = createRequire(import.meta.url);
const currentDirectory = dirname(fileURLToPath(import.meta.url));

function isNativeHashBinding(value: unknown): value is NativeHashBinding {
  return typeof value === "object" && value !== null && "hashImage" in value;
}

export function loadNativeBinding(): NativeHashBinding | undefined {
  const candidates = [
    join(currentDirectory, "..", "build", "Release", "native_image_hash.node"),
    join(currentDirectory, "..", "build", "Debug", "native_image_hash.node"),
  ];

  for (const candidate of candidates) {
    if (!existsSync(candidate)) {
      continue;
    }

    try {
      const loadedModule = require(candidate) as unknown;
      if (isNativeHashBinding(loadedModule)) {
        return loadedModule;
      }
    } catch {
      return undefined;
    }
  }

  return undefined;
}
