import { IconType } from "~/legacy/src/commons/components";
import { ROUTES } from "~/legacy/src/constants";
import { t } from "i18next";

type StepsType = {
  [key: string]: {
    path: ROUTES;
    title: string;
    icon?: IconType;
    helpText?: string;
    backRoute: ROUTES;
  };
};

export const STEPS: StepsType = {
  basicInformation: {
    path: ROUTES.BASIC_INFORMATION,
    title: t("basicInformation.title"),
    icon: "DocumentTickIcon",
    backRoute: ROUTES.PURCHASE_ORDER,
  },
  businessInformation: {
    path: ROUTES.BUSINESS_INFORMATION,
    title: t("businessInformation.title"),
    icon: "UserInfoIcon",
    helpText: t("businessInformation.description"),
    backRoute: ROUTES.BASIC_INFORMATION,
  },
  shipmentInformation: {
    path: ROUTES.SHIPMENT_INFORMATION,
    title: t("shipmentInformation.title"),
    icon: "MapIcon",
    backRoute: ROUTES.BUSINESS_INFORMATION,
  },
  depositInformation: {
    path: ROUTES.DEPOSIT_INFORMATION,
    title: t("depositData.title"),
    icon: "BankIcon",
    helpText: t("depositData.helpText"),
    backRoute: ROUTES.SHIPMENT_INFORMATION,
  },
  paymentConfirmation: {
    path: ROUTES.PAYMENT_CONFIRMATION,
    title: t("paymentConfirmation.title"),
    backRoute: ROUTES.DEPOSIT_INFORMATION,
  },
};
