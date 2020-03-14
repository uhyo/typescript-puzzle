import { createContext } from "react";
import { HoleValue } from "~/problems/options";

export type HoleValues = { [holeId in string]?: HoleValue };

type HoleContextValue = {
  holeValues: HoleValues;
  focus?: string;
};

export const HoleContext = createContext<HoleContextValue>({
  holeValues: {},
});
