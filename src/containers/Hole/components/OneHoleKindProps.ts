import { HoleValue, HoleValueOfType } from "~/stages/holes/holeDefs";

export type OneHoleKindProps<T extends HoleValue["type"]> = {
  value: HoleValueOfType<T>;
  focused?: boolean;
  className?: string;
  holeId: string;
};
