import { NoCommissionCities } from "~/legacy/src/hooks/useMunicipalitiesList/constants";

export const isAlphabetic = (s: string) => {
  const alphaRegex = new RegExp(/^[A-z]+$/);

  s = s.trim().split(" ").join("");

  return alphaRegex.test(s);
};

export const validateCommissionCity = (stateCode: string) =>
  NoCommissionCities.findIndex((city) => city.stateCode === stateCode);
