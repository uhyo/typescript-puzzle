import React, { FC } from "react";
import { BlankHole } from "~/components/Hole";

export const OpenHole: FC<{
  focused?: boolean;
  onClick?: () => void;
}> = ({ focused, onClick }) => {
  return <BlankHole focused={!!focused} onClick={onClick} />;
};
