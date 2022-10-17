import { PaymentConfirmationCashLoad } from "~/legacy/src/modules";
import { ROUTES } from "~/legacy/src/constants";
import { StepByStep } from "~/legacy/src/layouts";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const PaymentConfirmationCash = () => (
  <StepByStep
    step={ROUTES.PAYMENT_CONFIRMATION}
    form={<PaymentConfirmationCashLoad />}
    floatButton={<WhatsappButton />}
  />
);
