import {
  ROUTES,
  ReturnUrlFinish,
  TransactionTypes,
} from "~/legacy/src/constants";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { PARAMETERS } from "./constants";
import { PaymentStatus } from "~/legacy/src/commons/components/PaymentStatus";
import { WebPagosBuyFinished } from "~/legacy/src/hooks/useGenericEvent/models";
import { newBrazeRevenueEvent } from "~/legacy/src/config/Braze/utils";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useEffect } from "react";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useNavigate } from "react-router-dom";
import { useQuery } from "~/legacy/src/hooks";

export const PaymentConfirmationLoad = () => {
  const navigate = useNavigate();
  const generateEvent = useGenericEvent();
  const {
    purchaseSummary,
    basicInformation,
    resetContext,
    temporalCredentials,
    isLogged,
    isHunters,
    transactionId,
  } = useAppContext();

  const { userId, phoneNumber, email, isComplete } = basicInformation;

  // TODO: Obtain value
  const shippingTime = PARAMETERS.SHIPPING_TIME;

  const { State: buttonSignIn, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationSignInPostPOS
  );

  useEffect(() => {
    if (!isComplete) {
      navigate(ROUTES.HOME);
      return;
    }

    newBrazeRevenueEvent(
      purchaseSummary.mposValue,
      "COP",
      purchaseSummary.mposQuantity,
      {
        userId: isLogged ? basicInformation.userId : temporalCredentials.userId,
        celular: basicInformation.phoneNumber.number,
        eventName: WebPagosBuyFinished,
      }
    );
    generateEvent({
      eventName: "WebPagosBuyFinished",
      eventArgs: purchaseSummary,
    });

    window.onbeforeunload = () => {
      if (!isHunters) {
        generateEvent({
          eventName: "WebPagosRepurchase",
          platforms: {
            amplitude: true,
          },
        });
      }
      resetContext();
      navigate(ROUTES.HOME);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      window.onbeforeunload = () => {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { refetch: sendHunterCode } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/users/offline-vendor",
      method: "POST",
    },
    onSuccess: () => {
      resetContext();
      sessionStorage.clear();
      window.location.href = ReturnUrlFinish(buttonSignIn, loading);
    },
  });

  const onFinish = (vendorCode?: string) => {
    generateEvent({
      eventName: "WebPagosFinaLogIn",
      eventArgs: {
        phoneNumber,
        email,
      },
    });
    if (vendorCode !== "") {
      sendHunterCode({
        data: [
          {
            user_id: userId || temporalCredentials.userId,
            vendor_code: vendorCode,
            transaction_id: transactionId,
            transaction_type: TransactionTypes.MPOS_PURCHASE,
          },
        ],
      });
      return;
    }
    resetContext();
    sessionStorage.clear();
    window.location.href = ReturnUrlFinish(buttonSignIn, loading);
  };

  return (
    <PaymentStatus
      mposValue={purchaseSummary.mposValue}
      mposQuantity={purchaseSummary.mposQuantity}
      shippingCost={purchaseSummary.costOfShipping}
      shippingTime={shippingTime}
      total={purchaseSummary.total}
      onFinish={onFinish}
      userId={userId}
      status="success"
      isTempCredential={!!temporalCredentials.loginType}
      tempCredLoginType={temporalCredentials.loginType}
    />
  );
};
