export function sum(values: readonly number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function average(values: readonly number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return sum(values) / values.length;
}
