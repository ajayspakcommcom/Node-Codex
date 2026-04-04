# Debugging Enterprise TypeScript Examples

These examples focus on investigation discipline in Node.js services: stack traces, structured logs, request correlation, debugger-friendly flows, async diagnosis, and config/runtime troubleshooting.

## Files

- `01-stack-trace-and-error-message.ts`
- `02-structured-logging.ts`
- `03-request-correlation.ts`
- `04-console-vs-disciplined-logging.ts`
- `05-debugger-friendly-control-flow.ts`
- `06-async-debugging.ts`
- `07-config-debugging.ts`
- `08-file-path-runtime-debugging.ts`
- `09-reproduce-bug-locally.ts`
- `10-production-like-failure-simulation.ts`
- `11-common-debugging-mistakes.ts`
- `12-maintainability-patterns.ts`
- `13-interview-questions.ts`
- `14-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/request-context.ts`
- `shared/timing.ts`

## Assets

- `assets/debug-config.json`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx tsx roadmap/01-beginner/08-debugging/code/01-stack-trace-and-error-message.ts
```

## Note

Examples `05-*` and `06-*` are written to be debugger-friendly. You can run them with `node inspect` or attach a VS Code debugger to inspect variables, breakpoints, and async flow.
