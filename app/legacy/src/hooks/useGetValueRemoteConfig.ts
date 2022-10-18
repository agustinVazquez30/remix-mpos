import { getRemoteConfig, getValue } from "@firebase/remote-config";

type TokenInCountryInfo =
  | "id"
  | "name"
  | "acronym"
  | "code"
  | "digits"
  | "support"
  | "pagosSupport"
  | "label"
  | "locale"
  | "currency"
  | "decimals"
  | "timeZone"
  | "community"
  | "payments"
  | "enable";

export const useGetValueRemoteConfig = (token: TokenInCountryInfo) => {
  const remoteConfig = getRemoteConfig();
  const value = getValue(remoteConfig, "countries_v2");
  const stringValue = value?.asString() || "";
  let parseValue;

  try {
    parseValue = JSON.parse(stringValue);
  } catch (e) {
    parseValue = stringValue;
  }

  const countrySelected =
    parseValue &&
    parseValue.find(
      (country: any) =>
        country.id === Number(window.ENV?.REACT_APP_COUNTRY || -1)
    );

  return (countrySelected && countrySelected[token]) || {};
};
