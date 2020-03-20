import { setCacheNameDetails } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { cacheNamePrefix } from "./cacheName";
import { registerRoutes } from "./routes";

setCacheNameDetails({
  prefix: cacheNamePrefix,
});

// this is injected by workbox-webpack-plugin
const manifest = (self as any).__WB_MANIFEST;
console.log(manifest);
precacheAndRoute(manifest);

// set up cache routes
registerRoutes();

// to respond to SKIP_WAITING request
addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    (self as any).skipWaiting();
  }
});
