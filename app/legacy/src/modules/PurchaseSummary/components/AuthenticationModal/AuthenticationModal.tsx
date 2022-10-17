import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";
import { PopupContent } from "./styles";
import Treinta from "~/legacy/src/assets/treinta.png";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type AuthenticationModalType = {
  showModal: boolean;
  onClose: () => void;
  onLogin: () => void;
  onContinue: () => void;
};

export const AuthenticationModal = ({
  showModal,
  onClose,
  onLogin,
  onContinue,
}: AuthenticationModalType) => {
  const { breakpointsUnits } = useTheme();
  const windowSize = useWindowSize();
  const { t } = useTranslation();

  return (
    <Popup
      open={showModal}
      onClose={onClose}
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
    >
      <PopupContent>
        <img
          loading="lazy"
          className="treinta-logo"
          src={Treinta}
          alt="treinta-logo"
        />
        <Typography className="title" variant="Largebold" margin="0px">
          {t("purchaseSummary.authenticationModal.title")}
        </Typography>
        <Button
          label={t("commons.yes")}
          className="login-button"
          size="medium"
          upper={false}
          color="primary"
          colorType="500"
          hoverColor="primary"
          hoverColorType="300"
          textColor="secondary"
          textColorType="700"
          textVariant="Smallbold"
          variant="primary"
          onClick={onLogin}
          fullWidth={true}
        />
        <Button
          label={t("purchaseSummary.authenticationModal.continueButton")}
          className="continue-button"
          size="medium"
          upper={false}
          color="neutrals"
          colorType="100"
          borderColor="gray"
          borderColorType="900"
          hoverColor="gray"
          hoverColorType="400"
          textColor="secondary"
          textColorType="700"
          textVariant="Smallbold"
          variant="primary"
          onClick={onContinue}
          fullWidth={true}
        />
      </PopupContent>
    </Popup>
  );
};
