import React, { FC } from "react";
import { Option } from "~/problems/options";
import { OneOption } from "../OneOption";

export const FilledHole: FC<{
  content: Option;
}> = ({ content }) => <OneOption option={content} />;
