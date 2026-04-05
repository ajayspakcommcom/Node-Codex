import { createHmac, timingSafeEqual } from "node:crypto";

import type { AccessTokenClaims, JwtHeader, SigningKey } from "../../shared/jwt-types.js";
import { SigningKeyStore } from "../keys/signing-key-store.js";

function encodeBase64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(message: string, secret: string): string {
  return createHmac("sha256", secret).update(message).digest("base64url");
}

export class HmacJwtService {
  public constructor(private readonly keyStore: SigningKeyStore) {}

  public issueAccessToken(claims: AccessTokenClaims): string {
    const signingKey = this.keyStore.getActiveKey();
    const header: JwtHeader = {
      alg: "HS256",
      typ: "JWT",
      kid: signingKey.kid,
    };

    return this.sign(header, claims, signingKey);
  }

  public decodeUnsafe(token: string): {
    readonly header: JwtHeader;
    readonly claims: AccessTokenClaims;
  } {
    const [encodedHeader, encodedPayload] = token.split(".");

    if (encodedHeader === undefined || encodedPayload === undefined) {
      throw new Error("JWT is malformed.");
    }

    return {
      header: JSON.parse(decodeBase64Url(encodedHeader)) as JwtHeader,
      claims: JSON.parse(decodeBase64Url(encodedPayload)) as AccessTokenClaims,
    };
  }

  public verifySignature(token: string): {
    readonly header: JwtHeader;
    readonly claims: AccessTokenClaims;
  } {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

    if (encodedHeader === undefined || encodedPayload === undefined || encodedSignature === undefined) {
      throw new Error("JWT is malformed.");
    }

    const header = JSON.parse(decodeBase64Url(encodedHeader)) as JwtHeader;
    const claims = JSON.parse(decodeBase64Url(encodedPayload)) as AccessTokenClaims;

    if (header.alg !== "HS256" || header.typ !== "JWT") {
      throw new Error("JWT header contains unsupported values.");
    }

    const verificationKey = this.keyStore.getVerificationKey(header.kid);
    const expectedSignature = createSignature(`${encodedHeader}.${encodedPayload}`, verificationKey.secret);
    const expectedBuffer = Buffer.from(expectedSignature);
    const actualBuffer = Buffer.from(encodedSignature);

    if (expectedBuffer.length !== actualBuffer.length || !timingSafeEqual(expectedBuffer, actualBuffer)) {
      throw new Error("JWT signature verification failed.");
    }

    return {
      header,
      claims,
    };
  }

  private sign(header: JwtHeader, claims: AccessTokenClaims, signingKey: SigningKey): string {
    const encodedHeader = encodeBase64Url(JSON.stringify(header));
    const encodedPayload = encodeBase64Url(JSON.stringify(claims));
    const signature = createSignature(`${encodedHeader}.${encodedPayload}`, signingKey.secret);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}
