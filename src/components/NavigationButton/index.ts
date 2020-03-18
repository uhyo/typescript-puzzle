import styled from "styled-components";
import {
  affirmativeBackgroundColor,
  disabledBackgroundColor,
} from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";

export const NavigationButton = styled.button`
  width: 100%;
  background-color: ${affirmativeBackgroundColor};
  color: white;
  font-size: 1.2em;
  font-weight: bold;

  margin: 1.2em 0;
  padding: 6px;
  border-radius: ${largeRoundedBoxRadius};

  &[disabled] {
    background-color: ${disabledBackgroundColor};
  }
`;
