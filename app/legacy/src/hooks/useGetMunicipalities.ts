import {useQuery} from './useQuery';

interface Response {
  municipalities: {
    stateId?: string;
    cityCode: string;
    cityName: string;
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
    rateCode: string;
    rateIca?: number;
    createdAt: string;
    updatedAt: string;
  }[];
  refetchGetMunicipalities: (stateCode: string) => void;
  isLoadingCities: boolean;
}

export const useGetMunicipalities = (): Response => {
  const {
    data: municipalities = [],
    refetch,
    isLoading: isLoadingCities,
  } = useQuery({
    api: 'orchestrator',
    requestData: {
      method: 'GET',
      url: 'mpos/catalog/municipalities',
      transformRequest: (data, headers) => {
        delete headers?.['x-api-key'];
        return JSON.stringify(data);
      },
    },
  });

  const refetchGetMunicipalities = (stateCode: string) => {
    refetch({
      method: 'GET',
      url: 'mpos/catalog/municipalities?state_code=' + stateCode,
      transformRequest: (data, headers) => {
        delete headers?.['x-api-key'];
        return JSON.stringify(data);
      },
    });
  };

  return {municipalities, refetchGetMunicipalities, isLoadingCities};
};
