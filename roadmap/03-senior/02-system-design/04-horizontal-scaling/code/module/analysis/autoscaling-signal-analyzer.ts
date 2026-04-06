import { ScalingSignal } from "../../shared/horizontal-scaling-types.js";

export class AutoscalingSignalAnalyzer {
  public summarize(signals: ScalingSignal[]): string[] {
    return signals.map((signal) => {
      const reliability = signal.trustworthy ? "trusted" : "weak";
      return `${signal.name}: ${signal.value} (${reliability} scaling signal)`;
    });
  }

  public recommend(signals: ScalingSignal[]): string {
    const trustedSignals = signals.filter((signal) => signal.trustworthy);
    const queueLag = trustedSignals.find((signal) => signal.name === "queue-lag");
    const cpu = trustedSignals.find((signal) => signal.name === "cpu");

    if ((cpu?.value ?? 0) > 0.8 || (queueLag?.value ?? 0) > 150) {
      return "Scale out only if downstream shared dependencies are not already saturated.";
    }

    return "Current trusted signals do not justify automatic scale-out.";
  }
}
