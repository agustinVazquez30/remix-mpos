import { parseApiData } from "./constants";
import { ROUTES } from "~/legacy/src/constants";
import {
  PurchaseSummaryPayload,
  PurchaseSummaryState,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { useQueryLocation } from "~/legacy/src/hooks";
import { PurchaseSummary } from "./PurchaseSummary";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useNavigate } from "react-router-dom";

export const PurchaseSummaryLoad = ({ data }: any) => {
  const navigate = useNavigate();

  const {
    purchaseSummary = {} as PurchaseSummaryState,
    setPurchaseSummary,
    setSplitIOKeyValue,
  } = useAppContext();
  const generateEvent = useGenericEvent();

  const { State: noShowLoginPos } = useSplitIO(
    SplitIOTreatmentNames.ActivationNoLoginPOS
  );

  const { mposQuantity } = purchaseSummary;

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

    navigate(`/${ROUTES.BASIC_INFORMATION}`);
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
