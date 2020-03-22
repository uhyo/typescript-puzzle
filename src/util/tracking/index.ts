/// <reference types="google.analytics" />

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
  window.ga?.("send", {
    hitType: "event",
    eventCategory: eventCategory.level,
    eventAction: eventAction.level.start,
    eventLabel: String(level),
  });
};
/**
 * Track clear level event.
 */
export const trackClearLevel = (level: Level) => {
  window.ga?.("send", {
    hitType: "event",
    eventCategory: eventCategory.level,
    eventAction: eventAction.level.clear,
    eventLabel: String(level),
  });
};
/**
 * Track stage clear event.
 */
export const trackStageClear = (stageId: string) => {
  window.ga?.("send", {
    hitType: "event",
    eventCategory: eventCategory.stage,
    eventAction: eventAction.stage.clear,
    eventLabel: stageId,
  });
};
