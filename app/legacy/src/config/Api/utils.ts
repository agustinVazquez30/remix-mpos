import {httpClientOrchestrator, httpClientPayments} from '.';

let requestInterceptorOrchestrator = -1;
let requestInterceptorPayments = -1;

export const addHeaders = async ({
  idToken,
  uid,
}: {
  idToken: string;
  uid: string;
}) => {
  removeHeaders();

  const clientOrchestrator = httpClientOrchestrator();

  requestInterceptorOrchestrator = clientOrchestrator.interceptors.request.use(
    async config => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${idToken}`,
        'user-uid': uid,
      };
      return config;
    },
    error => Promise.reject(error),
  );

  const clientPaymentsApi = httpClientPayments();

  requestInterceptorPayments = clientPaymentsApi.interceptors.request.use(
    async config => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${idToken}`,
        'user-uid': uid,
      };
      return config;
    },
    error => Promise.reject(error),
  );
};

export const removeHeaders = async () => {
  const clientOrchestrator = httpClientOrchestrator();

  clientOrchestrator.interceptors.request.eject(requestInterceptorOrchestrator);
  requestInterceptorOrchestrator = -1;

  const clientPaymentsApi = httpClientPayments();

  clientPaymentsApi.interceptors.request.eject(requestInterceptorPayments);
  requestInterceptorPayments = -1;
};
