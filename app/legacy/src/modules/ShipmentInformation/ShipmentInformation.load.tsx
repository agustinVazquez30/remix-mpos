import {
  ShipmentInformationPayload,
  ShipmentInformationState,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import { useEffect, useState } from "react";
import { useGetCountryStates, useGetMunicipalities } from "~/legacy/src/hooks";

import { ROUTES } from "~/legacy/src/constants";
import { ShipmentInformation } from "./ShipmentInformation";
import { Spinner } from "~/legacy/src/commons/components";
import { newDatadogLog } from "~/legacy/src/config/Datadog";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";

export const ShipmentInformationLoad = () => {
  const {
    shipmentInformation = {} as ShipmentInformationState,
    basicInformation,
    setShipmentInformation,
  } = useAppContext();
  const generateEvent = useGenericEvent();
  const { navigate } = useAllowedNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { email, phoneNumber, userId } = basicInformation;

  const createEvents = (shipmentData: ShipmentInformationPayload): void => {
    const { state, city, anotherPerson: other_person_recive } = shipmentData;
    generateEvent({
      eventName: "WebPagosInfoDeliveryConfirmed",
      eventArgs: {
        state,
        city,
        other_person_recive,
      },
    });
  };

  const { states } = useGetCountryStates();
  const { municipalities, isLoadingCities, refetchGetMunicipalities } =
    useGetMunicipalities();

  const handleNextStep = (data: ShipmentInformationPayload) => {
    const cityFound = municipalities?.find(
      (city: any) => data.city === city.cityName
    );
    setIsLoading(true);
    newDatadogLog("WebPagosInformation", {
      userId,
      email,
      phoneNumber,
      ...data,
      step: 3,
    });
    createEvents({ ...data, cityCode: cityFound?.cityCode });
    setShipmentInformation({ ...data, cityCode: cityFound?.cityCode });
    setTimeout(() => {
      navigate(ROUTES.DEPOSIT_INFORMATION);
    }, 500);
  };

  const getMunicipalities = (stateName: string) => {
    const stateFound = states?.find(
      (state: any) => state.stateName === stateName
    );
    refetchGetMunicipalities(stateFound?.stateCode as string);
  };

  useEffect(() => {
    if (states && states?.length) {
      getMunicipalities(shipmentInformation.state || states[0].stateName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, shipmentInformation.state]);

  return (
    <>
      {states && municipalities ? (
        <ShipmentInformation
          initValues={shipmentInformation}
          onNextStep={handleNextStep}
          isLoading={isLoading}
          states={states.map((state: any) => ({
            label: state.stateName,
            value: state.stateCode,
          }))}
          cities={municipalities.map((state: any) => ({
            label: state.cityName,
            value: state.cityCode,
          }))}
          refetchCities={getMunicipalities}
          isLoadingCities={isLoadingCities}
        />
      ) : (
        <Spinner fullScreen={true} testId="store-selection-spinner" />
      )}
    </>
  );
};
