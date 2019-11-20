import React, { FC } from "react";
import { TypeOption, UnionOption } from "~/components/OneOption";
import { AnswerState } from "~/containers/Stage/logic";
import { OpenHole } from "./OpenHole";

export const OneHole: FC<{
  answer: AnswerState;
  holeId: string;
  focus: string | undefined;
  onClick?: () => void;
}> = ({ answer, holeId, focus, onClick }) => {
  const a = answer[holeId];
  const focused = holeId === focus;
  if (!a) {
    return <OpenHole focused={focused} onClick={onClick} />;
  } else {
    switch (a.type) {
      case "type": {
        return <TypeOption option={a} focused={focused} onClick={onClick} />;
      }
      case "union": {
        return <UnionOption option={a} focused={focused} onClick={onClick} />;
      }
    }
  }
};
