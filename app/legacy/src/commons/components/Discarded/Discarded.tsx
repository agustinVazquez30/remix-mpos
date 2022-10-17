import { CloseCircleIcon } from "@30sas/web-ui-kit-icons";
import { Container } from "./style";
import React from "react";
import { Typography } from "@30sas/web-ui-kit-core";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

export const Discarded: React.FC = (): JSX.Element => {
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
        {t("discarded.title")}
      </Typography>
      <Typography className="message" variant="Medium">
        {t("discarded.message.first")}
      </Typography>
      <Typography className="message" variant="Medium">
        {t("discarded.message.last")}
      </Typography>
      <WhatsappButton label={t("commons.writeToSupport")} overwriteZendesk />
    </Container>
  );
};
