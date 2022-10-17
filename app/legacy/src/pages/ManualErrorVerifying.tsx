import { ErrorVerifying } from "~/legacy/src/commons/components";
import { Information } from "~/legacy/src/layouts";
import React from "react";
import { t } from "i18next";

export const ManualErrorVerifyingPage: React.FC = (): JSX.Element => {
  return (
    <Information>
      <ErrorVerifying
        errorTitle={t("errorVerifying.manualVerifying.title")}
        errorMessage={t("errorVerifying.manualVerifying.message")}
        containerMaxWidth="650px"
        titleMaxWidth="450px"
        messageMaxWidth="545px"
      />
    </Information>
  );
};
