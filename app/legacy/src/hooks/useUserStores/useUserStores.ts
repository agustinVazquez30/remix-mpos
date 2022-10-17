import { IUseQueryOptions, useQuery } from "~/legacy/src/hooks/useQuery";
import { UserStoresResponse } from "./types";
import { useAppContext } from "~/legacy/src/contexts/AppContext";

export const useUserStores = (
  config: Partial<IUseQueryOptions<UserStoresResponse>>
) => {
  const { basicInformation, temporalCredentials, isLogged } = useAppContext();
  const userId = isLogged
    ? basicInformation.userId
    : temporalCredentials.userId;

  return useQuery<UserStoresResponse>({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: `/store/user/${userId}`,
    },
    ...config,
  });
};
