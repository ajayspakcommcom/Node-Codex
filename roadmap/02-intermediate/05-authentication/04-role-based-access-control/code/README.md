# Role-Based Access Control Enterprise TypeScript Examples

These examples show how enterprise Node.js teams use RBAC with explicit permissions, route checks, service-layer authorization, tenant boundaries, least privilege, and contextual rules when static roles alone are not enough.

## Files

- `01-roles-vs-permissions.ts`
- `02-route-level-authorization.ts`
- `03-service-layer-authorization.ts`
- `04-tenant-boundary-awareness.ts`
- `05-least-privilege-design.ts`
- `06-role-explosion-risk.ts`
- `07-contextual-authorization-beyond-rbac.ts`
- `08-admin-vs-support-boundaries.ts`
- `09-common-rbac-mistakes.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/rbac-types.ts`
- `shared/rbac-runtime.ts`

## RBAC Module

- `module/policies/permission-map.ts`
- `module/services/rbac-policy-engine.ts`
- `module/services/route-guard.ts`
- `module/services/order-authorization-service.ts`
- `module/advisors/role-design-advisor.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/05-authentication/04-role-based-access-control/code/01-roles-vs-permissions.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
