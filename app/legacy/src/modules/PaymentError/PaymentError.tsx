import { Button, Typography } from "@30sas/web-ui-kit-core";

import { CloseCircleIcon } from "@30sas/web-ui-kit-icons";
import { Container } from "./styles";
import { Spinner } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

type PaymentErrorType = {
  isLoading: boolean;
  onRetry?: () => void;
};

export const PaymentError = ({ isLoading, onRetry }: PaymentErrorType) => {
  const { t } = useTranslation();

  return (
    <Container>
      <div data-testid="backgroundCloseIcon" className="backgroundCloseIcon">
        <CloseCircleIcon
          data-testid="closeIcon"
          className="closeIcon"
          scale={1.5}
        />
      </div>
      <Typography className="title" variant="XXLargebold">
        {t("paymentConfirmation.error.title")}
      </Typography>
      <Typography forwardedAs="div" className="message" variant="Medium">
        <p>{t("paymentConfirmation.error.message.first")}</p>
        <p className="emailText">{` ${t(
          "paymentConfirmation.error.message.middle"
        )} `}</p>
        <p>{t("paymentConfirmation.error.message.last")}</p>
      </Typography>
      {onRetry && (
        <Button
          label={t("paymentConfirmation.error.retry")}
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="600"
          upper={false}
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          onClick={onRetry}
        />
      )}
      {isLoading && <Spinner fullScreen={true} />}
    </Container>
  );
};
