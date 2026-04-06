type BrokerChoice = "kafka" | "sqs" | "rabbitmq";

interface QueueRequirements {
  readonly needsReplay: boolean;
  readonly highThroughput: boolean;
  readonly managedInfrastructure: boolean;
  readonly richRouting: boolean;
}

function chooseBroker(requirements: QueueRequirements): BrokerChoice {
  if (requirements.needsReplay || requirements.highThroughput) {
    return "kafka";
  }

  if (requirements.richRouting) {
    return "rabbitmq";
  }

  if (requirements.managedInfrastructure) {
    return "sqs";
  }

  return "sqs";
}

const orderEventsRequirements: QueueRequirements = {
  needsReplay: true,
  highThroughput: true,
  managedInfrastructure: false,
  richRouting: false,
};

console.log({
  broker: chooseBroker(orderEventsRequirements),
  reason: "Order events need durable replay and partitioned scaling.",
});
