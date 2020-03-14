import React, { useMemo } from "react";
import { HoleContext, HoleValues } from "./HoleContext";

type Props = {
  holeValues: HoleValues;
  onHoleClick: (holeId: string) => void;
};

export const HoleProvider: React.FC<Props> = ({
  holeValues,
  onHoleClick,
  children,
}) => {
  const contextValue = useMemo(() => {
    return { holeValues, onHoleClick };
  }, [holeValues, onHoleClick]);
  return (
    <HoleContext.Provider value={contextValue}>{children}</HoleContext.Provider>
  );
};
