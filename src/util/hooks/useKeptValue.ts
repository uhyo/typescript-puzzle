import { useRef } from "react";

type RefValue<T> = {
  kept: T;
  value: T;
};

/**
 * Returns a kept (old) version of given value.
 * Kept value is updated when the function in second argument returns true.
 */
export function useKeptValue<T>(
  value: T,
  shouldUpdate: (prev: T, current: T) => boolean,
): T {
  const prevRef = useRef<RefValue<T>>();
  const current = prevRef.current;
  if (current) {
    if (current.value !== value && shouldUpdate(current.value, value)) {
      current.kept = value;
    }
    current.value = value;
    return current.kept;
  } else {
    prevRef.current = { kept: value, value };
    return value;
  }
}
