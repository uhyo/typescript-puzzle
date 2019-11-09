import React, { FC } from "react";
import styled from "styled-components";
import { useStageActions } from "~/containers/Stage/logic";
import { Option } from "~/problems/options";
import { OneOption as OneOptionOrig } from "../../OneOption";

export const OptionsDisplay: FC<{
  options: Option[];
}> = ({ options }) => {
  const { selectOption } = useStageActions();
  return (
    <OptionsWrapper>
      {options.map((option, i) => (
        <OneOption
          key={i}
          option={option}
          onClick={() => {
            selectOption(option);
          }}
        />
      ))}
    </OptionsWrapper>
  );
};

const OptionsWrapper = styled.div``;

const OneOption = styled(OneOptionOrig)`
  margin: 3px 0.5ex;
`;
