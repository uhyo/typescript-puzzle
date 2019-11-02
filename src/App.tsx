import React from "react";
import { Stage } from "./containers/Stage";
import { problems } from "./problems";
import { Option } from "./problems/options";

export const App = () => {
  const options: Option[] = [
    {
      type: "type",
      value: "string",
    },
    {
      type: "type",
      value: "number",
    },
    {
      type: "type",
      value: "boolean",
    },
  ];
  return (
    <>
      <Stage problem={problems.level1[0]} options={options} />
    </>
  );
};
