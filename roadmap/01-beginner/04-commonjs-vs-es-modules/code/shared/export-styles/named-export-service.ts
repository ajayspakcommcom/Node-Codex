export function buildCacheKey(prefix: string, identifier: string): string {
  return `${prefix}:${identifier}`;
}

export function buildUserTopic(userId: string): string {
  return `user.events.${userId}`;
}
