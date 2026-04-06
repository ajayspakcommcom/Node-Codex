import type { FairnessBatchResult } from "../../shared/event-loop-types.js";
import { yieldToEventLoop } from "../../shared/event-loop-runtime.js";

export class FairnessService {
  public async runBlockingLoop(unitsProcessed: number): Promise<FairnessBatchResult> {
    let otherWorkExecutions = 0;
    let active = true;

    const pump = (): void => {
      if (!active) {
        return;
      }

      otherWorkExecutions += 1;
      setImmediate(pump);
    };

    setImmediate(pump);

    for (let index = 0; index < unitsProcessed; index += 1) {
      Math.sqrt(index * 17);
    }

    active = false;
    await yieldToEventLoop();

    return {
      strategy: "blocking-loop",
      unitsProcessed,
      otherWorkExecutions,
    };
  }

  public async runCooperativeLoop(unitsProcessed: number, yieldEvery: number): Promise<FairnessBatchResult> {
    let otherWorkExecutions = 0;
    let active = true;

    const pump = (): void => {
      if (!active) {
        return;
      }

      otherWorkExecutions += 1;
      setImmediate(pump);
    };

    setImmediate(pump);

    for (let index = 0; index < unitsProcessed; index += 1) {
      Math.sqrt(index * 17);

      if (index > 0 && index % yieldEvery === 0) {
        await yieldToEventLoop();
      }
    }

    active = false;
    await yieldToEventLoop();

    return {
      strategy: "cooperative-yield",
      unitsProcessed,
      otherWorkExecutions,
    };
  }
}
