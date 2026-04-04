# Dependency Boundaries

## Allowed Direction

- `apps/*` may depend on `packages/*`
- `packages/*` may depend on other `packages/*` only when the boundary is intentional and documented
- apps should not import source files from sibling apps

## Enterprise Rule

Packages should be consumed through their declared package names and public entrypoints, not through deep relative imports into other package internals.
