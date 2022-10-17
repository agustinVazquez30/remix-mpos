/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AccountTypes,
  DefaultCountry,
  MethodPayment,
  TypePerson,
} from "~/legacy/src/constants";
import { AppActions, AppState } from ".";

import { createContext, useContext } from "react";
import { AppContextType } from "./models";

export const defaultAppState: AppState = {
  isLogged: false,
  isWebView: false,
  loginType: null,
  hasPreviousPurchase: false,
  hasAcceptedPurchasedOrder: false,
  uid: "",
  tokens: {
    idToken: "",
  },
  transactionId: "",
  purchaseSummary: {
    mposProduct: "",
    mposQuantity: 1,
    mposValue: 0,
    costOfShipping: 0,
    total: 0,
    isComplete: false,
  },
  basicInformation: {
    userId: "",
    firstName: "",
    lastName: "",
    phoneNumber: {
      countryId: DefaultCountry.countryId,
      countryCode: DefaultCountry.countryCode,
      number: "",
    },
    email: "",
    isComplete: false,
  },
  businessInformation: {
    storeId: "",
    storeName: "",
    category: -1,
    subcategory: -1,
    businessName: "",
    document: "",
    documentType: -1,
    nit: "",
    typePerson: TypePerson.NATURAL,
    expeditionDate: "",
    isComplete: false,
  },
  shipmentInformation: {
    state: "",
    city: "",
    addressPrefix: "",
    address: "",
    addressDetail: "",
    neighborhood: "",
    anotherPerson: false,
    anotherName: "",
    anotherPhone: "",
    isComplete: false,
  },
  depositInformation: {
    bankId: -1,
    bankDescription: "",
    accountType: AccountTypes.SAVINGS_ACCOUNT,
    accountNumber: "",
    isHunterImmediatePayment: false,
    methodsPaymentType: MethodPayment.ONLINE_PAYMENT,
    methodsPayment: "",
    isComplete: false,
  },
  receptionInformation: {
    deliveryDate: null,
    isComplete: false,
  },
  temporalCredentials: {
    userId: "",
    storeId: "",
    userFirebaseId: "",
    isComplete: false,
    loginType: null,
  },
  utmParameters: {
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
  },
  isHunters: false,
  hunter: {
    id: "",
  },
  persisted: false,
  splitIOKeyValue: {},
};

export const defaultAppActions: AppActions = {
  logIn: (payload) => {},
  logOut: () => {},
  setIsWebView: () => {},
  setTransactionId: () => {},
  setPurchaseSummary: (payload) => {},
  setBasicInformation: (payload) => {},
  setBusinessInformation: (payload) => {},
  setShipmentInformation: (payload) => {},
  setDepositInformation: (payload) => {},
  setReceptionInformation: (payload) => {},
  setStoreInformation: (payload) => {},
  setTemporalCredentials: (payload) => {},
  setMPOSPaymentInformation: (payload) => {},
  setHasPreviousPurchase: () => {},
  setHasAcceptedPurchasedOrder: (payload) => {},
  setUtmParameters: (payload) => {},
  setIsHunters: (payload) => {},
  setHuntersData: (payload) => {},
  setSplitIOKeyValue: (payload) => {},
  setIdToken: () => {},
  resetContext: () => {},
};

export const defaultAppContext: AppContextType = {
  ...defaultAppState,
  ...defaultAppActions,
};

export const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);
