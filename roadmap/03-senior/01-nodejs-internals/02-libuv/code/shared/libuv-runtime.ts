import { pbkdf2 } from "node:crypto";
import { access, readFile, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { lookup } from "node:dns/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const pbkdf2Async = promisify(pbkdf2);

export const libuvRuntime = {
  pbkdf2Iterations: 60_000,
  blockingCpuMs: 35,
  timerDelayMs: 20,
  tmpFilePath: join(tmpdir(), "node-codex-libuv-demo.txt"),
} as const;

export function nowMs(): number {
  return performance.now();
}

export async function runCryptoTask(label: string): Promise<{
  readonly label: string;
  readonly durationMs: number;
}> {
  const startedAt = nowMs();
  await pbkdf2Async(label, "libuv-enterprise-demo-salt", libuvRuntime.pbkdf2Iterations, 32, "sha256");

  return {
    label,
    durationMs: nowMs() - startedAt,
  };
}

export function blockCpuFor(durationMs: number): number {
  const startedAt = nowMs();

  while (nowMs() - startedAt < durationMs) {
    Math.sqrt(durationMs * 17);
  }

  return nowMs() - startedAt;
}

export async function ensureTempFile(): Promise<string> {
  try {
    await access(libuvRuntime.tmpFilePath);
  } catch {
    await writeFile(
      libuvRuntime.tmpFilePath,
      "libuv-demo-file\n".repeat(200),
      "utf8",
    );
  }

  return libuvRuntime.tmpFilePath;
}

export async function readTempFile(): Promise<number> {
  const filePath = await ensureTempFile();
  const startedAt = nowMs();
  await readFile(filePath, "utf8");
  return nowMs() - startedAt;
}

export async function lookupHost(host: string): Promise<{
  readonly host: string;
  readonly address: string;
  readonly family: number;
  readonly durationMs: number;
}> {
  const startedAt = nowMs();
  const result = await lookup(host);

  return {
    host,
    address: result.address,
    family: result.family,
    durationMs: nowMs() - startedAt,
  };
}

export function sleep(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}
