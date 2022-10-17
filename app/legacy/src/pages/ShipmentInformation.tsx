import { ShipmentInformationLoad } from "~/legacy/src/modules";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const ShipmentInformation = () => (
  <StepByStep
    form={<ShipmentInformationLoad />}
    maxWidthForm="688px"
    floatButton={<WhatsappButton />}
  />
);
