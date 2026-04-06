import { CircuitBreaker, type DependencyCall } from "./shared/circuit-breaker";
import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

class PaymentGatewayClient {
  async charge(): Promise<string> {
    return "charge_approved";
  }
}

class ResilientPaymentGateway {
  private readonly breaker: CircuitBreaker<string>;

  constructor(
    private readonly paymentGatewayClient: PaymentGatewayClient,
  ) {
    this.breaker = new CircuitBreaker<string>({
      failureThreshold: 3,
      resetTimeoutMs: 10_000,
      logger,
    });
  }

  async charge(): Promise<string> {
    const dependencyCall: DependencyCall<string> = async () =>
      this.paymentGatewayClient.charge();

    return this.breaker.execute(dependencyCall);
  }
}

async function main(): Promise<void> {
  const gateway = new ResilientPaymentGateway(new PaymentGatewayClient());
  logger.info("charge_result", { result: await gateway.charge() });
}

void main();
