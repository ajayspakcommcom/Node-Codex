import { createLogger } from "./shared/logger";
import { FakeRabbitExchange } from "./shared/fake-brokers";

const logger = createLogger("rabbitmq");

async function main(): Promise<void> {
  const exchange = new FakeRabbitExchange();

  exchange.bindQueue("billing-events", "billing.*");
  exchange.bindQueue("audit-events", "#");

  const routes = exchange.publish("billing.invoice.created", {
    invoiceId: "inv_10",
    amount: 2500,
  });

  logger.info("message_routed", {
    matchedQueues: routes,
    note: "RabbitMQ routing flexibility is useful when message flow is exchange-driven.",
  });
}

void main();
