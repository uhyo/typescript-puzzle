import React from "react";
import { OptionsDisplay } from "./components/OptionsDisplay";
import { ProblemDisplay } from "./components/ProblemDisplay";
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
      <ProblemDisplay problem={problems.level1[0]} />
      <OptionsDisplay options={options} />
    </>
  );
};
