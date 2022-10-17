import {
  AccountTypes,
  LoginTypes,
  MethodPayment,
  PhoneNumber,
  TypePerson,
} from "~/legacy/src/constants";
export interface PurchaseSummaryState {
  mposProduct: string;
  mposQuantity: number;
  mposValue: number;
  costOfShipping: number;
  total: number;
  isComplete: boolean;
}

export interface BasicInformationState {
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  email: string;
  isComplete: boolean;
}

export interface BusinessInformationState {
  storeName: string;
  storeId: string;
  category: number;
  subcategory: number;
  nit: string;
  businessName: string;
  documentType: number;
  document: string;
  typePerson: TypePerson;
  expeditionDate: string;
  isComplete: boolean;
}

export interface ShipmentInformationState {
  state: string;
  city: string;
  addressPrefix: string;
  address: string;
  addressDetail: string;
  neighborhood: string;
  anotherPerson: boolean;
  anotherName: string;
  anotherPhone: string;
  isComplete: boolean;
  cityCode?: string;
}
export interface DepositInformationState {
  bankId: number;
  bankDescription: string;
  accountType: AccountTypes;
  accountNumber: string;
  methodsPaymentType: MethodPayment;
  methodsPayment: string;
  isHunterImmediatePayment?: boolean;
  isComplete: boolean;
}

export interface ReceptionInformationState {
  deliveryDate: Date | null;
  isComplete: boolean;
}

export interface TemporalCredentialsState {
  userId: string;
  storeId: string;
  userFirebaseId: string;
  isComplete: boolean;
  loginType: LoginTypes | null;
}

export interface Hunter {
  id: string;
}
export interface AppState {
  isHunters: boolean;
  isLogged: boolean;
  isWebView: boolean;
  loginType: LoginTypes | null;
  uid: string;
  hasPreviousPurchase: boolean;
  hasAcceptedPurchasedOrder: boolean;
  tokens: { idToken: string };
  transactionId: string;
  purchaseSummary: PurchaseSummaryState;
  basicInformation: BasicInformationState;
  businessInformation: BusinessInformationState;
  shipmentInformation: ShipmentInformationState;
  depositInformation: DepositInformationState;
  receptionInformation: ReceptionInformationState;
  temporalCredentials: TemporalCredentialsState;
  utmParameters: UtmParameters;
  persisted: boolean;
  hunter: Hunter;
  splitIOKeyValue: Record<string, boolean>;
}

export interface LoginPayload {
  uid: string;
  userId: string;
  loginType: LoginTypes;
  idToken: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  storeId?: string;
}

export interface UtmParameters {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

export type PurchaseSummaryPayload = Omit<PurchaseSummaryState, "isComplete">;

export type BasicInformationPayload = Omit<
  BasicInformationState,
  "isComplete" | "userId"
>;

export type BusinessInformationPayload = Omit<
  BusinessInformationState,
  "isComplete" | "storeName" | "storeId"
>;

export type ShipmentInformationPayload = Omit<
  ShipmentInformationState,
  "isComplete"
>;

export type DepositInformationPayload = Omit<
  DepositInformationState,
  "isComplete"
>;

export type ReceptionInformationPayload = Omit<
  ReceptionInformationState,
  "isComplete"
>;

export type TemporalCredentialsPayload = Omit<
  TemporalCredentialsState,
  "isComplete"
>;

export type MposPurchaseInformationPayload = Omit<
  AppState,
  "tokens" | "persisted"
>;

export interface StoreInformationPayload {
  storeName: string;
  storeId: string;
}

export interface AppActions {
  logIn: (payload: LoginPayload) => void;
  logOut: () => void;
  setIsWebView: () => void;
  setTransactionId: (payload: string) => void;
  setPurchaseSummary: (payload: PurchaseSummaryPayload) => void;
  setBasicInformation: (payload: BasicInformationPayload) => void;
  setBusinessInformation: (payload: BusinessInformationPayload) => void;
  setShipmentInformation: (payload: ShipmentInformationPayload) => void;
  setDepositInformation: (payload: DepositInformationPayload) => void;
  setReceptionInformation: (payload: ReceptionInformationPayload) => void;
  setStoreInformation: (payload: StoreInformationPayload) => void;
  setTemporalCredentials: (payload: TemporalCredentialsPayload) => void;
  setMPOSPaymentInformation: (payload: MposPurchaseInformationPayload) => void;
  setHasAcceptedPurchasedOrder: (payload: boolean) => void;
  setHasPreviousPurchase: () => void;
  setUtmParameters: (payload: UtmParameters) => void;
  setIsHunters: (payload: boolean) => void;
  setHuntersData: (payload: Hunter) => void;
  setSplitIOKeyValue: (payload: Record<string, boolean>) => void;
  setIdToken: (payload: string) => void;
  resetContext: () => void;
}

export type AppContextType = AppState & AppActions;
