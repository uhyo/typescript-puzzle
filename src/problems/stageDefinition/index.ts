import { Option } from "../options";
import { Problem } from "../problemDefinition/problem";

export type StageDefinition = {
  problem: Problem;
  options: Option[];
};
