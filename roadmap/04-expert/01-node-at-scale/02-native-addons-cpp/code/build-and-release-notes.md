# Build And Release Notes

## Build Strategy

- use `node-gyp` with Node-API to reduce ABI churn risk
- keep the native surface as small as possible
- build artifacts should be produced in CI for each supported platform
- wrapper package should detect native-load failures and route to a slower but safe fallback
- CI should prove both the compiled native path and the fallback path still work

## Release Rules

- publish release notes for supported Node versions and supported operating systems
- treat native changes as compatibility-sensitive platform work
- test both native and fallback execution paths in CI
- monitor native-backed errors separately after rollout
- pin toolchain expectations for Node, compiler, and `node-gyp`

## Ownership Expectations

- native code requires ongoing platform ownership, not one-time implementation
- wrapper API should remain more stable than native internals
- fallback behavior must remain functional so teams are not blocked by build failures
