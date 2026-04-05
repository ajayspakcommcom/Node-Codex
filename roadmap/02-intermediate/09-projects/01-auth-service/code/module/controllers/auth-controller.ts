import type { AuthenticatedPrincipal, Permission, UserRecord } from "../../shared/auth-service-types.js";
import { AuthService } from "../services/auth-service.js";
import { AuthorizationService } from "../services/authorization-service.js";

export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly authorizationService: AuthorizationService,
  ) {}

  public register(input: {
    readonly email: string;
    readonly password: string;
    readonly tenantId: string;
  }): {
    readonly statusCode: number;
    readonly user: UserRecord;
  } {
    return {
      statusCode: 201,
      user: this.authService.register(input),
    };
  }

  public login(input: {
    readonly email: string;
    readonly password: string;
    readonly ipAddress: string;
    readonly userAgent: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly statusCode: number;
    readonly body: {
      readonly accessToken: string;
      readonly refreshToken: string;
      readonly sessionId: string;
    };
  } {
    const result = this.authService.login(input);

    return {
      statusCode: 200,
      body: {
        accessToken: result.accessToken.token,
        refreshToken: result.refreshToken,
        sessionId: result.sessionId,
      },
    };
  }

  public refresh(input: {
    readonly refreshToken: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly statusCode: number;
    readonly body: {
      readonly accessToken: string;
      readonly refreshToken: string;
      readonly sessionId: string;
    };
  } {
    const result = this.authService.refresh(input);

    return {
      statusCode: 200,
      body: {
        accessToken: result.accessToken.token,
        refreshToken: result.refreshToken,
        sessionId: result.sessionId,
      },
    };
  }

  public getMe(input: {
    readonly accessToken: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly statusCode: number;
    readonly principal: AuthenticatedPrincipal;
  } {
    return {
      statusCode: 200,
      principal: this.authService.authenticateAccessToken(input),
    };
  }

  public logout(input: {
    readonly accessToken: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly statusCode: number;
    readonly sessionStatus: string;
  } {
    const principal = this.authService.authenticateAccessToken({
      accessToken: input.accessToken,
      nowEpochSeconds: input.nowEpochSeconds,
    });
    const session = this.authService.logout({
      sessionId: principal.sessionId,
      actorUserId: principal.userId,
      nowEpochSeconds: input.nowEpochSeconds,
    });

    return {
      statusCode: 204,
      sessionStatus: session.status,
    };
  }

  public authorize(input: {
    readonly accessToken: string;
    readonly permission: Permission;
    readonly resourceTenantId?: string;
    readonly targetUserId?: string;
    readonly nowEpochSeconds: number;
  }): {
    readonly statusCode: number;
    readonly allowed: boolean;
  } {
    const principal = this.authService.authenticateAccessToken({
      accessToken: input.accessToken,
      nowEpochSeconds: input.nowEpochSeconds,
    });

    const allowed = this.authorizationService.can(principal, input.permission, {
      ...(input.resourceTenantId !== undefined ? { resourceTenantId: input.resourceTenantId } : {}),
      ...(input.targetUserId !== undefined ? { targetUserId: input.targetUserId } : {}),
    });

    return {
      statusCode: allowed ? 200 : 403,
      allowed,
    };
  }
}
