# System Context

- `native-image-hash`: platform-owned package exposing a stable JS API and loading a native addon behind the scenes
- native addon implements one hot-path hash routine through Node-API
- wrapper owns fallback behavior, logging, and error isolation
- `image-hash-service`: example adopting service using the wrapper instead of calling native bindings directly
- shared observability package standardizes logs across native-backed and pure JS paths
