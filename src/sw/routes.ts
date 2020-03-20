import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

export const registerRoutes = () => {
  // Google Fonts stylesheets
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    }),
  );

  // Google Fonts font files
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: "google-fonts-webfonts",
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
