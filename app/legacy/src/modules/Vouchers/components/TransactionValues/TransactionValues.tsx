import { Box } from "./styles";
import { Typography } from "@30sas/web-ui-kit-core";
import { formatToCurrency } from "~/legacy/src/utils/format";
import { useTranslation } from "react-i18next";

type TransactionValuesType = {
  total: number;
  subTotal: number;
  taxAmount: number;
  extraTaxAmount: number;
};

export const TransactionValues = ({
  subTotal,
  taxAmount,
  extraTaxAmount,
  total,
}: TransactionValuesType) => {
  const { t } = useTranslation();

  return (
    <Box>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t("commons.subTotal")}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {formatToCurrency(subTotal)}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t("commons.taxAmount")}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {formatToCurrency(taxAmount)}
          </Typography>
        </div>
      </div>

      {extraTaxAmount > 0 && (
        <div className="row">
          <div className="label">
            <Typography className="label-text" variant="Medium" margin="0">
              {t("commons.extraTaxAmount")}
            </Typography>
          </div>
          <div className="value">
            <Typography className="value-text" variant="Mediumbold" margin="0">
              {formatToCurrency(extraTaxAmount)}
            </Typography>
          </div>
        </div>
      )}

      <div className="row">
        <div className="label">
          <Typography variant="Mediumbold">{t("commons.total")}</Typography>
        </div>
        <div className="value">
          <Typography variant="Mediumbold">
            {formatToCurrency(total)}
          </Typography>
        </div>
      </div>
    </Box>
  );
};
