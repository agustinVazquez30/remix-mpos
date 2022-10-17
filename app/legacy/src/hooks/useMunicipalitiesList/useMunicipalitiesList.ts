import { MunicipalityOption, StateOption } from "./models";
import { useCallback, useEffect, useState } from "react";
import { useGetCountryStates, useGetMunicipalities } from "~/legacy/src/hooks";

export const useMunicipalitiesList = () => {
  const [selectedState, setSelectedState] = useState<StateOption | undefined>();
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    MunicipalityOption | undefined
  >();

  const { states: stateOptions } = useGetCountryStates();
  const {
    municipalities: municipalityOptions,
    isLoadingCities: isLoadingMunicipalities,
    refetchGetMunicipalities,
  } = useGetMunicipalities();

  const getMunicipalities = useCallback(
    (stateCode: string) => {
      const stateFound = stateOptions?.find(
        (state: any) => state.stateCode === stateCode
      );
      refetchGetMunicipalities(stateFound?.stateCode as string);
    },
    [stateOptions, refetchGetMunicipalities]
  );

  useEffect(() => {
    if (stateOptions && stateOptions?.length) {
      setSelectedState(stateOptions[0]);
    }
  }, [stateOptions]);

  useEffect(() => {
    if (selectedState) {
      getMunicipalities(selectedState?.stateCode || stateOptions[0].stateCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  useEffect(() => {
    if (municipalityOptions?.length > 0) {
      setSelectedMunicipality(
        municipalityOptions.filter((item) => item.rateIca !== null)[0]
      );
    }
  }, [municipalityOptions]);

  return {
    stateOptions,
    municipalityOptions,
    selectedMunicipality,
    selectedState,
    isLoadingMunicipalities,
    setSelectedState,
    setSelectedMunicipality,
  };
};
