import React from "react";
import { createRoot } from "react-dom";
import { App } from "./containers/App";

const root = document.createElement("div");
document.body.appendChild(root);

if (root) {
  createRoot(root).render(<App />);
}
