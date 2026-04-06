import { createHmac, timingSafeEqual } from "node:crypto";
import { createLogger } from "./shared/logger";

const logger = createLogger("crypto");

function signValue(value: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(value).digest();
}

function verifySignedValue(value: string, providedSignature: Buffer, secret: string): boolean {
  const expected = signValue(value, secret);
  return expected.length === providedSignature.length &&
    timingSafeEqual(expected, providedSignature);
}

const secret = "rotation-demo-secret";
const signed = signValue("session:usr_100", secret);

logger.info("signature_verification", {
  verified: verifySignedValue("session:usr_100", signed, secret),
  note: "Use strong primitives and safe comparison instead of homemade crypto logic.",
});
