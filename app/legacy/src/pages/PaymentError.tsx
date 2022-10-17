import { PaymentErrorLoad } from "~/legacy/src/modules";
import { ROUTES } from "~/legacy/src/constants";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const PaymentError = () => (
  <StepByStep
    step={ROUTES.PAYMENT_CONFIRMATION}
    form={<PaymentErrorLoad />}
    floatButton={<WhatsappButton />}
  />
);
