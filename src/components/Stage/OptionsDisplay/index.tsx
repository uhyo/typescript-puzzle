import React, { FC, useCallback, useMemo, useTransition } from "react";
import styled from "styled-components";
import { getInnermostHole } from "~/containers/Hole/getInnermostHole";
import { Hole } from "~/containers/Hole/HoleContainer";
import { HoleContext } from "~/containers/Hole/HoleContext";
import { useStageActions } from "~/containers/Stage/logic";
import { HoleValue } from "~/problems/options";

export const OptionsDisplay: FC<{
  options: HoleValue[];
}> = ({ options }) => {
  const [startTransition] = useTransition();
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
        console.log(holeId);
        // child hole could be selected, so convert e.g. "3.0" to "3"
        const selectedHoleId = parseInt(holeId, 10);
        startTransition(() => {
          selectOption(options[selectedHoleId]);
        });
      }
    },
    [selectOption],
  );

  return (
    <HoleContext.Provider value={holeContextValue}>
      <OptionsWrapper onClick={clickHandler}>
        {options.map((option, i) => (
          <Hole key={i} holeId={String(i)} />
        ))}
      </OptionsWrapper>
    </HoleContext.Provider>
  );
};

const OptionsWrapper = styled.div``;
