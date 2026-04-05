# Refresh Tokens Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use refresh tokens to preserve session continuity while keeping access tokens short-lived, rotating refresh tokens, detecting reuse, revoking session families, and responding to compromise.

## Files

- `01-short-lived-access-plus-refresh.ts`
- `02-refresh-token-rotation.ts`
- `03-reuse-detection.ts`
- `04-revocation-and-logout.ts`
- `05-session-family-lifecycle.ts`
- `06-storage-and-transport-risk.ts`
- `07-compromise-response.ts`
- `08-session-continuity-tradeoffs.ts`
- `09-common-refresh-token-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/refresh-types.ts`
- `shared/refresh-runtime.ts`

## Refresh Token Module

- `module/services/access-token-service.ts`
- `module/services/refresh-token-store.ts`
- `module/services/session-family-store.ts`
- `module/services/session-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/05-authentication/03-refresh-tokens/code/01-short-lived-access-plus-refresh.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
