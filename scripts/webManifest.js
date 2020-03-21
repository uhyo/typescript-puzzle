const path = require("path");

/**
 * @type {import("webpack-pwa-manifest").ManifestOptions}
 */
module.exports = {
  name: "Type Puzzles",
  start_url: "/",
  background_color: "#ffffff",
  categories: ["education", "games"],
  description: "Learn TypeScript by solving Type Puzzles.",
  display: "standalone",
  icons: [
    {
      src: path.resolve(__dirname, "../src/assets/jigsaw-icon-ts.png"),
      sizes: [32, 48, 128, 256],
      purpose: "any",
    },
  ],
  orientation: "portrait",
  theme_color: "#037acc",
};
