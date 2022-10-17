import { Popup, Typography } from "@30sas/web-ui-kit-core";

import { PopupContent } from "./styles";
import { WarningIcon } from "@30sas/web-ui-kit-icons";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type MaximumMposQuantityModalType = {
  show: boolean;
  onClose: () => void;
};

export const MaximumMposQuantityModal = ({
  show,
  onClose,
}: MaximumMposQuantityModalType) => {
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
        <WarningIcon height={42} width={52} />
        <Typography className="title" variant="XLargebold" margin="0">
          {t("basicInformation.mposAvailability.title")}
        </Typography>
        <Typography className="title" variant="Large" margin="0">
          {t("basicInformation.mposAvailability.message")}
        </Typography>
      </PopupContent>
    </Popup>
  );
};
