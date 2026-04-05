import { ClientRegistry } from "../registry/client-registry.js";
import type { AccessToken, AuthorizationRequest, TokenExchangeRequest } from "../../shared/oauth2-types.js";
import { AuthorizationCodeStore } from "./authorization-code-store.js";
import { ScopeService } from "./scope-service.js";
import { TokenService } from "./token-service.js";

export class OAuth2AuthorizationServer {
  public constructor(
    private readonly clientRegistry: ClientRegistry,
    private readonly scopeService: ScopeService,
    private readonly authorizationCodeStore: AuthorizationCodeStore,
    private readonly tokenService: TokenService,
  ) {}

  public authorize(request: AuthorizationRequest): {
    readonly code: string;
    readonly consentSummary: string;
  } {
    const client = this.clientRegistry.getRequired(request.clientId);

    if (!client.allowedFlows.includes("authorization_code")) {
      throw new Error("Client is not allowed to use the authorization code flow.");
    }

    if (!client.redirectUris.includes(request.redirectUri)) {
      throw new Error("Redirect URI validation failed.");
    }

    const scopes = this.scopeService.validateRequestedScopes(client, request.requestedScopes);
    const codeGrant = this.authorizationCodeStore.issue({
      clientId: request.clientId,
      userId: request.userId,
      redirectUri: request.redirectUri,
      scopes,
      expiresAtEpochSeconds: request.nowEpochSeconds + 120,
    });

    return {
      code: codeGrant.code,
      consentSummary: this.scopeService.describeConsent(scopes),
    };
  }

  public exchangeToken(request: TokenExchangeRequest): AccessToken {
    const client = this.clientRegistry.authenticateClient(request.clientId, request.clientSecret);

    if (!client.allowedFlows.includes(request.grantType)) {
      throw new Error(`Client is not allowed to use ${request.grantType}.`);
    }

    if (request.grantType === "authorization_code") {
      if (request.code === undefined || request.redirectUri === undefined) {
        throw new Error("Authorization code exchange requires code and redirect URI.");
      }

      const codeGrant = this.authorizationCodeStore.consume(request.code, request.nowEpochSeconds);

      if (codeGrant.clientId !== client.clientId || codeGrant.redirectUri !== request.redirectUri) {
        throw new Error("Authorization code exchange failed due to client or redirect mismatch.");
      }

      return this.tokenService.issueAccessToken({
        clientId: client.clientId,
        subject: codeGrant.userId,
        scopes: codeGrant.scopes,
        audience: request.audience,
        grantType: "authorization_code",
        nowEpochSeconds: request.nowEpochSeconds,
        lifetimeSeconds: 300,
      });
    }

    const scopes = this.scopeService.validateRequestedScopes(client, request.requestedScopes ?? []);

    return this.tokenService.issueAccessToken({
      clientId: client.clientId,
      subject: client.clientId,
      scopes,
      audience: request.audience,
      grantType: "client_credentials",
      nowEpochSeconds: request.nowEpochSeconds,
      lifetimeSeconds: 180,
    });
  }
}
