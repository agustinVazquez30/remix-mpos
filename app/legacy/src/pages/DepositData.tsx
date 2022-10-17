import { DepositDataLoad } from "~/legacy/src/modules";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const DepositData = () => (
  <StepByStep
    form={<DepositDataLoad />}
    maxWidthForm="688px"
    floatButton={<WhatsappButton />}
  />
);
