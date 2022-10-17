import {
  GenericEvent,
  genericEvents,
} from "~/legacy/src/hooks/useGenericEvent/models";

export const WebPagosHelpsStepBasicInformation =
  "web_pagos_help_step_basic_information";
export const WebPagosHelpsStepBuyFinished = "web_pagos_help_step_buy_finished";
export const WebPagosHelpsStepDepositInfo = "web_pagos_help_step_deposit_info";
export const WebPagosHelpsStepInfoDelivery =
  "web_pagos_help_step_info_delivery";
export const WebPagosHelpsSteprMposConfirmation =
  "web_pagos_help_step_resumen_compra ";
export const WebPagosHelpsStepStoreInfo = "web_pagos_help_step_store_info";
export const WebPagosMposConfirmation = "web_pagos_mpos_confirmation";
export const webPagosLandingContactMe = "web_pagos_landing_contact_me";
export const WebPagosFinaLogIn = "web_pagos_final_log_in";
export const WebPagosCalculador = "web_pagos_calculador";
export const WebPagosNeedHelp = "web_pagos_need_help";

export const amplitudeEvents: Record<AmplitudeEventType, string> = {
  ...genericEvents,
  WebPagosHelpsStepBasicInformation,
  WebPagosHelpsStepDepositInfo,
  WebPagosHelpsStepBuyFinished,
  WebPagosHelpsStepInfoDelivery,
  WebPagosHelpsSteprMposConfirmation,
  WebPagosHelpsStepStoreInfo,
  WebPagosMposConfirmation,
  webPagosLandingContactMe,
  WebPagosFinaLogIn,
  WebPagosCalculador,
  WebPagosNeedHelp,
};

export type AmplitudeEventType =
  | GenericEvent
  | "WebPagosHelpsStepBasicInformation"
  | "WebPagosHelpsStepDepositInfo"
  | "WebPagosHelpsStepBuyFinished"
  | "WebPagosHelpsStepInfoDelivery"
  | "WebPagosHelpsSteprMposConfirmation"
  | "WebPagosHelpsStepStoreInfo"
  | "WebPagosMposConfirmation"
  | "webPagosLandingContactMe"
  | "WebPagosFinaLogIn"
  | "WebPagosCalculador"
  | "WebPagosNeedHelp";
