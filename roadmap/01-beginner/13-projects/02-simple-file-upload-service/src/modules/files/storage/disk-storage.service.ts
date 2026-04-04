import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

import { env } from "../../../config/env";
import { StorageError } from "../../../shared/errors/app-error";

export interface StoredFileResult {
  readonly storedFilename: string;
  readonly absolutePath: string;
}

export async function ensureUploadDirectory(): Promise<void> {
  await fs.mkdir(env.uploadDir, { recursive: true });
}

export async function saveFile(input: {
  readonly originalName: string;
  readonly buffer: Buffer;
}): Promise<StoredFileResult> {
  await ensureUploadDirectory();

  const fileExtension = path.extname(input.originalName).toLowerCase();
  const storedFilename = `${randomUUID()}${fileExtension}`;
  const absolutePath = path.join(env.uploadDir, storedFilename);

  try {
    await fs.writeFile(absolutePath, input.buffer);
    return {
      storedFilename,
      absolutePath,
    };
  } catch {
    throw new StorageError("Failed to store uploaded file.");
  }
}

export async function deleteFile(storedFilename: string): Promise<void> {
  const absolutePath = path.join(env.uploadDir, storedFilename);

  try {
    await fs.rm(absolutePath, { force: true });
  } catch {
    throw new StorageError("Failed to cleanup stored file.");
  }
}

export async function clearUploadDirectory(): Promise<void> {
  await ensureUploadDirectory();
  const entries = await fs.readdir(env.uploadDir);

  await Promise.all(
    entries
      .filter((entry) => entry !== ".gitkeep")
      .map((entry) => fs.rm(path.join(env.uploadDir, entry), { force: true })),
  );
}
