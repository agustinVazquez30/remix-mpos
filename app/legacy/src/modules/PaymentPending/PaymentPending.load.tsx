import { useCallback, useEffect } from "react";
import { PARAMETERS } from "./constants";
import { PaymentStatus } from "~/legacy/src/commons/components/PaymentStatus";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";

export const PaymentPendingLoad = () => {
  const generateEvent = useGenericEvent();
  const { purchaseSummary, basicInformation } = useAppContext();

  const { userId } = basicInformation;
  const shippingTime = PARAMETERS.SHIPPING_TIME;

  useEffect(() => {
    generateEvent({
      eventName: "WebPagosPaymentIsPending",
      platforms: { amplitude: true },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = useCallback(() => {
    sessionStorage.clear();
    window.location.href = `${window.ENV?.REACT_APP_WEB_URL}`;
  }, []);

  return (
    <PaymentStatus
      mposValue={purchaseSummary.mposValue}
      mposQuantity={purchaseSummary.mposQuantity}
      shippingCost={purchaseSummary.costOfShipping}
      shippingTime={shippingTime}
      total={purchaseSummary.total}
      onFinish={onFinish}
      userId={userId}
      status="pending"
    />
  );
};
