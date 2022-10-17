import {
  BasicInformationState,
  BusinessInformationState,
  DepositInformationState,
  PurchaseSummaryState,
  ShipmentInformationState,
} from "~/legacy/src/contexts/AppContext";

import { CountriesIds } from "@30sas/web-ui-kit-utils";
import { PhoneNumber } from "~/legacy/src/constants";

export interface PayloadToken {
  token: string;
  uid: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  storeId: string;
  countryId: CountriesIds;
  phoneNumber: PhoneNumber;
  signInMethod: "phone" | "google";
}

export type CurrentContextType = {
  purchaseSummary: PurchaseSummaryState;
  basicInformation: BasicInformationState;
  businessInformation: BusinessInformationState;
  shipmentInformation: ShipmentInformationState;
  depositInformation: DepositInformationState;
};

export enum PARAMETERS {
  mposValue = "MPOS_ITEM_PRICE_CO",
  mposProduct = "MPOS_ITEM_NAME_CO",
  mposTax = "MPOS_ITEM_TAX_VALUE_CO",
  costOfShipping = "MPOS_ITEM_SHIPPING_COST_CO",
}

export const PARAMETERS_KEYS: Record<PARAMETERS, any> = {
  [PARAMETERS.mposTax]: "mposTax",
  [PARAMETERS.mposValue]: "mposValue",
  [PARAMETERS.mposProduct]: "mposProduct",
  [PARAMETERS.costOfShipping]: "costOfShipping",
};

export const parseApiData = (parameters: any[]): any | null => {
  const params = parameters
    .filter(
      (param) =>
        param.key &&
        Object.keys(PARAMETERS_KEYS).some((key) => key === param.key)
    )
    .map((param) => [(PARAMETERS_KEYS as any)[param.key as any], param.value]);

  if (!params.length) {
    return null;
  }

  const mappedData = Object.fromEntries(params);
  const { mposValue, costOfShipping, ...rest } = mappedData;

  return {
    ...rest,
    mposValue: Number(mposValue),
    costOfShipping: Number(costOfShipping),
  };
};
