import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";
import { AlertIcon } from "~/legacy/src/commons/components/AlertIcon/AlertIcon";
import { Container } from "./styles";
import { ROUTES } from "~/legacy/src/constants";
import { Theme } from "~/legacy/src/config/Theme";
import Treinta from "~/legacy/src/assets/treinta.png";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

interface ErrorEmailVerifyingProps {
  show: boolean;
}

export const ErrorEmailVerifying: React.FC<ErrorEmailVerifyingProps> = ({
  show,
}) => {
  const { navigate } = useAllowedNavigation();
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isTablet = width < Number(Theme.breakpointsUnits.md);

  const handleOnRetry = () => {
    navigate(ROUTES.BASIC_INFORMATION);
  };

  return (
    <Popup
      hideCloseButton
      open={show}
      padding="0"
      {...(isTablet ? { width } : {})}
    >
      <Container>
        <div className="wrapper" role="alert">
          {isTablet && (
            <img
              loading="lazy"
              className="treinta-logo"
              src={Treinta}
              alt="Logo de Treinta"
              width={160}
            />
          )}
          <AlertIcon altText="Icono de alerta" />
          <Typography
            className="title"
            variant="Largebold"
            lineHeight="1"
            margin="0"
            color="secondary"
            textAlign="center"
            colorType="700"
            children={t("components.errorMailVeryfing.title")}
          />
          <Typography
            className="message"
            variant="Medium"
            lineHeight="24px"
            textAlign="center"
            color="gray"
            colorType="700"
            margin="0"
            children={t("components.errorMailVeryfing.subtitle")}
          />
          <Button
            label={t("commons.tryAgain")}
            size="medium"
            upper={false}
            color="primary"
            hoverColor="primary"
            hoverColorType="500"
            textColor="primary"
            textColorType="900"
            textVariant="Mediumbold"
            variant="primary"
            dataTestId="login-button"
            onClick={handleOnRetry}
            fullWidth
          />
          <WhatsappButton
            label={t("commons.contactSupport")}
            fullWidth
            overwriteZendesk
          />
        </div>
      </Container>
    </Popup>
  );
};
