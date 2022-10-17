import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import { GenericEvent } from "~/legacy/src/hooks/useGenericEvent/models";
import { PopupContent } from "./styles";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import TreintaIcon from "~/legacy/src/assets/treinta.png";
import { TypeValidation } from "~/legacy/src/modules/BasicInformation/models";
import { useContext } from "react";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type AlreadyExistsModalType = {
  show: boolean;
  type: TypeValidation;
  onClose: () => void;
  onLogin: () => void;
};

export const AlreadyExistsModal = ({
  show,
  type,
  onClose,
  onLogin,
}: AlreadyExistsModalType) => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const { breakpointsUnits } = useTheme();
  const { splitIOKeyValue } = useContext(AppContext);
  const generateEvent = useGenericEvent();

  const onClickLogin = () => {
    onClose();
    onLogin();
    eventButton("WebPagosAssociatePurchase");
  };

  const onClickClose = () => {
    onClose();
    eventButton("WebPagosNotAssociatePurchase");
  };

  const eventButton = (eventName: GenericEvent) => {
    generateEvent({
      eventName,
      platforms: { amplitude: true },
    });
  };

  const LabelByType = {
    [TypeValidation.EMAIL]: {
      description: t("basicInformation.alreadyExists.email"),
      button: t("basicInformation.alreadyExists.continueOtherEmail"),
    },
    [TypeValidation.PHONE]: {
      description: t("basicInformation.alreadyExists.phone"),
      button: t("basicInformation.alreadyExists.continueOtherPhone"),
    },
  };

  const isNoLoginPOS =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationNoLoginPOS];

  return (
    <Popup
      open={show}
      onClose={() => onClose()}
      padding={windowSize.width > breakpointsUnits.sm ? "32px" : "16px"}
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
      dataTestId="already-exists-popup"
    >
      <PopupContent isNoLoginPOS={isNoLoginPOS}>
        <img
          loading="lazy"
          src={TreintaIcon}
          alt={t("commons.company")}
          className="logo"
        />
        <Typography
          className="title"
          variant={
            isNoLoginPOS
              ? windowSize.width > breakpointsUnits.md
                ? "XXLargebold"
                : "XLargebold"
              : "XLargebold"
          }
          margin="0"
        >
          {isNoLoginPOS
            ? t(
                "basicInformation.alreadyExists.noLoginPOS.youAlreadyHaveAnAccount"
              )
            : LabelByType[type].description}
        </Typography>
        {isNoLoginPOS && (
          <Typography className="subtitle" variant="Medium" margin="0">
            {t(
              "basicInformation.alreadyExists.noLoginPOS.wantToAssociateYourPurchase"
            )}
          </Typography>
        )}
        <Button
          label={
            isNoLoginPOS
              ? t(
                  "basicInformation.alreadyExists.noLoginPOS.yesAssociateMyAccount"
                )
              : t("basicInformation.alreadyExists.login")
          }
          className="confirm-data-button"
          size="medium"
          upper={false}
          color="primary"
          hoverColor="primary"
          hoverColorType="500"
          textColor="neutrals"
          textColorType="900"
          textVariant="Mediumbold"
          variant="primary"
          dataTestId="login-button"
          onClick={onClickLogin}
          fullWidth={true}
        />
        <Button
          label={
            isNoLoginPOS
              ? t(
                  "basicInformation.alreadyExists.noLoginPOS.noAssociateMyAccount"
                )
              : LabelByType[type].button
          }
          size="medium"
          upper={false}
          color="neutrals"
          colorType="100"
          hoverColor="secondary"
          hoverColorType="100"
          textColor="secondary"
          textColorType="700"
          textVariant="Mediumbold"
          borderColor="secondary"
          borderColorType="700"
          variant="secondary"
          dataTestId="use-other-data-button"
          onClick={onClickClose}
          fullWidth={true}
        />
      </PopupContent>
    </Popup>
  );
};
