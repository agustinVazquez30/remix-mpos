import { PaymentError } from "./PaymentError";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useEffect } from "react";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";

export const PaymentErrorLoad = (): JSX.Element => {
  const generateEvent = useGenericEvent();
  const { isLogged, transactionId } = useAppContext();

  const onRetry = (): void => {
    window.location.href = `${
      window.ENV?.REACT_APP_TREINTA_CHECKOUT_URL
    }/${transactionId}${!isLogged ? "?=is_temp=true" : ""}`;
  };

  useEffect(() => {
    generateEvent({
      eventName: "WebPagosPaymentRejected",
      platforms: { amplitude: true },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PaymentError isLoading={false} onRetry={onRetry} />;
};
