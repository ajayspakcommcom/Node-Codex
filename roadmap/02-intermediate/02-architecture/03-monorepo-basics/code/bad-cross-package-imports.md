# Bad Cross-Package Imports

## Bad Example

```ts
import { secretHelper } from "../../../packages/logger/src/internal/secret-helper";
```

## Why It Is Wrong

- it bypasses the package boundary
- it creates unstable coupling
- it makes package ownership and API expectations unclear

## Correct Approach

Import through the package's declared public API only:

```ts
import { createLogger } from "@packages/logger";
```
