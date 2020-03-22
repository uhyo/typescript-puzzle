/// <reference types="gtag.js" />

import { Level } from "~/definitions/stages/levels";

const eventCategory = {
  level: "Level",
  stage: "Stage",
};

const eventAction = {
  level: {
    start: "levelStart",
    clear: "levelClear",
  },
  stage: {
    clear: "stageClear",
  },
};
/**
 * Track enter level event.
 */
export const trackEnterLevel = (level: Level) => {
  window.gtag?.("event", eventAction.level.start, {
    event_category: eventCategory.level,
    event_label: String(level),
  });
};
/**
 * Track clear level event.
 */
export const trackClearLevel = (level: Level) => {
  window.gtag?.("event", eventAction.level.clear, {
    event_category: eventCategory.level,
    event_label: String(level),
  });
};
/**
 * Track stage clear event.
 */
export const trackStageClear = (stageId: string) => {
  window.gtag?.("event", eventAction.stage.clear, {
    event_category: eventCategory.stage,
    event_label: stageId,
  });
};
