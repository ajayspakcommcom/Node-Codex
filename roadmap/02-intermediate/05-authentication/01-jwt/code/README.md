# JWT Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use JWTs with disciplined claim design, signature verification, short-lived access tokens, key rotation awareness, revocation limits, and clear authentication-versus-authorization boundaries.

## Files

- `01-issue-and-verify-token.ts`
- `02-claims-validation.ts`
- `03-expiry-and-short-lived-access-tokens.ts`
- `04-authentication-vs-authorization-boundary.ts`
- `05-key-rotation-awareness.ts`
- `06-storage-and-transport-risk.ts`
- `07-revocation-limitations.ts`
- `08-stateless-auth-tradeoffs.ts`
- `09-common-jwt-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/jwt-types.ts`
- `shared/jwt-runtime.ts`

## JWT Module

- `module/keys/signing-key-store.ts`
- `module/services/hmac-jwt-service.ts`
- `module/services/token-authenticator.ts`
- `module/services/revocation-store.ts`
- `module/services/authorization-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/05-authentication/01-jwt/code/01-issue-and-verify-token.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
