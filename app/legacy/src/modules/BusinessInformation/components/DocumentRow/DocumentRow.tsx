// import {
//   DOCUMENT_TYPE_CE,
//   DOCUMENT_TYPE_PEP,
// } from "~/legacy/src/modules/BusinessInformation/constants";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import {
  getDocumentTypesNaturalPerson,
  // isValidDocument,
} from "~/legacy/src/modules/BusinessInformation/utils";
// import { Calendar } from "@30sas/web-ui-kit-core";
import { Container } from "./styles";
import type { DocumentRowProps } from "./types";
import { DocumentTypes } from "~/legacy/src/constants";
import { InputSelect } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

export const DocumentRow: React.FC<DocumentRowProps> = ({ show, error }) => {
  const { t } = useTranslation();
  const { State: noShowDocumentPEP, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationNoPEPPOS
  );

  // const shouldOpenExpeditionDate = [
  //   DOCUMENT_TYPE_CE,
  //   DOCUMENT_TYPE_PEP,
  // ].includes(document.type);

  let getDocumentTypeWithSplit = getDocumentTypesNaturalPerson();
  if (!loading && !noShowDocumentPEP) {
    getDocumentTypeWithSplit = getDocumentTypeWithSplit.filter(
      (item) => item.id !== DocumentTypes.PEP
    );
  }

  return (
    <Container show={show} showExpeditionDate={false}>
      <InputSelect
        name="document"
        onChange={() => {}}
        label={t("businessInformation.document.label")}
        type="number"
        dropdownName="documentType"
        options={getDocumentTypeWithSplit}
        className="custom-input document__input"
        placeholder={t("businessInformation.document.placeholder")}
        testId="document-input"
        error={Boolean(error)}
        errorText={error}
      />

      {/* {shouldOpenExpeditionDate && (
        <div className="custom-input document__expedition-date">
          <Calendar
            locale="es"
            dataTestId="calendar-id"
            openTo="day"
            views={["year", "month", "day"]}
            label={t("businessInformation.expeditionDate.label")}
            onChange={setExpeditionDate}
            externalValue={
              !!expeditionDate ? new Date(expeditionDate) : undefined
            }
            formatDate="dd/MM/yyyy"
            disableFuture
          />
        </div>
      )} */}
    </Container>
  );
};
