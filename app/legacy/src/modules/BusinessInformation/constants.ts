import { DocumentTypes } from "~/legacy/src/constants";

export const DOCUMENT_TYPE_CC = "CC";
export const DOCUMENT_TYPE_CE = "CE";
export const DOCUMENT_TYPE_PEP = "PEP";
export const DOCUMENT_TYPE_NIT = "NIT";

export const BREAK_POINT_POP_UP = 1024;
export const MOBILE_POP_UP_WIDTH = "90%";
export const DESKTOP_POP_UP_WIDTH = "65%";

export const DEFAULT_FORBIDD_ACTIVITIES = [
  "businessInformation.forbiddenActivities.forbidd1",
  "businessInformation.forbiddenActivities.forbidd2",
  "businessInformation.forbiddenActivities.forbidd3",
  "businessInformation.forbiddenActivities.forbidd4",
  "businessInformation.forbiddenActivities.forbidd5",
  "businessInformation.forbiddenActivities.forbidd6",
  "businessInformation.forbiddenActivities.forbidd7",
  "businessInformation.forbiddenActivities.forbidd8",
  "businessInformation.forbiddenActivities.forbidd9",
  "businessInformation.forbiddenActivities.forbidd10",
  "businessInformation.forbiddenActivities.forbidd11",
  "businessInformation.forbiddenActivities.forbidd12",
  "businessInformation.forbiddenActivities.forbidd13",
  "businessInformation.forbiddenActivities.forbidd14",
  "businessInformation.forbiddenActivities.forbidd15",
  "businessInformation.forbiddenActivities.forbidd16",
  "businessInformation.forbiddenActivities.forbidd17",
  "businessInformation.forbiddenActivities.forbidd18",
];

export enum KYC_DOCUMENT_TYPES {
  NATIONAL_ID = 1,
  FOREIGN_ID = 2,
  PEP = 63,
  TAX_ID = 6,
}

export enum KYC_STATUS_ID {
  SENT = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  STARTED = 4,
  REVIEW = 5,
}

export const KYCMappedDocumentTypes: { [key: number]: KYC_DOCUMENT_TYPES } = {
  [DocumentTypes.CC]: KYC_DOCUMENT_TYPES.NATIONAL_ID,
  [DocumentTypes.CE]: KYC_DOCUMENT_TYPES.FOREIGN_ID,
  [DocumentTypes.PEP]: KYC_DOCUMENT_TYPES.PEP,
  [DocumentTypes.NIT]: KYC_DOCUMENT_TYPES.TAX_ID,
};

export const DocumentTypeRegexValidation: { [key: string]: RegExp } = {
  [DOCUMENT_TYPE_CC]: /^\d{3,10}$/g,
  [DOCUMENT_TYPE_CE]: /^\d{1,9}$/g,
  [DOCUMENT_TYPE_PEP]: /^\d{15}$/g,
  [DOCUMENT_TYPE_NIT]: /^\d{9,11}$|^\d{9}-\d{1}$/g,
};
