import React, { useContext } from "react";
import { holeDefs } from "~/stages/holes";
import { getSubHoleId } from "~/stages/holes/subHoleIds";
import { BlankHole } from "./components/BlankHole";
import { FilledHoleBase } from "./components/HoleBase";
import { HoleContent } from "./components/HoleContent";
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

  const children: JSX.Element[] = [];
  for (const sub of holeDefs.subHoleIds(value)) {
    const subHoleId = getSubHoleId(holeId, sub);
    children.push(<Hole key={subHoleId} holeId={subHoleId} />);
  }

  return (
    <FilledHoleBase data-holeid={holeId} focused={isFocused}>
      <HoleContent hole={value}>{children}</HoleContent>
    </FilledHoleBase>
  );
};
