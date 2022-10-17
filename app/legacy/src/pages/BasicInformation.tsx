import { BasicInformationLoad } from "~/legacy/src/modules";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const BasicInformation = () => (
  <StepByStep
    form={<BasicInformationLoad />}
    maxWidthForm="688px"
    floatButton={<WhatsappButton />}
  />
);
