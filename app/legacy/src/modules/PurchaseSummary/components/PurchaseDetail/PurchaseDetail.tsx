import {
  CalculatorIcon,
  MoneyIcon,
  ShippingCarIcon,
} from "@30sas/web-ui-kit-icons";
import { Container } from "./styles";
import { Typography } from "@30sas/web-ui-kit-core";
import { WarningCustom } from "~/legacy/src/commons/components/WarningCustom";

import { formatToCurrency } from "~/legacy/src/utils/format";
import { useTranslation } from "react-i18next";

type PurchaseDetailType = {
  mposValue: number;
  mposQuantity: number;
  costOfShipping: number;
  total: number;
  oldPrice: number;
};

export const PurchaseDetail = ({
  mposValue,
  mposQuantity,
  costOfShipping,
  total,
  oldPrice,
}: PurchaseDetailType) => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="row">
        <div className="label">
          <CalculatorIcon />
          <Typography variant="Large" margin="0">
            {`${t("purchaseSummary.mposValue")} (x${mposQuantity})`}
          </Typography>
        </div>
        <div className="value">
          <Typography className="old-price" variant="Largebold" margin="0">
            {formatToCurrency(oldPrice)}
          </Typography>
          <Typography variant="Largebold" margin="0">
            {formatToCurrency(mposValue)}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <ShippingCarIcon />
          <Typography variant="Large" margin="0">
            {t("purchaseSummary.costOfShipping")}
          </Typography>
        </div>
        <div className="value">
          {costOfShipping > 0 ? (
            <Typography variant="Largebold" margin="0">
              {formatToCurrency(costOfShipping)}
            </Typography>
          ) : (
            <WarningCustom
              className="chip"
              label={`¡${t("commons.free").toUpperCase()}!`}
            />
          )}
        </div>
      </div>
      <div className="separator" />
      <div className="row">
        <div className="label">
          <MoneyIcon />
          <Typography variant="Largebold" margin="0">
            {t("purchaseSummary.totalToPay")}
          </Typography>
        </div>
        <div className="value">
          <Typography variant="Largebold" margin="0">
            {formatToCurrency(total)}
          </Typography>
        </div>
      </div>
    </Container>
  );
};
