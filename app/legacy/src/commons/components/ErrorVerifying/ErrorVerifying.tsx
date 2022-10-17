import { Container } from "./style";
import { InfoIcon } from "@30sas/web-ui-kit-icons";
import React from "react";
import { Typography } from "@30sas/web-ui-kit-core";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

interface errorVerifyingData {
  errorTitle: string;
  errorMessage: string;
  containerMaxWidth: string;
  titleMaxWidth: string;
  messageMaxWidth: string;
}

export const ErrorVerifying: React.FC<errorVerifyingData> = ({
  errorTitle,
  errorMessage,
  containerMaxWidth,
  titleMaxWidth,
  messageMaxWidth,
}: errorVerifyingData): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Container
      containerMaxWidth={containerMaxWidth}
      titleMaxWidth={titleMaxWidth}
      messageMaxWidth={messageMaxWidth}
    >
      <div data-testid="backgroundInfoIcon" className="backgroundInfoIcon">
        <InfoIcon data-testid="infoIcon" className="infoIcon" scale={1.5} />
      </div>
      <Typography className="title" variant="XXLargebold">
        {errorTitle}
      </Typography>
      <Typography className="message" variant="Medium">
        {errorMessage}
      </Typography>
      <WhatsappButton label={t("commons.writeToSupport")} overwriteZendesk />
    </Container>
  );
};
