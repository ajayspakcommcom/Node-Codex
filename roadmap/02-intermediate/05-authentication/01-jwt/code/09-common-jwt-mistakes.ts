import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { createBaseClaims, signingKeys } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const jwtService = new HmacJwtService(new SigningKeyStore(signingKeys));
const token = jwtService.issueAccessToken(
  createBaseClaims({
    roles: ["member", "support"],
    scopes: ["orders:read", "orders:update"],
  }),
);
const decodedWithoutVerification = jwtService.decodeUnsafe(token);

logger.warn("Common JWT mistakes", {
  unsafeDecodedClaims: decodedWithoutVerification.claims,
  mistakes: [
    "Using decoded claims before signature verification.",
    "Packing too much changing business data into the token.",
    "Treating token roles as a complete authorization system without separate policy checks.",
    "Ignoring key rotation and revocation strategy.",
  ],
  guidance: "Decoding a JWT is not the same as trusting it. Verification and policy checks still need to happen before the token influences security decisions.",
});
