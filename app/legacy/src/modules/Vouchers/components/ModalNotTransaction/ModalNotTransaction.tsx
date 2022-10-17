import { Button, Popup, Typography } from "@30sas/web-ui-kit-core";
import { PopupContent } from "~/legacy/src/modules/BasicInformation/components/ConfirmationModal/styles";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type ModalNotTransactionType = {
  show: boolean;
  onClose: () => void;
};
const ModalNotTransaction = ({ show, onClose }: ModalNotTransactionType) => {
  const { t } = useTranslation();
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
          {t("vouchers.modalNotTransaction.message")}
        </Typography>
        <Button
          label={t("vouchers.modalNotTransaction.confirmData")}
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
          onClick={() => onClose()}
          fullWidth={true}
        />
      </PopupContent>
    </Popup>
  );
};

export default ModalNotTransaction;
