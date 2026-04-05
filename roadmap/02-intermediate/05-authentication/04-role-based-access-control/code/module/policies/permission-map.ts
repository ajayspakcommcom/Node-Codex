import type { Permission, Role } from "../../shared/rbac-types.js";

export const permissionMap: Readonly<Record<Role, readonly Permission[]>> = {
  member: ["orders:read"],
  support: ["orders:read", "users:read", "support:impersonate-readonly"],
  manager: ["orders:read", "orders:update", "orders:refund", "users:read"],
  admin: ["orders:read", "orders:update", "orders:refund", "users:read", "users:suspend"],
};
