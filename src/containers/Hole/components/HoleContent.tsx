import { FC } from "react";
import { holeDefs, HoleValue } from "~/stages/holes/holeDefs";

type Props = {
  hole: HoleValue;
};

export const HoleContent: FC<Props> = ({ hole, ...props }) => {
  return holeDefs.render(hole, props);
};
