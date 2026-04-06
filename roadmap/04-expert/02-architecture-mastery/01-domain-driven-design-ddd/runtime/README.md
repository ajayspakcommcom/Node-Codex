# Runtime Validation

This runtime layer validates the built TypeScript domain model instead of testing a separate mock implementation.

## Included

- aggregate invariant tests
- value-object behavior tests
- application-service orchestration test
- anti-corruption layer translation test
- sample scenario using the compiled domain slice

## Commands

```bash
npm run typecheck
npm test
npm run run:sample
```

## Intent

- keep DDD rules executable instead of purely descriptive
- validate that aggregate and ACL behavior survives compilation
- make the topic package suitable for local and CI verification
