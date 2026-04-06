import { createLogger } from "./shared/logger";

const logger = createLogger("lag-monitor");

interface QueueHealthSnapshot {
  readonly queueDepth: number;
  readonly consumerThroughputPerMinute: number;
  readonly producerThroughputPerMinute: number;
}

function assessPressure(snapshot: QueueHealthSnapshot): string {
  if (snapshot.producerThroughputPerMinute > snapshot.consumerThroughputPerMinute) {
    return "Queue depth will grow. Add consumers, reduce input rate, or optimize processing.";
  }

  return "Throughput is balanced.";
}

const snapshot: QueueHealthSnapshot = {
  queueDepth: 20_000,
  consumerThroughputPerMinute: 8_000,
  producerThroughputPerMinute: 12_000,
};

logger.info("queue_pressure_assessment", {
  queueDepth: snapshot.queueDepth,
  assessment: assessPressure(snapshot),
});
