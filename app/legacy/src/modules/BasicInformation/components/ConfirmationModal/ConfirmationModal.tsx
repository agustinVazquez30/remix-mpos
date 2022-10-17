import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";

import { PopupContent } from "./styles";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type ConfirmationModalType = {
  show: boolean;
  formInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  onConfirmData: () => void;
  onClose: () => void;
};

export const ConfirmationModal = ({
  show,
  formInfo,
  onConfirmData,
  onClose,
}: ConfirmationModalType) => {
  const { t } = useTranslation();
  const { fullName, email, phone } = formInfo;
  const windowSize = useWindowSize();
  const { breakpointsUnits } = useTheme();

  return (
    <Popup
      open={show}
      onClose={() => onClose()}
      padding="16px"
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
    >
      <PopupContent>
        <Typography className="title" variant="XLargebold" margin="0">
          {t("basicInformation.confirmData")}
        </Typography>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("commons.name")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {fullName}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("basicInformation.emailInput.label")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {email}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("basicInformation.phoneInput.label")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {phone}
            </Typography>
          </div>
        </div>
        <Button
          label={t("commons.confirmData")}
          className="confirm-data-button"
          size="medium"
          upper={false}
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={() => {
            onClose();
            onConfirmData();
          }}
          fullWidth={true}
        />
        <Button
          label={t("commons.editData")}
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
          onClick={() => onClose()}
          fullWidth={true}
        />
      </PopupContent>
    </Popup>
  );
};
