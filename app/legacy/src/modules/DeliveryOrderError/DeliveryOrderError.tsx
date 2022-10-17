import { CloseCircleIcon } from "@30sas/web-ui-kit-icons";
import { Container } from "./style";
import React from "react";
import { Typography } from "@30sas/web-ui-kit-core";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

export const DeliveryOrderError: React.FC = (): JSX.Element => {
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
      <div className="title-container">
        <Typography className="title" variant="XXLargebold">
          {t("deliveryOrderError.title.first")}
        </Typography>
        <Typography className="title" variant="XXLargebold">
          {t("deliveryOrderError.title.last")}
        </Typography>
      </div>
      <Typography className="message" variant="Medium">
        {t("deliveryOrderError.message.first")}
      </Typography>
      <Typography className="message" variant="Medium">
        {t("deliveryOrderError.message.last")}
      </Typography>
      <WhatsappButton label={t("commons.writeToSupport")} />
    </Container>
  );
};
