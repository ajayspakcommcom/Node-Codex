export type OAuth2Flow = "authorization_code" | "client_credentials";

export interface OAuth2Client {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly name: string;
  readonly type: "confidential" | "machine";
  readonly redirectUris: readonly string[];
  readonly allowedScopes: readonly string[];
  readonly allowedFlows: readonly OAuth2Flow[];
}

export interface AuthorizationCodeGrant {
  readonly code: string;
  readonly clientId: string;
  readonly userId: string;
  readonly redirectUri: string;
  readonly scopes: readonly string[];
  readonly expiresAtEpochSeconds: number;
}

export interface AccessToken {
  readonly token: string;
  readonly clientId: string;
  readonly subject: string;
  readonly scopes: readonly string[];
  readonly audience: string;
  readonly expiresAtEpochSeconds: number;
  readonly grantType: OAuth2Flow;
}

export interface AuthorizationRequest {
  readonly clientId: string;
  readonly redirectUri: string;
  readonly requestedScopes: readonly string[];
  readonly userId: string;
  readonly nowEpochSeconds: number;
}

export interface TokenExchangeRequest {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly grantType: OAuth2Flow;
  readonly code?: string;
  readonly redirectUri?: string;
  readonly requestedScopes?: readonly string[];
  readonly audience: string;
  readonly nowEpochSeconds: number;
}
