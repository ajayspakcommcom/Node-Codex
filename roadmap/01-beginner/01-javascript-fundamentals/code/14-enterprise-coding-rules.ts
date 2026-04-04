import { setFailureExitCode } from "./shared/node-runtime.js";

type InvoiceStatus = "pending" | "paid";

interface Invoice {
  readonly id: string;
  readonly status: InvoiceStatus;
  readonly paidAt?: string;
}

interface InvoiceRepository {
  findById(id: string): Promise<Invoice | null>;
  save(invoice: Invoice): Promise<void>;
}

interface Clock {
  nowIso(): string;
}

interface InvoiceServiceDependencies {
  readonly invoiceRepository: InvoiceRepository;
  readonly clock: Clock;
}

interface InvoiceResponse {
  readonly id: string;
  readonly status: "paid";
  readonly paidAt: string;
}

function createInvoiceService({ invoiceRepository, clock }: InvoiceServiceDependencies) {
  async function markAsPaid(invoiceId: string): Promise<InvoiceResponse> {
    const invoice = await invoiceRepository.findById(invoiceId);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const updatedInvoice = {
      ...invoice,
      status: "paid",
      paidAt: clock.nowIso(),
    };

    await invoiceRepository.save(updatedInvoice);

    return {
      id: updatedInvoice.id,
      status: updatedInvoice.status,
      paidAt: updatedInvoice.paidAt,
    };
  }

  return {
    markAsPaid,
  };
}

const invoiceRepository: InvoiceRepository = {
  async findById(id: string): Promise<Invoice> {
    return { id, status: "pending" };
  },
  async save(invoice: Invoice): Promise<void> {
    console.log("Saved invoice:", invoice);
  },
};

const clock: Clock = {
  nowIso(): string {
    return "2026-04-04T00:00:00.000Z";
  },
};

async function main(): Promise<void> {
  const invoiceService = createInvoiceService({ invoiceRepository, clock });
  const result = await invoiceService.markAsPaid("inv_101");
  console.log("Service result:", result);
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
  }
  setFailureExitCode();
});
