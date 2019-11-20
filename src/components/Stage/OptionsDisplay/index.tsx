import React, { FC } from "react";
import styled from "styled-components";
import { TypeOption, UnionOption } from "~/components/OneOption";
import { useStageActions } from "~/containers/Stage/logic";
import { Option } from "~/problems/options";

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

const OneOptionInner: FC<{
  option: Option;
  className?: string;
  onClick?: () => void;
}> = ({ option, className, onClick }) => {
  // TODO: it's copy-pasted
  switch (option.type) {
    case "type": {
      return (
        <TypeOption className={className} option={option} onClick={onClick} />
      );
    }
    case "union": {
      return (
        <UnionOption className={className} option={option} onClick={onClick} />
      );
    }
  }
};

const OptionsWrapper = styled.div``;

const OneOption = styled(OneOptionInner)`
  margin: 3px 0.5ex;
`;
