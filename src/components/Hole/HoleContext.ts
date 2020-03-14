import { createContext } from "react";
import { HoleValue } from "~/problems/options";

export type HoleValues = { [holeId in string]?: HoleValue };

type HoleContextValue = {
  holeValues: HoleValues;
  onHoleClick: (holeId: string) => void;
  focus?: string;
};

export const HoleContext = createContext<HoleContextValue>({
  holeValues: {},
  onHoleClick: () => {},
});
