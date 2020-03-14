import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { Hole } from "~/components/Hole/HoleContainer";
import { HoleContext } from "~/components/Hole/HoleContext";
import { useStageActions } from "~/containers/Stage/logic";
import { HoleValue } from "~/problems/options";

export const OptionsDisplay: FC<{
  options: HoleValue[];
}> = ({ options }) => {
  const { selectOption } = useStageActions();

  const holeContextValue = useMemo(() => {
    const holeValues: { [holeId in string]?: HoleValue } = {};
    for (const [holeId, value] of options.entries()) {
      holeValues[holeId] = value;
    }
    return {
      holeValues,
      onHoleClick: (holeId: string) => {
        console.log(holeId);
        // child hole could be selected, so convert e.g. "3.0" to "3"
        const selectedHoleId = parseInt(holeId, 10);
        selectOption(options[selectedHoleId]);
      },
    };
  }, [options, selectOption]);

  return (
    <HoleContext.Provider value={holeContextValue}>
      <OptionsWrapper>
        {options.map((option, i) => (
          <Hole key={i} holeId={String(i)} />
        ))}
      </OptionsWrapper>
    </HoleContext.Provider>
  );
};

const OptionsWrapper = styled.div``;
