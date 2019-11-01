import React from "react";
import { createRoot } from "react-dom";
import { App } from "./App";

const root = document.createElement("div");
document.body.appendChild(root);

if (root) {
  createRoot(root).render(<App />);
}
