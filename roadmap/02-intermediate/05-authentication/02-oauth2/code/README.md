# OAuth2 Enterprise TypeScript Examples

These examples show how enterprise Node.js teams reason about OAuth2 actors, delegated access, scopes, redirect validation, authorization-code exchange, client-credentials access, and the boundary between OAuth2 authorization and authentication.

## Files

- `01-core-actors-and-delegated-access.ts`
- `02-scopes-and-consent.ts`
- `03-authorization-code-flow.ts`
- `04-client-credentials-flow.ts`
- `05-redirect-uri-safety.ts`
- `06-token-lifetime-awareness.ts`
- `07-user-delegated-vs-machine-access.ts`
- `08-oauth2-vs-authentication-boundary.ts`
- `09-common-oauth2-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/oauth2-types.ts`
- `shared/oauth2-runtime.ts`

## OAuth2 Module

- `module/registry/client-registry.ts`
- `module/services/scope-service.ts`
- `module/services/authorization-code-store.ts`
- `module/services/token-service.ts`
- `module/services/oauth2-authorization-server.ts`
- `module/services/resource-server.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/05-authentication/02-oauth2/code/01-core-actors-and-delegated-access.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
