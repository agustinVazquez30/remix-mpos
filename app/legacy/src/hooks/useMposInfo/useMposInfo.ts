import {
  MPosData,
  PARAMETERS_KEYS,
  ParametersResponse,
  UseMposInfo,
} from "./types";
import { useEffect, useMemo } from "react";
import { CANCEL_REQUEST } from "~/legacy/src/constants";
import { useQuery } from "~/legacy/src/hooks/useQuery";

export const useMposInfo: UseMposInfo = (config) => {
  const { data, isLoading, source } = useQuery<ParametersResponse>({
    api: "payments-api",
    requestData: {
      url: "/parameters",
    },
    ...config,
    onSuccess: () => {
      console.warn("success");
    },
    onError: () => {
      console.warn("err");
    },
  });

  const mposData: MPosData = useMemo(() => {
    if (data?.data) {
      const params = data.data
        .filter(
          (param) =>
            param.key &&
            Object.keys(PARAMETERS_KEYS).some((key) => key === param.key)
        )
        .map((param) => [PARAMETERS_KEYS[param.key], param.value]);

      return Object.fromEntries(params);
    }

    return null;
  }, [data]);

  useEffect(() => {
    return () => source.cancel(CANCEL_REQUEST);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...mposData,
    isLoading,
  };
};
