import { createLogger } from "./shared/logger";

const logger = createLogger("events-vs-commands");

interface Command<TPayload> {
  readonly commandName: string;
  readonly payload: TPayload;
}

interface Event<TPayload> {
  readonly eventName: string;
  readonly payload: TPayload;
}

const createInvoiceCommand: Command<{ orderId: string }> = {
  commandName: "billing.createInvoice",
  payload: { orderId: "ord_101" },
};

const orderCreatedEvent: Event<{ orderId: string }> = {
  eventName: "order.created",
  payload: { orderId: "ord_101" },
};

logger.info("command_example", {
  type: "command",
  meaning: "A direct instruction to a specific owner.",
  name: createInvoiceCommand.commandName,
});

logger.info("event_example", {
  type: "event",
  meaning: "A fact that happened and may have multiple interested consumers.",
  name: orderCreatedEvent.eventName,
});
