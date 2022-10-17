import { ErrorVerifying } from "~/legacy/src/commons/components";
import { Information } from "~/legacy/src/layouts";
import React from "react";
import { t } from "i18next";

export const ErrorVerifyingPage: React.FC = (): JSX.Element => {
  return (
    <Information>
      <ErrorVerifying
        errorTitle={t("errorVerifying.title")}
        errorMessage={t("errorVerifying.message")}
        containerMaxWidth="580px"
        titleMaxWidth="auto"
        messageMaxWidth="480px"
      />
    </Information>
  );
};
