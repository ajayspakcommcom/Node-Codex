export function requireNonEmptyString(value: string | undefined, fieldName: string): string {
  if (!value || value.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }

  return value;
}

export function parsePositiveInteger(value: string | undefined, fieldName: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }

  return parsed;
}

export function requireAuthorizationHeader(value: string | undefined): string {
  if (!value || !value.startsWith("Bearer ")) {
    throw new Error("Authorization header must use Bearer format");
  }

  return value;
}
