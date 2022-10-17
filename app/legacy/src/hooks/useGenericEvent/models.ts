export const WebPagosFinishes = 'web_pagos_finishes';
export const WebPagosErrorKyc = 'web_pagos_error_kyc';
export const WebPagosContactCx = 'web_pagos_contact_cx';
export const WebPagosRepurchase = 'web_pagos_repurchase';
export const WebPagosFinaLogIn = 'web_pagos_final_log_in';
export const WebPagosLoggedUser = 'web_pagos_logged_user';
export const WebPagosBuyFinished = 'web_pagos_buy_finished';
export const WebPagosInteresBuying = 'web_pagos_interes_buying';
export const WebPagosPaymentRejected = 'web_pagos_payment_rejected';
export const WebPagosSummaryContinue = 'web_pagos_summary_continue';
export const WebPagosPaymentIsPending = 'web_pagos_payment_pending';
export const WebPagosSummaryConfirmed = 'web_pagos_summary_confirmed';
export const WebPagosUponDeliveryCash = 'web_pagos_upon_delivery_cash';
export const WebPagosVerificationError = 'web_pagos_verification_error';
export const WebPagosArrivesLandingPage = 'web_pagos_arrives_landing_page';
export const WebPagosStoreInfoCompleted = 'web_pagos_store_info_completed';
export const WebPagosDepositInfoConfirmed = 'web_pagos_deposit_info_confirmed';
export const WebPagosPaymentsUponDelivery = 'web_pagos_payments_upon_delivery';
export const WebPagosInfoDeliveryConfirmed =
  'web_pagos_info_delivery_confirmed';
export const WebPagosBasicInformationConfirmed =
  'web_pagos_basic_information_confirmed';
export const WebPagosEconomicActivitiesConfirmed =
  'web_pagos_economic_activities_confirmed';
export const WebPagosAssociatePurchase = 'web_pagos_associate_purchase';
export const WebPagosNotAssociatePurchase = 'web_pagos_not_associate_purchase';

export const genericEvents = {
  WebPagosFinishes,
  WebPagosErrorKyc,
  WebPagosFinaLogIn,
  WebPagosContactCx,
  WebPagosLoggedUser,
  WebPagosRepurchase,
  WebPagosBuyFinished,
  WebPagosInteresBuying,
  WebPagosPaymentRejected,
  WebPagosSummaryContinue,
  WebPagosPaymentIsPending,
  WebPagosSummaryConfirmed,
  WebPagosUponDeliveryCash,
  WebPagosVerificationError,
  WebPagosAssociatePurchase,
  WebPagosArrivesLandingPage,
  WebPagosStoreInfoCompleted,
  WebPagosDepositInfoConfirmed,
  WebPagosPaymentsUponDelivery,
  WebPagosNotAssociatePurchase,
  WebPagosInfoDeliveryConfirmed,
  WebPagosBasicInformationConfirmed,
  WebPagosEconomicActivitiesConfirmed,
};

export type GenericEvent =
  | 'WebPagosFinishes'
  | 'WebPagosErrorKyc'
  | 'WebPagosContactCx'
  | 'WebPagosFinaLogIn'
  | 'WebPagosLoggedUser'
  | 'WebPagosRepurchase'
  | 'WebPagosBuyFinished'
  | 'WebPagosInteresBuying'
  | 'WebPagosPaymentRejected'
  | 'WebPagosSummaryContinue'
  | 'WebPagosPaymentIsPending'
  | 'WebPagosSummaryConfirmed'
  | 'WebPagosUponDeliveryCash'
  | 'WebPagosVerificationError'
  | 'WebPagosAssociatePurchase'
  | 'WebPagosArrivesLandingPage'
  | 'WebPagosStoreInfoCompleted'
  | 'WebPagosDepositInfoConfirmed'
  | 'WebPagosPaymentsUponDelivery'
  | 'WebPagosNotAssociatePurchase'
  | 'WebPagosInfoDeliveryConfirmed'
  | 'WebPagosBasicInformationConfirmed'
  | 'WebPagosEconomicActivitiesConfirmed';
