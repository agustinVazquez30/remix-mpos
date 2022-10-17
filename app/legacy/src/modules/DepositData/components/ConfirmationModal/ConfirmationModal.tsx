import { Alert, Button, Popup, Typography } from "@30sas/web-ui-kit-core";

import { InfoIcon } from "@30sas/web-ui-kit-icons";
import { PopupContent } from "./styles";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type ConfirmationModalType = {
  show: boolean;
  formInfo: {
    document: string;
    bank: string;
    bankId: number;
    accountNumber: string;
    accountType: string;
    methodsPayment?: string;
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
  const { breakpointsUnits } = useTheme();
  const windowSize = useWindowSize();
  const { document, bank, accountNumber, accountType } = formInfo;

  return (
    <Popup
      open={show}
      onClose={() => onClose()}
      padding="16px"
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
    >
      <PopupContent>
        <Typography className="title" variant="XLargebold" margin="0">
          {t("depositData.confirmModal.title")}
        </Typography>
        <Alert
          Icon={InfoIcon}
          textVariant="Small"
          text={
            <span className="alert-text">
              {`${t("depositData.confirmModal.alert.firstPart")} `}
              <strong>{t("depositData.confirmModal.alert.secondPart")}</strong>
            </span>
          }
        />
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("commons.document")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {document}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("commons.bank")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {bank}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("commons.accountNumber")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {accountNumber}
            </Typography>
          </div>
        </div>
        <div className="row">
          <div className="label">
            <Typography variant="Mediumbold" margin="0">
              {t("commons.accountType")}
            </Typography>
          </div>
          <div className="value">
            <Typography variant="Medium" margin="0">
              {accountType}
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
            onConfirmData();
            onClose();
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
