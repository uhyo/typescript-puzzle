import { HoleValue, HoleValueOfType } from "~/problems/options";

export type OneHoleKindProps<T extends HoleValue["type"]> = {
  value: HoleValueOfType<T>;
  focused?: boolean;
  className?: string;
  holeId: string;
};
