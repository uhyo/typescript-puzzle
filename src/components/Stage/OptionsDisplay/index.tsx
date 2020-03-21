import React, {
  FC,
  TransitionStartFunction,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import { getInnermostHole } from "~/containers/Hole/getInnermostHole";
import { Hole } from "~/containers/Hole/HoleContainer";
import { HoleContext } from "~/containers/Hole/HoleContext";
import { useStageActions } from "~/containers/Stage/logic";
import { gapBetweenTappable } from "~/design/length";
import { HoleValue } from "~/stages/holes/holeDefs";

export const OptionsDisplay: FC<{
  options: readonly HoleValue[];
  startCheckTransition: TransitionStartFunction;
}> = ({ options, startCheckTransition }) => {
  const { selectOption } = useStageActions();

  const holeContextValue = useMemo(() => {
    const holeValues: { [holeId in string]?: HoleValue } = {};
    for (const [holeId, value] of options.entries()) {
      holeValues[holeId] = value;
    }
    return {
      holeValues,
    };
  }, [options, selectOption]);

  const clickHandler = useCallback(
    (e: React.SyntheticEvent) => {
      const holeId = getInnermostHole(e.target as Node);
      if (holeId) {
        // child hole could be selected, so convert e.g. "3.0" to "3"
        const selectedHoleId = parseInt(holeId, 10);
        selectOption(options[selectedHoleId], startCheckTransition);
      }
    },
    [selectOption],
  );

  return (
    <HoleContext.Provider value={holeContextValue}>
      <OptionsWrapper onClick={clickHandler}>
        {options.map((option, i) => (
          <li key={i}>
            <Hole holeId={String(i)} />
          </li>
        ))}
      </OptionsWrapper>
    </HoleContext.Provider>
  );
};

const OptionsWrapper = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;

  & > li {
    margin: ${gapBetweenTappable};
  }
`;
