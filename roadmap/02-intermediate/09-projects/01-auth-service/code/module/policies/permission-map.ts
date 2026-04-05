import { permissionCatalog } from "../../shared/auth-service-runtime.js";
import type { Permission, Role } from "../../shared/auth-service-types.js";

export const permissionMap: Readonly<Record<Role, readonly Permission[]>> = {
  member: permissionCatalog.member,
  support: permissionCatalog.support,
  admin: permissionCatalog.admin,
};
