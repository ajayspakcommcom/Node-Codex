# Monorepo Basics Enterprise Examples

These examples show how an enterprise-oriented Node.js monorepo can be structured with clear app/package boundaries and consistent workspace tooling.

## Files

- `workspace-root/package.json`
- `workspace-root/tsconfig.base.json`
- `workspace-root/pnpm-workspace.yaml`
- `workspace-root/.gitignore`

## Apps

- `workspace-root/apps/api/package.json`
- `workspace-root/apps/api/tsconfig.json`
- `workspace-root/apps/api/src/server.ts`

## Packages

- `workspace-root/packages/shared-config/package.json`
- `workspace-root/packages/shared-config/src/index.ts`
- `workspace-root/packages/order-contracts/package.json`
- `workspace-root/packages/order-contracts/src/index.ts`
- `workspace-root/packages/logger/package.json`
- `workspace-root/packages/logger/src/index.ts`

## Supporting Notes

- `dependency-boundaries.md`
- `ci-and-build-notes.md`
- `bad-cross-package-imports.md`

## What These Examples Demonstrate

- workspace-based multi-package organization
- app vs package separation
- internal library boundaries
- shared TypeScript base config
- consistent scripts across packages
- internal package imports through package names, not relative repo traversal
- CI and incremental build thinking

## Enterprise Rule

The monorepo should act like a collection of disciplined packages, not a single shared namespace without boundaries.
