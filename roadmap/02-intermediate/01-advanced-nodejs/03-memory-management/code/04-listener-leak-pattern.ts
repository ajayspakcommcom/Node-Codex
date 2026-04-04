import { EventEmitter } from "node:events";

import { logger } from "./shared/logger.js";

const eventBus = new EventEmitter();

function badListenerPattern(): void {
  for (let index = 0; index < 12; index += 1) {
    eventBus.on("report-ready", () => {
      return index;
    });
  }

  logger.warn("Listener leak pattern", {
    listenerCount: eventBus.listenerCount("report-ready"),
    guidance: "Repeated listener registration without cleanup can create memory retention and duplicate behavior.",
  });
}

function correctedPattern(): void {
  const handler = (payload: { readonly reportId: string }) => payload.reportId;
  eventBus.once("report-ready-once", handler);

  logger.info("Corrected listener pattern", {
    listenerCount: eventBus.listenerCount("report-ready-once"),
    guidance: "Register listeners intentionally and let their lifecycle end clearly.",
  });
}

badListenerPattern();
correctedPattern();
