import { createLogger } from "@platform/observability/logger";
import { hashImageInJavaScript } from "./fallback.js";
import { type NativeHashBinding, loadNativeBinding } from "./native-loader.js";

const logger = createLogger("native-image-hash");

interface ImageHashResult {
  readonly algorithm: string;
  readonly hash: string;
  readonly executionPath: "native" | "fallback";
}

export function createImageHasher() {
  const nativeBinding = loadNativeBinding();
  return createImageHasherWithBinding(nativeBinding);
}

export function createImageHasherWithBinding(nativeBinding?: NativeHashBinding) {

  if (nativeBinding) {
    logger.info("native_binding_loaded", {
      package: "native-image-hash",
    });
  } else {
    logger.warn("native_binding_unavailable_using_fallback", {
      package: "native-image-hash",
    });
  }

  return {
    hash(input: Buffer): ImageHashResult {
      if (nativeBinding) {
        const nativeResult = nativeBinding.hashImage(input);

        return {
          algorithm: nativeResult.algorithm,
          hash: nativeResult.hash,
          executionPath: "native",
        };
      }

      return {
        algorithm: "js-fallback-hash",
        hash: hashImageInJavaScript(input),
        executionPath: "fallback",
      };
    },
  };
}
