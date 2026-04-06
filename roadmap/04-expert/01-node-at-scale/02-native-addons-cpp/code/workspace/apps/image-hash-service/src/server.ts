import { createImageHasher } from "@platform/native-image-hash/index";

const imageHasher = createImageHasher();

const result = imageHasher.hash(Buffer.from("raw-image-bytes"));

console.log(
  JSON.stringify({
    service: "image-hash-service",
    event: "image_hash_computed",
    algorithm: result.algorithm,
    executionPath: result.executionPath,
    hash: result.hash,
  }),
);
