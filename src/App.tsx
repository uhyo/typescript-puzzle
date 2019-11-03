import React from "react";
import { Stage } from "./containers/Stage";
import { problems } from "./problems";

export const App = () => {
  const stage = problems.level1[0];
  return (
    <>
      <Stage problem={stage.problem} options={stage.options} />
    </>
  );
};
