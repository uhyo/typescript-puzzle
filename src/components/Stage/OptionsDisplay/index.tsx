import React, { FC } from "react";
import styled from "styled-components";
import { Option } from "~/problems/options";
import { OneOption as OneOptionOrig } from "../../OneOption";

export const OptionsDisplay: FC<{
  options: Option[];
  onOptionSelect?: (index: number) => void;
}> = ({ options, onOptionSelect }) => {
  return (
    <OptionsWrapper>
      {options.map((option, i) => (
        <OneOption
          key={i}
          option={option}
          onClick={
            onOptionSelect &&
            (() => {
              onOptionSelect(i);
            })
          }
        />
      ))}
    </OptionsWrapper>
  );
};

const OptionsWrapper = styled.div``;

const OneOption = styled(OneOptionOrig)`
  margin: 3px 0.5ex;
`;
