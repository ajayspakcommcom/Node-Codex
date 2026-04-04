import { InfrastructureError } from "./shared/errors.js";

async function repositoryLoadInvoice(invoiceId: string): Promise<{ id: string }> {
  throw new InfrastructureError(`Database unavailable while loading ${invoiceId}`);
}

async function serviceLoadInvoice(invoiceId: string): Promise<{ id: string }> {
  try {
    return await repositoryLoadInvoice(invoiceId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Service layer preserved useful context:", {
        invoiceId,
        errorName: error.name,
        message: error.message,
      });
    }

    throw error;
  }
}

async function main(): Promise<void> {
  try {
    await serviceLoadInvoice("inv_700");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Boundary layer caught propagated error:", error.message);
    }
  }
}

void main();
