import React, { FC } from "react";
import { BlankHole } from "~/components/Hole";
import { TypeOption, UnionOption } from "~/components/OneOption";
import { AnswerState } from "~/containers/Stage/logic";
import { OpenHole } from "./OpenHole";

export const OneHole: FC<{
  answer: AnswerState;
  holeId: string;
  focus: string | undefined;
  onHoleClick?: (holeId: string) => void;
}> = ({ answer, holeId, focus, onHoleClick }) => {
  const a = answer[holeId];
  const focused = holeId === focus;
  if (!a) {
    return <OpenHole focused={focused} onClick={() => onHoleClick?.(holeId)} />;
  } else {
    switch (a.type) {
      case "type": {
        return (
          <TypeOption
            option={a}
            focused={focused}
            holeId={holeId}
            onHoleClick={onHoleClick}
          />
        );
      }
      case "union": {
        return (
          <UnionOption
            option={a}
            focused={focused}
            holeId={holeId}
            onHoleClick={onHoleClick}
          >
            <BlankHole short />
            <BlankHole short />
          </UnionOption>
        );
      }
    }
  }
};
