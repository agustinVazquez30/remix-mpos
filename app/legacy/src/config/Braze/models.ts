import {
  GenericEvent,
  genericEvents,
} from "~/legacy/src/hooks/useGenericEvent/models";

export const WebPagosHelpsSummaryConfirmed =
  "web_pagos_help_step_summary_confirmed";
export const WebPagosHelpsStepBasicInformation =
  "web_pagos_help_step_basic_information";
export const WebPagosHelpsStepStoreInfo = "web_pagos_help_step_store_info";
export const WebPagosHelpsStepInfoDelivery =
  "web_pagos_help_step_info_delivery";
export const WebPagosHelpsStepDepositInfo = "web_pagos_help_step_deposit_info";
export const WebPagosHelpsStepBuyFinished = "web_pagos_help_step_buy_finished";

export const WebPagosErrorKyc = "web_pagos_error_kyc";

export const WebPagosArrivesLandingPage = "web_pagos_arrives_landing_page";
export const WebPagosInteresBuying = "web_pagos_interes_buying";
export const WebPagosFinaLogIn = "web_pagos_final_log_in";

export const brazeEvents = {
  ...genericEvents,
  WebPagosHelpsSummaryConfirmed,
  WebPagosHelpsStepBasicInformation,
  WebPagosHelpsStepStoreInfo,
  WebPagosHelpsStepInfoDelivery,
  WebPagosHelpsStepDepositInfo,
  WebPagosHelpsStepBuyFinished,
  WebPagosErrorKyc,
  WebPagosArrivesLandingPage,
  WebPagosInteresBuying,
  WebPagosFinaLogIn,
};

export type BrazeEventType =
  | GenericEvent
  | "WebPagosHelpsSummaryConfirmed"
  | "WebPagosHelpsStepBasicInformation"
  | "WebPagosHelpsStepStoreInfo"
  | "WebPagosHelpsStepInfoDelivery"
  | "WebPagosHelpsStepDepositInfo"
  | "WebPagosBuyFinished"
  | "WebPagosHelpsStepBuyFinished"
  | "WebPagosErrorKyc"
  | "WebPagosArrivesLandingPage"
  | "WebPagosInteresBuying"
  | "WebPagosFinaLogIn";
