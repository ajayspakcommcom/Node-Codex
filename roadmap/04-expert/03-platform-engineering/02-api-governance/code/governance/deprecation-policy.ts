export interface DeprecationWindow {
  announcedOn: string;
  removalOn: string;
  minimumDays: number;
}

export function validateDeprecationWindow(window: DeprecationWindow): true {
  const announced = new Date(window.announcedOn);
  const removal = new Date(window.removalOn);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = Math.floor((removal.getTime() - announced.getTime()) / millisecondsPerDay);

  if (Number.isNaN(announced.getTime()) || Number.isNaN(removal.getTime())) {
    throw new Error("Deprecation policy requires valid announcement and removal dates");
  }

  if (days < window.minimumDays) {
    throw new Error(`Deprecation window must be at least ${window.minimumDays} days`);
  }

  return true;
}
