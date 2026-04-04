# Dependency Categorization

## Runtime Dependencies

These belong in `dependencies` because the service needs them while running:

- `express`
- `fastify`
- `mongoose`
- `zod`
- `pino`

## Development Dependencies

These belong in `devDependencies` because they support development or CI workflows:

- `typescript`
- `tsx`
- `eslint`
- `prettier`
- `vitest`
- `jest`
- `@types/node`

## Enterprise Reminder

Misclassifying dependencies creates:

- broken production builds
- larger runtime installs
- confusing CI behavior
