import { CITIES } from "./cities";
import { i18n } from "~/legacy/src/config/Translation";

export const defaultState = [
  { label: i18n.t("shipmentInformation.state.default"), id: -1 },
];
export const defaultCity = [
  { label: i18n.t("shipmentInformation.city.default") },
];

export const states = defaultState.concat(
  CITIES.map((state) => ({ label: state.state, id: state.id }))
);

export const getCitiesFromStateName = (
  stateName: string
): { label: string }[] => {
  let cities: string[] = [];
  const state = CITIES.find((sta) => sta.state === stateName);
  if (state) cities = state.cities;

  return defaultCity.concat(cities.map((city) => ({ label: city })));
};

export const isValidAddress = (address: string): boolean =>
  !!address && address.length >= 5 && isValidLengthAddress(address);

export const isValidLengthAddress = (address: string): boolean =>
  address.length <= 30;
