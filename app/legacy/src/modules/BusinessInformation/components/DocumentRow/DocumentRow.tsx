import {
  DOCUMENT_TYPE_CE,
  DOCUMENT_TYPE_PEP,
} from "~/legacy/src/modules/BusinessInformation/constants";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import {
  getDocumentTypesNaturalPerson,
  isValidDocument,
} from "~/legacy/src/modules/BusinessInformation/utils";
import { Calendar } from "@30sas/web-ui-kit-core";
import { Container } from "./styles";
import { DocumentRowProps } from "./types";
import { DocumentTypes } from "~/legacy/src/constants";
import { InputSelect } from "~/legacy/src/commons/components";
import { useTranslation } from "react-i18next";

export const DocumentRow: React.FC<DocumentRowProps> = ({
  document,
  show,
  expeditionDate,
  setDocument,
  setExpeditionDate,
}) => {
  const { t } = useTranslation();
  const { State: noShowDocumentPEP, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationNoPEPPOS
  );

  const shouldOpenExpeditionDate = [
    DOCUMENT_TYPE_CE,
    DOCUMENT_TYPE_PEP,
  ].includes(document.type);

  let getDocumentTypeWithSplit = getDocumentTypesNaturalPerson();
  if (!loading && !noShowDocumentPEP) {
    getDocumentTypeWithSplit = getDocumentTypeWithSplit.filter(
      (item) => item.id !== DocumentTypes.PEP
    );
  }

  const handleChangeExpeditionDate = (value: any) => {
    const date = value as Date;
    setExpeditionDate(date.toISOString());
  };

  return (
    <Container show={show} showExpeditionDate={shouldOpenExpeditionDate}>
      <InputSelect
        label={t("businessInformation.document.label")}
        type="number"
        name="id"
        options={getDocumentTypeWithSplit}
        onChange={setDocument}
        className="custom-input document__input"
        placeholder={t("businessInformation.document.placeholder")}
        testId="document-input"
        value={document}
        error={
          !!document.value && !isValidDocument(document.type, document.value)
        }
        errorText={t("businessInformation.documentError.cc")}
      />

      {shouldOpenExpeditionDate && (
        <div className="custom-input document__expedition-date">
          <Calendar
            locale="es"
            dataTestId="calendar-id"
            openTo="day"
            views={["year", "month", "day"]}
            label={t("businessInformation.expeditionDate.label")}
            onChange={handleChangeExpeditionDate}
            externalValue={
              !!expeditionDate ? new Date(expeditionDate) : undefined
            }
            formatDate="dd/MM/yyyy"
            disableFuture
          />
        </div>
      )}
    </Container>
  );
};
