import { AppContext } from "~/legacy/src/contexts/AppContext";
import { useContext } from "react";

export const useShipmentOrder = () => {
  const { basicInformation } = useContext(AppContext);

  const setShipmentOrder = (): string => {
    const { number } = basicInformation.phoneNumber;
    const currentEpocUnixTimestamp = `${Math.floor(
      new Date().getTime() / 1000
    )}`;
    return `30${number}${currentEpocUnixTimestamp}`;
  };

  return {
    setShipmentOrder,
  };
};
