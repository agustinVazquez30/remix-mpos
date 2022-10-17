import { CurrentContextType, parseApiData, PayloadToken } from "./constants";
import {
  LoginTypes,
  MposPurchaseMappedRoutes,
  MposPurchaseSteps,
  ROUTES,
} from "~/legacy/src/constants";
import {
  PurchaseSummaryPayload,
  PurchaseSummaryState,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { useQueryLocation } from "~/legacy/src/hooks";
import { PurchaseSummary } from "./PurchaseSummary";
import { addHeaders } from "~/legacy/src/config/Api";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useEffect } from "react";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";

export const PurchaseSummaryLoad = ({ data }: any) => {
  const { navigate } = useAllowedNavigation();
  const queryParams = useQueryLocation();
  const token = queryParams.get("token");
  const isBackNavigation = [null, ""].includes(queryParams.get("back"));

  const {
    purchaseSummary = {} as PurchaseSummaryState,
    basicInformation,
    businessInformation,
    shipmentInformation,
    depositInformation,
    logIn,
    setPurchaseSummary,
    setIsWebView,
    setSplitIOKeyValue,
  } = useAppContext();
  const generateEvent = useGenericEvent();

  const { State: noShowLoginPos } = useSplitIO(
    SplitIOTreatmentNames.ActivationNoLoginPOS
  );

  const { mposQuantity } = purchaseSummary;

  const redirectToLastStep = (currentContext: CurrentContextType) => {
    const currentStep =
      Object.values(MposPurchaseSteps)
        .reverse()
        .find((step) => currentContext?.[step]?.isComplete) || "default";

    return MposPurchaseMappedRoutes[currentStep];
  };

  const { mposValue, mposProduct, costOfShipping } = parseApiData(data);

  const onContinue = (info: PurchaseSummaryPayload, throwEvent: boolean) => {
    setSplitIOKeyValue({
      [SplitIOTreatmentNames.ActivationNoLoginPOS]: noShowLoginPos,
    });
    setPurchaseSummary(info);
    if (throwEvent) {
      generateEvent({
        eventName: "WebPagosSummaryConfirmed",
        eventArgs: {
          quantity: info.mposQuantity,
          price: info.total,
        },
      });
    }

    navigate(ROUTES.BASIC_INFORMATION);
  };

  const onLogin = (info: PurchaseSummaryPayload) => {
    generateEvent({
      eventName: "WebPagosLoggedUser",
      eventArgs: {
        quantity: info.mposQuantity,
        price: info.total,
      },
    });

    setPurchaseSummary(info);
    navigate(ROUTES.LOGIN);
  };

  const webViewFlow = async () => {
    if (token) {
      try {
        const decodedToken = decodeURIComponent(token as string);
        const base64ToString = window.atob(decodedToken);
        const dataToken: PayloadToken = JSON.parse(base64ToString);

        await addHeaders({
          idToken: dataToken.token || "",
          uid: dataToken.uid || "",
        });

        logIn({
          email: dataToken.email || "",
          idToken: dataToken.token || "",
          uid: dataToken.uid || "",
          userId: dataToken.userId || "",
          storeId: dataToken.storeId || "",
          loginType:
            dataToken.signInMethod === "google"
              ? LoginTypes.EMAIL
              : LoginTypes.OTP,
          firstName: dataToken.firstName || "",
          lastName: dataToken.lastName || "",
          phoneNumber: dataToken.phoneNumber || {
            ...basicInformation.phoneNumber,
          },
        });

        setIsWebView();
      } catch (e) {
        console.warn("Without valid token");
      }
    }
  };

  useEffect(() => {
    webViewFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PurchaseSummary
      onLogin={onLogin}
      onContinue={onContinue}
      isLoading={false}
      mposProduct={mposProduct}
      mposQuantity={mposQuantity}
      mposValue={mposValue}
      costOfShipping={costOfShipping}
      noShowLoginPos={noShowLoginPos}
    />
  );
};
