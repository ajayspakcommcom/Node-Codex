import { randomUUID } from "node:crypto";

import { authConfig } from "../../shared/auth-service-runtime.js";
import type {
  AccessTokenClaims,
  AuthTokens,
  AuthenticatedPrincipal,
  Role,
  SessionRecord,
  AuditEvent,
  UserRecord,
} from "../../shared/auth-service-types.js";
import { InMemorySessionRepository } from "../repositories/in-memory-session-repository.js";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository.js";
import { AuditLogService } from "./audit-log-service.js";
import { AuthorizationService } from "./authorization-service.js";
import { PasswordService } from "./password-service.js";
import { TokenService } from "./token-service.js";

export class AuthService {
  public constructor(
    private readonly userRepository: InMemoryUserRepository,
    private readonly sessionRepository: InMemorySessionRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly authorizationService: AuthorizationService,
    private readonly auditLogService: AuditLogService,
  ) {}

  public register(input: {
    readonly email: string;
    readonly password: string;
    readonly tenantId: string;
    readonly roles?: readonly Role[];
  }): UserRecord {
    if (this.userRepository.findByEmail(input.email) !== undefined) {
      throw new Error(`User already exists: ${input.email}`);
    }

    const user: UserRecord = {
      id: `user_${randomUUID()}`,
      email: input.email.toLowerCase(),
      tenantId: input.tenantId,
      passwordHash: this.passwordService.hash(input.password),
      roles: [...(input.roles ?? ["member"])],
      status: "active",
    };

    this.userRepository.save(user);
    this.auditLogService.record({
      type: "auth.registered",
      actorUserId: user.id,
      tenantId: user.tenantId,
      metadata: {
        email: user.email,
      },
    });

    return user;
  }

  public login(input: {
    readonly email: string;
    readonly password: string;
    readonly ipAddress: string;
    readonly userAgent: string;
    readonly nowEpochSeconds: number;
  }): AuthTokens {
    const user = this.userRepository.findByEmail(input.email);

    if (user === undefined || !this.passwordService.verify(input.password, user.passwordHash)) {
      this.auditLogService.record({
        type: "auth.login.failed",
        severity: "warn",
        metadata: {
          email: input.email.toLowerCase(),
          ipAddress: input.ipAddress,
        },
      });
      throw new Error("Invalid email or password.");
    }

    if (user.status !== "active") {
      throw new Error("User is not active.");
    }

    const permissions = this.authorizationService.listPermissions({
      roles: user.roles,
    });
    const sessionId = `sid_${randomUUID()}`;
    const refreshToken = this.tokenService.issueRefreshToken();
    const accessToken = this.tokenService.issueAccessToken({
      user,
      permissions,
      sessionId,
      nowEpochSeconds: input.nowEpochSeconds,
    });

    this.sessionRepository.create({
      sessionId,
      userId: user.id,
      tenantId: user.tenantId,
      status: "active",
      currentRefreshToken: refreshToken,
      rotatedRefreshTokens: [],
      issuedAtEpochSeconds: input.nowEpochSeconds,
      expiresAtEpochSeconds: input.nowEpochSeconds + authConfig.refreshTokenLifetimeSeconds,
    });

    this.auditLogService.record({
      type: "auth.login.succeeded",
      actorUserId: user.id,
      tenantId: user.tenantId,
      sessionId,
      metadata: {
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      },
    });

    return {
      accessToken,
      refreshToken,
      sessionId,
    };
  }

  public refresh(input: {
    readonly refreshToken: string;
    readonly nowEpochSeconds: number;
  }): AuthTokens {
    const lookup = this.sessionRepository.findByRefreshToken(input.refreshToken);

    if (lookup === undefined) {
      throw new Error("Unknown refresh token.");
    }

    if (lookup.matchType === "rotated") {
      const compromisedSession = this.sessionRepository.revoke({
        sessionId: lookup.session.sessionId,
        revokedAtEpochSeconds: input.nowEpochSeconds,
        reason: "refresh token reuse detected",
        status: "compromised",
      });

      this.auditLogService.record({
        type: "auth.refresh.reuse-detected",
        severity: "error",
        actorUserId: compromisedSession.userId,
        tenantId: compromisedSession.tenantId,
        sessionId: compromisedSession.sessionId,
        metadata: {
          reason: "refresh token reuse detected",
        },
      });

      throw new Error("Refresh token reuse detected.");
    }

    const session = lookup.session;

    if (session.status !== "active") {
      throw new Error(`Session is ${session.status}.`);
    }

    if (session.expiresAtEpochSeconds <= input.nowEpochSeconds) {
      throw new Error("Refresh token expired.");
    }

    const user = this.userRepository.findById(session.userId);

    if (user === undefined || user.status !== "active") {
      throw new Error("User is not available for refresh.");
    }

    const nextRefreshToken = this.tokenService.issueRefreshToken();
    this.sessionRepository.rotateRefreshToken({
      sessionId: session.sessionId,
      previousRefreshToken: input.refreshToken,
      nextRefreshToken,
    });

    const permissions = this.authorizationService.listPermissions({
      roles: user.roles,
    });
    const accessToken = this.tokenService.issueAccessToken({
      user,
      permissions,
      sessionId: session.sessionId,
      nowEpochSeconds: input.nowEpochSeconds,
    });

    this.auditLogService.record({
      type: "auth.refresh.succeeded",
      actorUserId: user.id,
      tenantId: user.tenantId,
      sessionId: session.sessionId,
      metadata: {
        rotated: true,
      },
    });

    return {
      accessToken,
      refreshToken: nextRefreshToken,
      sessionId: session.sessionId,
    };
  }

  public logout(input: {
    readonly sessionId: string;
    readonly actorUserId: string;
    readonly nowEpochSeconds: number;
  }): SessionRecord {
    const session = this.sessionRepository.revoke({
      sessionId: input.sessionId,
      revokedAtEpochSeconds: input.nowEpochSeconds,
      reason: "user logout",
    });

    this.auditLogService.record({
      type: "auth.logout",
      actorUserId: input.actorUserId,
      tenantId: session.tenantId,
      sessionId: session.sessionId,
      metadata: {
        reason: "user logout",
      },
    });

    return session;
  }

  public authenticateAccessToken(input: {
    readonly accessToken: string;
    readonly nowEpochSeconds: number;
  }): AuthenticatedPrincipal {
    const claims = this.tokenService.verifyAccessToken(input.accessToken, input.nowEpochSeconds);
    const user = this.userRepository.findById(claims.sub);

    if (user === undefined || user.status !== "active") {
      throw new Error("Authenticated user no longer exists or is inactive.");
    }

    const session = this.sessionRepository.getRequired(claims.sid);

    if (session.status !== "active") {
      throw new Error(`Session is ${session.status}.`);
    }

    return this.createPrincipal(user, claims);
  }

  public listAuditEvents(): readonly AuditEvent[] {
    return this.auditLogService.list();
  }

  public getUserSessions(userId: string): readonly SessionRecord[] {
    return this.sessionRepository.listByUser(userId);
  }

  private createPrincipal(user: UserRecord, claims: AccessTokenClaims): AuthenticatedPrincipal {
    const permissions = this.authorizationService.listPermissions({
      roles: user.roles,
    });

    return {
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId,
      roles: [...claims.roles],
      permissions: [...permissions],
      sessionId: claims.sid,
    };
  }
}
