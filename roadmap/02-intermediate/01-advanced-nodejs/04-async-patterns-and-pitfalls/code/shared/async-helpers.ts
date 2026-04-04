export async function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);

    if (!signal) {
      return;
    }

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new Error("Operation aborted."));
      },
      { once: true },
    );
  });
}

export async function withTimeout<TValue>(
  operation: (signal: AbortSignal) => Promise<TValue>,
  timeoutMs: number,
): Promise<TValue> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await operation(controller.signal);
  } finally {
    clearTimeout(timeout);
  }
}

export async function retry<TValue>(
  operation: () => Promise<TValue>,
  maxAttempts: number,
  delayMs: number,
): Promise<TValue> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt < maxAttempts) {
        await delay(delayMs);
      }
    }
  }

  throw lastError;
}

export async function runWithConcurrencyLimit<TInput, TOutput>(
  items: readonly TInput[],
  limit: number,
  worker: (item: TInput) => Promise<TOutput>,
): Promise<readonly TOutput[]> {
  const results: TOutput[] = [];
  let currentIndex = 0;

  async function next(): Promise<void> {
    const localIndex = currentIndex;
    currentIndex += 1;

    if (localIndex >= items.length) {
      return;
    }

    results[localIndex] = await worker(items[localIndex]!);
    await next();
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => next()));
  return results;
}
