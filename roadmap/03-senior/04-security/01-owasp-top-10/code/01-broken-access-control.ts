import { createLogger } from "./shared/logger";

const logger = createLogger("access-control");

interface UserContext {
  readonly userId: string;
  readonly roles: readonly string[];
}

interface InvoiceRecord {
  readonly invoiceId: string;
  readonly ownerId: string;
  readonly amount: number;
}

function assertCanViewInvoice(user: UserContext, invoice: InvoiceRecord): void {
  const isAdmin = user.roles.includes("admin");
  const isOwner = invoice.ownerId === user.userId;

  if (!isAdmin && !isOwner) {
    throw new Error("Forbidden");
  }
}

const user: UserContext = { userId: "usr_10", roles: ["customer"] };
const invoice: InvoiceRecord = { invoiceId: "inv_1", ownerId: "usr_10", amount: 3000 };

assertCanViewInvoice(user, invoice);
logger.info("access_control_passed", {
  invoiceId: invoice.invoiceId,
  rule: "authorization checked at resource boundary",
});
