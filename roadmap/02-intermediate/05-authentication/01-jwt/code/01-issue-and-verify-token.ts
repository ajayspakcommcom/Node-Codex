import { SigningKeyStore } from "./module/keys/signing-key-store.js";
import { HmacJwtService } from "./module/services/hmac-jwt-service.js";
import { RevocationStore } from "./module/services/revocation-store.js";
import { TokenAuthenticator } from "./module/services/token-authenticator.js";
import { createBaseClaims, signingKeys, verificationContext } from "./shared/jwt-runtime.js";
import { logger } from "./shared/logger.js";

const keyStore = new SigningKeyStore(signingKeys);
const jwtService = new HmacJwtService(keyStore);
const authenticator = new TokenAuthenticator(jwtService, new RevocationStore());

const token = jwtService.issueAccessToken(createBaseClaims());
const verified = authenticator.authenticate(token, verificationContext);

logger.info("Issue and verify token", {
  token,
  verifiedHeader: verified.header,
  verifiedClaims: verified.claims,
  guidance: "A JWT should only become trusted request identity after signature, issuer, audience, and expiry validation have all passed.",
});
