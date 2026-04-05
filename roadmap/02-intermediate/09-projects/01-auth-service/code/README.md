# Auth Service Enterprise TypeScript Project

These examples show how an enterprise-style authentication service can be structured in Node.js and TypeScript with login, JWT verification, refresh-token rotation, logout, RBAC-aware authorization, tenant boundaries, and audit visibility.

## Files

- `01-auth-service-architecture.ts`
- `02-registration-and-login-flow.ts`
- `03-access-token-verification.ts`
- `04-refresh-token-rotation.ts`
- `05-logout-and-session-revocation.ts`
- `06-role-based-route-authorization.ts`
- `07-audit-events-and-security-visibility.ts`
- `08-tenant-boundary-awareness.ts`
- `09-common-auth-service-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/auth-service-types.ts`
- `shared/auth-service-runtime.ts`

## Auth Service Module

- `module/bootstrap/auth-platform.ts`
- `module/controllers/auth-controller.ts`
- `module/policies/permission-map.ts`
- `module/repositories/in-memory-user-repository.ts`
- `module/repositories/in-memory-session-repository.ts`
- `module/services/password-service.ts`
- `module/services/token-service.ts`
- `module/services/audit-log-service.ts`
- `module/services/auth-service.ts`
- `module/services/authorization-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/09-projects/01-auth-service/code/02-registration-and-login-flow.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
