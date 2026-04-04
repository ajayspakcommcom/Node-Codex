export default function buildCacheKey(prefix: string, identifier: string): string {
  return `${prefix}:${identifier}`;
}
