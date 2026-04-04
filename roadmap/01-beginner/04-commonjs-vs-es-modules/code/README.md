# CommonJS And ES Modules Enterprise Examples

These examples show how module-system choices affect runtime behavior, public APIs, and maintainability in Node.js and TypeScript codebases.

## Files

- `01-commonjs-basics.cjs`
- `02-esm-basics.mjs`
- `03-named-vs-default-exports.ts`
- `04-public-api-entrypoint.ts`
- `05-bad-boundary-vs-corrected-boundary.ts`
- `06-package-config-basics.ts`
- `07-migration-boundary.ts`
- `08-common-production-mistakes.ts`
- `09-enterprise-patterns.ts`
- `10-interview-questions.ts`
- `11-practice-exercises.ts`

## Shared Support

- `shared/commonjs/logger.cjs`
- `shared/esm/logger.mjs`
- `shared/export-styles/*`
- `shared/public-api/*`
- `shared/boundaries/*`
- `shared/migration/*`
- `config/commonjs.package.json`
- `config/esm.package.json`

## Run

Examples use different formats on purpose:

```bash
node roadmap/01-beginner/04-commonjs-vs-es-modules/code/01-commonjs-basics.cjs
node roadmap/01-beginner/04-commonjs-vs-es-modules/code/02-esm-basics.mjs
npx tsx roadmap/01-beginner/04-commonjs-vs-es-modules/code/03-named-vs-default-exports.ts
```

## Type Checking

This topic includes a local `tsconfig.json` for the TypeScript examples.
