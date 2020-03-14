import { HoleValue } from "../options";
import { Problem } from "../problemDefinition/problem";

export type StageDefinition = {
  id: string;
  problem: Problem;
  options: HoleValue[];
};
