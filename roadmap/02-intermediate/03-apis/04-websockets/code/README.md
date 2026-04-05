# WebSockets Enterprise TypeScript Examples

These examples show how enterprise Node.js services manage persistent real-time connections without hiding authentication, authorization, fan-out, reconnect, or cross-instance coordination behavior.

## Files

- `01-connection-lifecycle.ts`
- `02-authentication-handshake.ts`
- `03-authorized-room-joins.ts`
- `04-targeted-broadcast-patterns.ts`
- `05-disconnect-cleanup.ts`
- `06-reconnect-awareness.ts`
- `07-message-ordering-awareness.ts`
- `08-slow-consumer-awareness.ts`
- `09-cross-instance-pubsub-awareness.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/socket-types.ts`
- `shared/socket-runtime.ts`

## WebSocket Module

- `module/server/realtime-gateway.ts`
- `module/services/auth-service.ts`
- `module/services/subscription-service.ts`
- `module/services/delivery-service.ts`
- `module/broker/redis-like-pubsub.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/03-apis/04-websockets/code/01-connection-lifecycle.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
