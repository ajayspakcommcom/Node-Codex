# Real-Time Chat App Enterprise TypeScript Project

These examples show how an enterprise-style real-time chat application can be structured in Node.js and TypeScript with authenticated socket connections, room-scoped messaging, persistence-aware history, reconnect handling, moderation controls, slow-consumer protection, and cross-instance delivery awareness.

## Files

- `01-chat-project-architecture.ts`
- `02-authenticated-connections-and-room-joins.ts`
- `03-room-scoped-messaging.ts`
- `04-message-persistence-and-history.ts`
- `05-reconnect-and-presence-cleanup.ts`
- `06-moderation-and-mute-controls.ts`
- `07-ordering-and-delivery-awareness.ts`
- `08-slow-consumer-backpressure.ts`
- `09-cross-instance-chat-delivery.ts`
- `10-maintainability-patterns.ts`
- `11-interview-questions.ts`
- `12-practice-exercises.ts`

## Shared Support

- `shared/logger.ts`
- `shared/chat-types.ts`
- `shared/chat-runtime.ts`

## Chat Project Module

- `module/bootstrap/chat-platform.ts`
- `module/server/chat-gateway.ts`
- `module/broker/redis-like-chat-broker.ts`
- `module/repositories/in-memory-room-repository.ts`
- `module/repositories/in-memory-message-history-repository.ts`
- `module/services/auth-service.ts`
- `module/services/room-service.ts`
- `module/services/message-service.ts`
- `module/services/moderation-service.ts`
- `module/services/delivery-service.ts`

## Run

Use a TypeScript runner such as `tsx`:

```bash
npx -p tsx tsx roadmap/02-intermediate/09-projects/02-real-time-chat-app/code/02-authenticated-connections-and-room-joins.ts
```

## Type Checking

This topic includes a local `tsconfig.json` with strict settings.
