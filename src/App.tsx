import React from "react";
import { ProblemDisplay } from "./components/ProblemDisplay";
import { problems } from "./problems";

export const App = () => <ProblemDisplay problem={problems.level1[0]} />;
