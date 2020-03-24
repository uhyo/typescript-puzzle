import { lastSeenQuestionNumberKey } from "~/design/localStorageKey";

export const getLastSeenQuestionNumber = (): number | undefined => {
  const v = localStorage.getItem(lastSeenQuestionNumberKey);
  if (!v) {
    return undefined;
  }
  const n = parseInt(v);
  return Number.isNaN(n) ? undefined : n;
};

export const setLastSeenQuestionNumber = (n: number) => {
  localStorage.setItem(lastSeenQuestionNumberKey, String(n));
};
