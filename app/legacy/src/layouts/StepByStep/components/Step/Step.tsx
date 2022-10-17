import { Container } from "./styles";
import { ROUTES } from "~/legacy/src/constants";
import TickCircle from "~/legacy/src/assets/tick-circle-yellow-icon.png";
import { Typography } from "@30sas/web-ui-kit-core";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";

type StepType = {
  index: number;
  activeIndex: number;
  title: string;
  isLast?: boolean;
  path: ROUTES;
};

export const Step = ({ index, activeIndex, title, isLast, path }: StepType) => {
  const { navigate } = useAllowedNavigation();
  const isActive = index === activeIndex;
  const isCompleted = index < activeIndex;
  const lastPageIndex = 4;
  const isLastPage = activeIndex !== lastPageIndex;
  return (
    <Container
      isActive={isActive}
      isCompleted={isCompleted}
      isFinished={isLastPage}
      onClick={() => {
        if (isLastPage) {
          isCompleted && navigate(path);
        }
      }}
    >
      <div className="step">
        <div className={`step-circle`}>
          <div className="inner-circle">
            {isCompleted ? (
              <img loading="lazy" src={TickCircle} alt="tick-circle" />
            ) : (
              <Typography
                className="circle-text"
                variant="Mediumbold"
                margin="0"
              >
                {index + 1}
              </Typography>
            )}
          </div>
        </div>
        <Typography className="step-title" variant="Mediumbold" margin="0">
          {title}
        </Typography>
      </div>
      {!isLast && (
        <div className="separator">
          <div className="separator-line"></div>
        </div>
      )}
    </Container>
  );
};
