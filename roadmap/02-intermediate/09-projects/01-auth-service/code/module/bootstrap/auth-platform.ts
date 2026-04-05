import { cloneSeedUsers } from "../../shared/auth-service-runtime.js";
import { AuthController } from "../controllers/auth-controller.js";
import { InMemorySessionRepository } from "../repositories/in-memory-session-repository.js";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository.js";
import { AuditLogService } from "../services/audit-log-service.js";
import { AuthorizationService } from "../services/authorization-service.js";
import { AuthService } from "../services/auth-service.js";
import { PasswordService } from "../services/password-service.js";
import { TokenService } from "../services/token-service.js";

export function createAuthPlatform() {
  const userRepository = new InMemoryUserRepository(cloneSeedUsers());
  const sessionRepository = new InMemorySessionRepository();
  const passwordService = new PasswordService();
  const authorizationService = new AuthorizationService();
  const tokenService = new TokenService();
  const auditLogService = new AuditLogService();
  const authService = new AuthService(
    userRepository,
    sessionRepository,
    passwordService,
    tokenService,
    authorizationService,
    auditLogService,
  );
  const controller = new AuthController(authService, authorizationService);

  return {
    controller,
    authService,
    authorizationService,
    auditLogService,
    userRepository,
    sessionRepository,
  };
}
