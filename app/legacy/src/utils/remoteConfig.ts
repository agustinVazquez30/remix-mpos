import { getRemoteConfig, getValue } from "@firebase/remote-config";

export const getValueCountry = () => {
  try {
    const remoteConfig = getRemoteConfig();
    const value = getValue(remoteConfig, "countries_v2");
    const stringValue = value?.asString() || "";
    const parseValue = JSON.parse(stringValue);
    const countrySelected =
      parseValue &&
      parseValue.find(
        (country: { id: number }) =>
          country.id === Number(window.ENV?.REACT_APP_COUNTRY || -1)
      );

    return countrySelected;
  } catch (e) {
    return null;
  }
};
