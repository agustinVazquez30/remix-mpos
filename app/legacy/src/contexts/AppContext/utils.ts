import { AppContextKeys } from ".";

export const getItemFromStorage = (key: AppContextKeys) =>
  typeof window !== "undefined" ? sessionStorage.getItem(key) || "{}" : "{}";

export const setItemToStorage = (key: AppContextKeys, value: any) => {
  typeof window !== "undefined" && sessionStorage.setItem(key, value);
};
