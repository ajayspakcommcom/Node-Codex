export function hashImageInJavaScript(input: Buffer): string {
  let accumulator = 0;

  for (const byte of input.values()) {
    accumulator = (accumulator * 131 + byte) % 1_000_000_007;
  }

  return String(accumulator);
}
