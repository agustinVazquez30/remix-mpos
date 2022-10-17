import { BasicInformationState } from "~/legacy/src/contexts/AppContext";

export interface GetEventProperties {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const getBasicInfoProperties = (
  basicInfo: BasicInformationState
): GetEventProperties => ({
  userId: basicInfo.userId,
  firstName: basicInfo.firstName,
  lastName: basicInfo.lastName,
  email: basicInfo.email,
  phoneNumber: basicInfo.phoneNumber.countryCode + basicInfo.phoneNumber.number,
});
