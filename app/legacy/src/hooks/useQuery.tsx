import axios, {
  AxiosError,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import {
  httpClientOrchestrator,
  httpClientPayments,
  httpClientTreintaApi,
} from "~/legacy/src/config/Api";
import { useCallback, useEffect, useState } from "react";

import { CANCEL_REQUEST } from "~/legacy/src/constants";

type ApiType = "payments-api" | "orchestrator" | "treinta-api";

export interface IUseQueryOptions<T> {
  requestData: AxiosRequestConfig;
  api: ApiType;
  enableRefetch?: boolean;
  onSuccess?: (response: T) => void;
  onError?: (response: Error | AxiosError) => void;
}

export function useQuery<ResponseType = any>(
  config: IUseQueryOptions<ResponseType>
): {
  isLoading: boolean;
  data: ResponseType;
  hasError: boolean;
  source: CancelTokenSource;
  refetch: (requestData?: AxiosRequestConfig) => Promise<void>;
} {
  const { api, requestData, enableRefetch, onSuccess, onError } = config;
  const [state, setState] = useState<{
    data: ResponseType | any;
    isLoading: boolean;
  }>({
    data: null,
    isLoading: false,
  });
  const [hasError, setHasError] = useState(false);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const request = async (requestData: AxiosRequestConfig, api: ApiType) => {
    setState((state) => ({
      ...state,
      isLoading: true,
    }));

    try {
      let response: any;

      if (api === "payments-api") {
        response = await httpClientPayments().request<ResponseType>({
          ...requestData,
          cancelToken: source.token,
        });
      } else if (api === "orchestrator") {
        response = await httpClientOrchestrator().request<ResponseType>({
          ...requestData,
          cancelToken: source.token,
        });
      } else if (api === "treinta-api") {
        response = await httpClientTreintaApi().request<ResponseType>({
          ...requestData,
          cancelToken: source.token,
        });
      }

      setState({
        data: response.data,
        isLoading: false,
      });
      onSuccess && onSuccess(response.data);
    } catch (error: any) {
      if (error?.message !== CANCEL_REQUEST) {
        setHasError(true);
        onError && onError(error);
        setState({
          data: null,
          isLoading: false,
        });
      }
    }
  };

  useEffect(() => {
    if (enableRefetch) {
      request(requestData, api);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading: state.isLoading,
    data: state.data,
    hasError,
    source,
    refetch: useCallback(
      (requestDataFetch) =>
        request({ ...requestData, ...requestDataFetch }, api),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [requestData]
    ),
  };
}
