import { PaymentConfirmationLoad } from "~/legacy/src/modules";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const PaymentConfirmation = () => (
  <StepByStep
    form={<PaymentConfirmationLoad />}
    floatButton={<WhatsappButton />}
  />
);
