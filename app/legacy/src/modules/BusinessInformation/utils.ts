import { DocumentTypeRegexValidation, KYC_STATUS_ID } from "./constants";
import { ROUTES, ServiceStatus } from "~/legacy/src/constants";

import type { AxiosError } from "axios";
import { documentTypesMap } from "@30sas/web-ui-kit-utils";
import { i18n } from "~/legacy/src/config/Translation";

const country =
  typeof window !== "undefined" ? window.ENV?.REACT_APP_COUNTRY : -1;
export const defaultSubcategory = [
  {
    id: -1,
    label: i18n.t("businessInformation.subCategory.default"),
  },
];

export const defaultCategory = [
  {
    id: -1,
    label: "Selecciona la categoría",
    subcategories: [],
  },
];

export const defaultStores: { id: number | string; label: string }[] = [
  {
    id: -1,
    label: i18n.t("businessInformation.storeInTreinta.default"),
  },
];

export const getDocumentTypesNaturalPerson = () => {
  const documentType = documentTypesMap.get(Number(country)) ?? [];
  const mapType: { label: string; id: number }[] = documentType
    .filter(
      (type: { name: string; id: number }) => !!type.name && type.name !== "NIT"
    )
    .map((type: { name: string; id: number }) => ({
      label: type.name,
      id: type.id,
    }));

  return mapType;
};

export const getDocumentTypeNit = () => {
  const documentType = documentTypesMap.get(Number(country)) ?? [];
  const mapType: { label: string; id: number } = documentType.find(
    (type: { name: string; id: number }) => type.name === "NIT"
  );

  return {
    label: mapType.label,
    id: mapType.id,
  };
};

export const getSubcategoriesByCategoryName = (
  categories: any[],
  category: string
) => {
  const cat = categories.find((cat) => cat.label === category);
  let subs;
  if (cat) subs = cat.subcategories;
  else subs = categories[0].subcategories;

  return defaultSubcategory.concat(subs);
};

/* export const getSubcategoriesByCategoryId = (categories: BusinessCategory[], categoryId: number) => {
  const cat = categories.find(cat => cat.id === categoryId);
  let subs;
  if (cat) subs = cat.subCategories;
  else subs = categories[0].subCategories;

  return defaultSubcategory.concat(subs);
};*/

export const getSubCategoryByCategoryAndName = (
  categories: any[],
  category: string,
  sub: string
) => {
  const subs = getSubcategoriesByCategoryName(categories, category);
  return subs.find((subcategorie) => subcategorie.label === sub);
};

export const isFirebaseError = (error: AxiosError) => {
  const stringMessageMapped = Object.values(error?.response?.data ?? {}).join(
    ""
  );

  return stringMessageMapped.includes(
    `Error when trying to create the firebase user with the mail`
  );
};

/*export const getSubCategoryByCategoryIdAndId = (
  categoryId: number,
  subId: number,
) => {
  const subs = getSubcategoriesByCategoryId(categories, categoryId);
  return subs.find(subcategorie => subcategorie.id === subId);
};*/

export const mappedKYCValidationStatus: {
  [key: number]: {
    serviceStatusId: ServiceStatus;
    redirectRoute: ROUTES;
  };
} = {
  [KYC_STATUS_ID.ACCEPTED]: {
    serviceStatusId: ServiceStatus.ACTIVE,
    redirectRoute: ROUTES.SHIPMENT_INFORMATION,
  },
  [KYC_STATUS_ID.REJECTED]: {
    serviceStatusId: ServiceStatus.INACTIVE,
    redirectRoute: ROUTES.DISCARDED,
  },
  [KYC_STATUS_ID.REVIEW]: {
    serviceStatusId: ServiceStatus.PENDING,
    redirectRoute: ROUTES.MANUAL_ERROR_VERIFYING,
  },
};

export const isValidDocument = (
  documentType: string,
  documentValue: string
): boolean => {
  const getDocumentRegex = DocumentTypeRegexValidation[documentType];

  if (!getDocumentRegex) return true;

  getDocumentRegex.lastIndex = 0;
  return getDocumentRegex.test(documentValue);
};
