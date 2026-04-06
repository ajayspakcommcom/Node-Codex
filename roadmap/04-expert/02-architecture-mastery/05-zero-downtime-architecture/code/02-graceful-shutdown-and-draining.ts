import { ConnectionDrainController } from "./runtime/connection-drain-controller.js";

const drainController = new ConnectionDrainController();

drainController.acceptRequest("req-1");
drainController.acceptRequest("req-2");
drainController.beginDrain();
drainController.finishRequest("req-1");
drainController.finishRequest("req-2");

console.log(drainController.snapshot());
