import React, { FC } from "react";
import { BlankHole } from "~/components/Hole";
import { ProblemHole } from "../../../problems/problemDefinition";

export const OpenHole: FC<{
  hole: ProblemHole;
  focused?: boolean;
  onClick?: () => void;
}> = ({ focused, onClick }) => {
  return <BlankHole focused={!!focused} onClick={onClick} />;
};
