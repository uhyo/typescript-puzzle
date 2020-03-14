import React, { useCallback, useContext } from "react";
import { range } from "~/util/range";
import { BlankHole } from "./components/BlankHole";
import { TypeHole } from "./components/TypeHole";
import { UnionHole } from "./components/UnionHole";
import { HoleContext } from "./HoleContext";

type Props = {
  holeId: string;
};

export const Hole: React.FC<Props> = ({ holeId }) => {
  const { holeValues, onHoleClick, focus } = useContext(HoleContext);
  const value = holeValues[holeId];
  const isFocused = focus === holeId;

  const holeClickHandler = useCallback(() => onHoleClick(holeId), [
    holeId,
    onHoleClick,
  ]);

  if (value === undefined) {
    return <BlankHole onClick={holeClickHandler} focused={isFocused} />;
  }
  switch (value.type) {
    case "type":
      return (
        <TypeHole
          holeId={holeId}
          value={value}
          focused={isFocused}
          onClick={holeClickHandler}
        />
      );
    case "union":
      return (
        <UnionHole
          value={value}
          holeId={holeId}
          focused={isFocused}
          onClick={holeClickHandler}
        >
          {range(0, value.size - 1).map(index => {
            const childHoleId = `${holeId}.${index}`;
            return <Hole key={childHoleId} holeId={childHoleId} />;
          })}
        </UnionHole>
      );
  }
};
