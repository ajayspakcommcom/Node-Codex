import type { UserIdentity } from "../../shared/integration-types.js";

export class AuthenticationService {
  public authenticate(authorizationHeader: string | undefined): UserIdentity {
    if (!authorizationHeader?.startsWith("Bearer ")) {
      throw new Error("Missing bearer token");
    }

    const encodedPayload = authorizationHeader.replace("Bearer ", "");
    const jsonPayload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const parsedPayload = JSON.parse(jsonPayload) as Partial<UserIdentity>;

    if (
      typeof parsedPayload.userId !== "string" ||
      typeof parsedPayload.tenantId !== "string" ||
      !Array.isArray(parsedPayload.roles)
    ) {
      throw new Error("Invalid token payload");
    }

    return {
      userId: parsedPayload.userId,
      tenantId: parsedPayload.tenantId,
      roles: parsedPayload.roles.filter((role): role is string => typeof role === "string"),
    };
  }
}
