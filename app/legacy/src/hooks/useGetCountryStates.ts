import {useQuery} from './useQuery';

interface Response {
  states: {
    stateCode: string;
    stateName: string;
    countryCode: string;
    countryName: string;
  }[];
}

export const useGetCountryStates = (): Response => {
  const {data: states = []} = useQuery({
    api: 'orchestrator',
    enableRefetch: true,
    requestData: {
      method: 'GET',
      url: 'mpos/catalog/states',
      transformRequest: (data, headers) => {
        delete headers?.['x-api-key'];
        return JSON.stringify(data);
      },
    },
  });

  return {states};
};
