import { ServiceTypes } from "~/legacy/src/constants";
import { useQuery } from "./useQuery";

export const useGetStoreService = <ResponseType = any>({
  storeId,
  ...useQueryParams
}: {
  storeId: string;
  onSuccess: (response: ResponseType) => void;
  onError?: () => void;
}) => {
  return useQuery<ResponseType>({
    api: "treinta-api",
    requestData: {
      method: "GET",
      url: `/service?store_id=${storeId}&service_type_id=${ServiceTypes.PAYMENT_LINKS}`,
    },
    ...useQueryParams,
  });
};
