import React, { FC } from "react";
import styled from "styled-components";
import { TypeOption, UnionOption } from "~/components/OneOption";
import { useStageActions } from "~/containers/Stage/logic";
import { Option } from "~/problems/options";

export const OptionsDisplay: FC<{
  options: Option[];
}> = ({ options }) => {
  const { selectOption } = useStageActions();
  const onHoleClick = (holeId: string) => {
    console.log(holeId);
    selectOption(options[Number(holeId)]);
  };
  return (
    <OptionsWrapper>
      {options.map((option, i) => (
        <OneOption
          key={i}
          option={option}
          holeId={String(i)}
          onHoleClick={onHoleClick}
        />
      ))}
    </OptionsWrapper>
  );
};

const OneOptionInner: FC<{
  option: Option;
  className?: string;
  holeId: string;
  onHoleClick?: (holeId: string) => void;
}> = ({ option, className, holeId, onHoleClick }) => {
  // TODO: it's copy-pasted
  switch (option.type) {
    case "type": {
      return (
        <TypeOption
          className={className}
          option={option}
          holeId={holeId}
          onHoleClick={onHoleClick}
        />
      );
    }
    case "union": {
      return (
        <UnionOption
          className={className}
          option={option}
          holeId={holeId}
          onHoleClick={onHoleClick}
        />
      );
    }
  }
};

const OptionsWrapper = styled.div``;

const OneOption = styled(OneOptionInner)`
  margin: 3px 0.5ex;
`;
