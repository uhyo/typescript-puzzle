import { Workbox } from "workbox-window";
import { Fetcher } from "~/util/Fetcher";

export type ServiceWorkerState =
  | {
      status: "unsupported";
    }
  | {
      status: "supported";
      wb: Workbox;
      waitingState: Fetcher<void>;
    };

export const registerServiceWorker = async (): Promise<ServiceWorkerState> => {
  if (!("serviceWorker" in navigator)) {
    return {
      status: "unsupported",
    };
  }
  const { Workbox } = await import("workbox-window");
  const wb = new Workbox("/sw.js");
  wb.register();
  return {
    status: "supported",
    wb,
    waitingState: new Fetcher(() => waitForSWWaiting(wb)),
  };
};

export const waitForSWWaiting = (wb: Workbox): Promise<void> => {
  const waitingP = new Promise<void>(resolve => {
    wb.addEventListener("waiting", () => {
      resolve();
    });
  });
  return waitingP;
};

export const reloadToUpdate = (wb: Workbox) => {
  console.log("reload to update", wb);
  wb.addEventListener("controlling", () => {
    window.location.reload();
  });

  wb.messageSW({ type: "SKIP_WAITING" });
};
