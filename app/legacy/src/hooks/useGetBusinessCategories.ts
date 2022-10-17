import {
  BusinessCategory,
  BusinessCategoryResponse,
} from '../commons/types/business-category.type';
import {useQuery} from './useQuery';

interface Response {
  businessCategories: BusinessCategory[];
  isLoadingBusinessCategories: boolean;
}

export const useGetBusinessCategories = (): Response => {
  const {data, isLoading: isLoadingCities} = useQuery<BusinessCategoryResponse>(
    {
      api: 'orchestrator',
      enableRefetch: true,
      requestData: {
        method: 'GET',
        url: 'mpos/business_categories',
        transformRequest: (_data, headers) => {
          delete headers?.['x-api-key'];
        },
      },
    },
  );

  return {
    businessCategories: data?.categories ?? [],
    isLoadingBusinessCategories: isLoadingCities,
  };
};
