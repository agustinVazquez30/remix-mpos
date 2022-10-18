import axios, { AxiosInstance } from "axios";

let clientAxios: AxiosInstance;

export const httpClientPayments = (): AxiosInstance => {
  if (!clientAxios) {
    clientAxios = axios.create({
      baseURL: process.env.REACT_APP_PAYMENTS_URL,
      headers: {
        "x-api-key": process.env.REACT_APP_PAYMENTS_KEY || "",
      },
    });
  }

  return clientAxios;
};

let clientOrchestrator: AxiosInstance;

export const httpClientOrchestrator = (): AxiosInstance => {
  if (!clientOrchestrator) {
    clientOrchestrator = axios.create({
      baseURL: process.env.REACT_APP_ORCHESTRATOR_URL,
      headers: {
        "x-api-key": process.env.REACT_APP_ORCHESTRATOR_KEY || "",
      },
    });
  }

  return clientOrchestrator;
};

let clientTreintaApi: AxiosInstance;

export const httpClientTreintaApi = (): AxiosInstance => {
  if (!clientTreintaApi) {
    clientTreintaApi = axios.create({
      baseURL: process.env.REACT_APP_TREINTA_API_URL,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TREINTA_API_TOKEN}`,
      },
    });
  }

  return clientTreintaApi;
};
