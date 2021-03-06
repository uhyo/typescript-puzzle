import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { cacheNamePrefix, tscWorkerCacheName } from "./cacheName";

export const registerRoutes = () => {
  // tsc worker file
  registerRoute(
    /\.tsc\.worker/,
    new CacheFirst({
      cacheName: tscWorkerCacheName,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 3,
        }),
      ],
    }),
  );

  // Google Fonts stylesheets
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: `${cacheNamePrefix}-google-fonts-styles`,
    }),
  );

  // Google Fonts font files
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: `${cacheNamePrefix}-google-fonts`,
      plugins: [
        new CacheableResponsePlugin({
          // Opaque Response has 0 status
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 10,
        }),
      ],
    }),
  );
};
