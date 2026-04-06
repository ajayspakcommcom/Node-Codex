import { createLogger } from "./shared/logger";
import { retry } from "./shared/retry";
import { withTimeout } from "./shared/timeout";

const logger = createLogger("maintainability");

class PaymentGatewayClient {
  async charge(): Promise<string> {
    return "approved";
  }
}

class ResilientPaymentGatewayClient {
  constructor(private readonly paymentGatewayClient: PaymentGatewayClient) {}

  async charge(): Promise<string> {
    return retry(
      async () => withTimeout(this.paymentGatewayClient.charge(), 500),
      {
        maxAttempts: 3,
        baseDelayMs: 100,
        logger,
        shouldRetry: (error) =>
          error instanceof Error && error.message.includes("timeout"),
      },
    );
  }
}

async function main(): Promise<void> {
  const client = new ResilientPaymentGatewayClient(new PaymentGatewayClient());
  logger.info("charge_result", { result: await client.charge() });
}

void main();
