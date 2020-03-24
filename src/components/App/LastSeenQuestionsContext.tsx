import React, { createContext, FC, memo, useMemo } from "react";
import { useAppActions } from "~/containers/App/logic";

type Contents = {
  addedQuestionNumber?: number;
  onClose(): void;
};

export const LastSeenQuestionsContext = createContext<Contents>({
  onClose() {},
});

type Props = {
  allNumber: number;
  lastSeenQuestionNumber: number | undefined;
};

export const ProvideLastSeenQuestions: FC<Props> = memo(
  ({ children, lastSeenQuestionNumber, allNumber }) => {
    const { setLastSeenQuestionNumber } = useAppActions();

    const contextValue = useMemo(
      () => ({
        addedQuestionNumber:
          lastSeenQuestionNumber !== undefined
            ? allNumber - lastSeenQuestionNumber
            : undefined,
        onClose: () => {
          setLastSeenQuestionNumber(allNumber);
        },
      }),
      [setLastSeenQuestionNumber, allNumber, lastSeenQuestionNumber],
    );

    return (
      <LastSeenQuestionsContext.Provider value={contextValue}>
        {children}
      </LastSeenQuestionsContext.Provider>
    );
  },
);
