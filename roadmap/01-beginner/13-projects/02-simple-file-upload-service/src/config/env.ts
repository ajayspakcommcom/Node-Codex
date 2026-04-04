import path from "node:path";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  UPLOAD_DIR: z.string().default("./storage/uploads"),
  MAX_FILE_SIZE_BYTES: z.coerce.number().int().positive().default(1_048_576),
  ALLOWED_MIME_TYPES: z.string().default("image/png,image/jpeg,application/pdf,text/plain"),
});

const parsedEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  UPLOAD_DIR: process.env.UPLOAD_DIR,
  MAX_FILE_SIZE_BYTES: process.env.MAX_FILE_SIZE_BYTES,
  ALLOWED_MIME_TYPES: process.env.ALLOWED_MIME_TYPES,
});

export const env = {
  nodeEnv: parsedEnv.NODE_ENV,
  port: parsedEnv.PORT,
  logLevel: parsedEnv.LOG_LEVEL,
  uploadDir: path.resolve(parsedEnv.UPLOAD_DIR),
  maxFileSizeBytes: parsedEnv.MAX_FILE_SIZE_BYTES,
  allowedMimeTypes: parsedEnv.ALLOWED_MIME_TYPES.split(",").map((value) => value.trim()),
} as const;
