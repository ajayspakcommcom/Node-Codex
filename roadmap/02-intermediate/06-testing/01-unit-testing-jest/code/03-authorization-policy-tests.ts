import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { AccessPolicyService } from "./module/services/access-policy-service.js";
import { foreignTenantUser, managerUser, sampleOrder, supportUser } from "./shared/testing-runtime.js";

const policyService = new AccessPolicyService();

async function main(): Promise<void> {
  reset();

  describe("AccessPolicyService", () => {
    it("allows tenant managers to view tenant orders", () => {
      expect(policyService.canViewOrder(managerUser, sampleOrder)).toBe(true);
    });

    it("blocks cross-tenant access by default", () => {
      expect(policyService.canViewOrder(foreignTenantUser, sampleOrder)).toBe(false);
    });

    it("limits support users on payment-pending orders", () => {
      expect(
        policyService.canViewOrder(supportUser, {
          ...sampleOrder,
          status: "payment_pending",
        }),
      ).toBe(false);
    });
  });

  await run();
}

void main();
