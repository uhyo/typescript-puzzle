import { precacheAndRoute } from "workbox-precaching";
console.log("I am sw");

// this is injected by workbox-webpack-plugin
const manifest = (self as any).__WB_MANIFEST;
console.log(manifest);
precacheAndRoute(manifest);

// to respond to SKIP_WAITING request
addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    (self as any).skipWaiting();
  }
});
