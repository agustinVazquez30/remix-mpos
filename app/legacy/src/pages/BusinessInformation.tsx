import { BusinessInformationLoad } from "~/legacy/src/modules";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const BusinessInformation = () => (
  <StepByStep
    form={<BusinessInformationLoad />}
    maxWidthForm="688px"
    floatButton={<WhatsappButton />}
  />
);
