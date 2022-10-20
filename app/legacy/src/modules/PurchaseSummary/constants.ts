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
