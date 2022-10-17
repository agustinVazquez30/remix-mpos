import {AppContextKeys} from '.';

export const getItemFromStorage = (key: AppContextKeys) =>
  sessionStorage.getItem(key);

export const setItemToStorage = (key: AppContextKeys, value: any) =>
  sessionStorage.setItem(key, value);
