import { BackContainer, Container } from "./styles";

import { BackIcon } from "@30sas/web-ui-kit-icons";
import { Icon } from "~/legacy/src/commons/components";
import { ROUTES } from "~/legacy/src/constants";
import { STEPS } from "../../constants";
import Treinta from "~/legacy/src/assets/treinta.png";
import { Typography } from "@30sas/web-ui-kit-core";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useTranslation } from "react-i18next";

type RightHeaderType = {
  currentStep: string;
};

export const RightHeader = ({ currentStep }: RightHeaderType) => {
  const { t } = useTranslation();
  const { navigate } = useAllowedNavigation();
  const stepsArray = Object.values(STEPS);
  const stepIndex: number = stepsArray.findIndex(
    (item) => currentStep === item.path
  );
  const step = Object.values(STEPS)[stepIndex];

  return (
    <Container>
      <img loading="lazy" src={Treinta} alt="treinta-logo" className="logo" />
      {step?.icon && (
        <div className="circle">
          <Icon name={step.icon} height={32} width={32} />
        </div>
      )}

      {step.path !== ROUTES.PAYMENT_CONFIRMATION && (
        <div>
          <BackContainer onClick={() => navigate(step.backRoute)}>
            <BackIcon width={24} height={24} />
            <Typography variant="Largebold" margin="0">
              {t("commons.goBack")}
            </Typography>
          </BackContainer>
          <Typography
            variant="Smallbold"
            margin="0"
            className="step-description"
          >
            {`${t("commons.step")} ${stepIndex + 1} de ${stepsArray.length}`}
          </Typography>
          {step?.title && (
            <Typography className="title" variant="XXLargebold" margin="0">
              {step.title}
            </Typography>
          )}
          {step?.helpText && (
            <Typography className="helpText" variant="Small" margin="0">
              {step?.helpText}
            </Typography>
          )}
        </div>
      )}
    </Container>
  );
};
