import { faCheck, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";
import { ServiceWorkerState } from "~/containers/App/registerServiceWorker";
import { LevelDoc } from "~/db/level";
import { Level, levelList, levelMetadata } from "~/definitions/stages/levels";
import { mainBackgroundColor } from "~/design/color";
import { largeRoundedBoxRadius } from "~/design/length";
import { Fetcher } from "~/util/Fetcher";
import { AppHeader } from "../AppHeader";
import { Crown } from "../Crown";
import { PageWrapper } from "../PageWrapper";
import { Footer } from "./Footer";
import { PrivacyNotice } from "./PrivacyNotice";
import { UpdateNotice } from "./UpdateNotice";

export const LevelSelectComponent: FC<{
  clearedLevelsFetcher: Fetcher<LevelDoc[]>;
  serviceWorkerState: Fetcher<ServiceWorkerState>;
  privacyConfirmed: boolean;
  onSelect?: (level: Level) => void;
  onPrivacyConfirm: () => void;
}> = ({
  clearedLevelsFetcher,
  serviceWorkerState,
  privacyConfirmed,
  onSelect,
  onPrivacyConfirm,
}) => {
  const clearedLevels = clearedLevelsFetcher.get();
  return (
    <>
      <AppHeader decorations>Type Puzzles (Beta)</AppHeader>
      <Wrapper>
        <div>
          <UpdateNotice serviceWorkerState={serviceWorkerState} />
        </div>
        <div>
          <PrivacyNotice
            privacyConfirmed={privacyConfirmed}
            onConfirm={onPrivacyConfirm}
          />
        </div>
        <div>
          {levelList.map(level => {
            const meta = levelMetadata[level];
            const clickHandler =
              onSelect &&
              (() => {
                onSelect(level);
              });
            const status = clearedLevels.find(lv => lv.level === level)?.status;
            return (
              <LevelButton key={level} onClick={clickHandler}>
                {meta.name}
                {status === "completed" ? (
                  <CrownIcon title="You solved all the questions in this level">
                    <FontAwesomeIcon icon={faCrown} />
                  </CrownIcon>
                ) : status === "cleared" ? (
                  <Check title="You cleared this level">
                    <FontAwesomeIcon icon={faCheck} />
                  </Check>
                ) : null}
              </LevelButton>
            );
          })}
        </div>
        <div>
          <Footer />
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(PageWrapper)`
  & > div:nth-child(1),
  & > div:nth-child(2) {
    flex: auto 0 0;
  }

  & > div:nth-child(3) {
    flex: auto 1 1;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: stretch;
  }
`;

const LevelButton = styled.button`
  position: relative;
  background-color: ${mainBackgroundColor};
  margin-top: 2rem;
  padding: 8px;
  border-radius: ${largeRoundedBoxRadius};
  color: white;
  font-size: 1.5rem;
`;

const Check = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1.5) translateY(-30%);

  color: #55c41a;
`;

const CrownIcon = styled(Crown)`
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1.5) translateY(-45%) rotate(15deg);
`;
