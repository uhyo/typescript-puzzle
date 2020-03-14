import React, { useContext } from "react";
import { range } from "~/util/range";
import { BlankHole } from "./components/BlankHole";
import { TypeHole } from "./components/TypeHole";
import { UnionHole } from "./components/UnionHole";
import { HoleContext } from "./HoleContext";

type Props = {
  holeId: string;
};

export const Hole: React.FC<Props> = ({ holeId }) => {
  const { holeValues, focus } = useContext(HoleContext);
  const value = holeValues[holeId];
  const isFocused = focus === holeId;

  if (value === undefined) {
    return <BlankHole holeId={holeId} focused={isFocused} />;
  }
  switch (value.type) {
    case "type":
      return <TypeHole holeId={holeId} value={value} focused={isFocused} />;
    case "union":
      return (
        <UnionHole value={value} holeId={holeId} focused={isFocused}>
          {range(0, value.size - 1).map(index => {
            const childHoleId = `${holeId}.${index}`;
            return <Hole key={childHoleId} holeId={childHoleId} />;
          })}
        </UnionHole>
      );
  }
};
