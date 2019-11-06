import React, { Dispatch, FC, useCallback, useTransition } from "react";
import { LevelSelectComponent } from "~/components/LevelSelect";
import { Level } from "~/problems/levels";
import { Fetcher } from "~/util/Fetcher";
import { AppAction } from "../App/logic";

export const LevelSelect: FC<{
  dispatch: Dispatch<AppAction>;
  clearedLevelsFetcher: Fetcher<Level[]>;
}> = ({ dispatch, clearedLevelsFetcher }) => {
  const [startTransition] = useTransition();
  const onSelect = useCallback(
    (level: Level) => {
      startTransition(() => {
        dispatch({
          type: "goToLevel",
          level,
        });
      });
    },
    [dispatch],
  );
  // TODO: pass this from props
  const clearedLevels = clearedLevelsFetcher.get();
  console.log(clearedLevels);

  // console.log(clearedLevels);
  return <LevelSelectComponent onSelect={onSelect} />;
};
