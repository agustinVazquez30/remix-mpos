import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";

import { PopupContent } from "./styles";
import TreintaIcon from "~/legacy/src/assets/treinta.png";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type LoginErrorModalType = {
  show: boolean;
  title: string;
  onClose: () => void;
  onClick: () => void;
};

export const LoginErrorModal = ({
  show,
  title,
  onClose,
  onClick,
}: LoginErrorModalType) => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const { breakpointsUnits } = useTheme();

  return (
    <Popup
      open={show}
      onClose={onClose}
      padding={windowSize.width > breakpointsUnits.sm ? "32px" : "16px"}
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
      dataTestId="login-error-modal"
    >
      <PopupContent>
        <img
          loading="lazy"
          src={TreintaIcon}
          alt={t("commons.company")}
          className="logo"
        />
        <Typography className="title" variant="XLargebold" margin="0">
          {title}
        </Typography>
        <Typography className="message" variant="Medium" margin="0">
          {t("basicInformation.errorModal.message")}
        </Typography>
        <Button
          label={t("commons.continue")}
          className="error-modal-button"
          size="medium"
          upper={false}
          color="primary"
          hoverColor="primary"
          hoverColorType="500"
          textColor="neutrals"
          textColorType="900"
          textVariant="Mediumbold"
          variant="primary"
          dataTestId="error-modal-button"
          onClick={onClick}
          fullWidth={true}
        />
      </PopupContent>
    </Popup>
  );
};
