# Tools Enterprise Examples

These examples show how an enterprise-oriented Node.js and TypeScript service can organize its baseline tooling.

## Files

- `package.json`
- `tsconfig.json`
- `eslint.config.mjs`
- `.prettierrc.json`
- `.prettierignore`
- `.gitignore`
- `.env.example`
- `.editorconfig`
- `.vscode/settings.json`
- `.github/workflows/ci.yml`

## TypeScript Sample App

- `src/app.ts`
- `src/config/env.ts`
- `src/modules/users/user-service.ts`
- `src/shared/logger.ts`
- `src/tests/user-service.test.ts`

## What These Examples Demonstrate

- standardized scripts for `dev`, `build`, `start`, `lint`, `format`, `typecheck`, and `test`
- strict TypeScript configuration
- path alias usage
- formatter and linter discipline
- watch-mode development workflow
- environment variable expectations
- `.gitignore` and editor configuration discipline
- CI reuse of local validation commands
- a simple testing entrypoint

## Enterprise Rule

Tooling should make the expected way of working obvious and repeatable for every engineer on the team.
