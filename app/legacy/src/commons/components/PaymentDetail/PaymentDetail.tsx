import {
  CalculatorIcon,
  DateIcon,
  MoneyIcon,
  ShippingCarIcon,
} from "@30sas/web-ui-kit-icons";
import { Container } from "./styles";
import { Typography } from "@30sas/web-ui-kit-core";
import { WarningCustom } from "~/legacy/src/commons/components/WarningCustom";
import { formatToCurrency } from "~/legacy/src/utils/format";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

type PaymentDetailType = {
  mposValue: number;
  mposQuantity: number;
  shippingCost: number;
  shippingTime: number;
  total: number;
};

export const PaymentDetail = ({
  mposQuantity,
  mposValue,
  shippingCost,
  shippingTime,
  total,
}: PaymentDetailType) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container>
      <div className="row">
        <div className="label">
          <CalculatorIcon color={theme.colors.gray[400]} />
          <Typography variant="Medium" margin="0">
            {`${t("paymentConfirmation.mposValue")} (x${mposQuantity})`}
          </Typography>
        </div>
        <div className="value">
          <Typography variant="Mediumbold" margin="0">
            {formatToCurrency(mposValue * mposQuantity)}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <ShippingCarIcon color={theme.colors.gray[400]} />
          <Typography variant="Medium" margin="0">
            {t("paymentConfirmation.shippingCost")}
          </Typography>
        </div>
        <div className="value">
          {shippingCost > 0 ? (
            <Typography variant="Mediumbold" margin="0">
              {formatToCurrency(shippingCost)}
            </Typography>
          ) : (
            <WarningCustom
              className="chip"
              label={`¡${t("commons.free").toUpperCase()}!`}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="label">
          <DateIcon color={theme.colors.gray[400]} />
          <Typography variant="Medium" margin="0">
            {t("paymentConfirmation.shippingTime")}
          </Typography>
        </div>
        <div className="value">
          <Typography variant="Mediumbold" margin="0">
            {shippingTime === 1
              ? t("paymentConfirmation.oneDayShipping")
              : t("paymentConfirmation.multipleDayShipping", { days: 7 })}
            {}
          </Typography>
        </div>
      </div>
      <div className="separator" />
      <div className="row">
        <div className="label">
          <MoneyIcon />
          <Typography variant="Medium" margin="0">
            {t("paymentConfirmation.totalValue")}
          </Typography>
        </div>
        <div className="value">
          <Typography variant="Mediumbold" margin="0">
            {formatToCurrency(total)}
          </Typography>
        </div>
      </div>
    </Container>
  );
};
