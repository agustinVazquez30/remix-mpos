import { ROUTES } from "~/legacy/src/constants";
import { useGenericEvent } from "./useGenericEvent";
import { useNavigate } from "react-router-dom";

export const useGoToBuy = () => {
  const navigate = useNavigate();
  const generateEvent = useGenericEvent();

  return (eventArgs: Record<string, string> = {}) => {
    generateEvent({ eventName: "WebPagosInteresBuying", eventArgs });
    navigate(ROUTES.PURCHASE_ORDER);
  };
};
