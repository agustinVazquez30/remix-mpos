export type SplitIOTreatmentOptions =
  | 'activation_HunterCode'
  | 'activation_NoPEPPOS'
  | 'activation_SignInPostPOS'
  | 'activation_BuyInHeader'
  | 'activation_NoLoginPOS'
  | 'activation_SecondBuyButton'
  | 'activation_POSCXZendesk'
  | 'activation_VideoLanding'
  | 'activation_POSValuesSummary'
  | 'activation_DeliveryDate'
  | 'activation_POSValuesLanding'
  | 'activation_posmetamap';

export enum SplitIOTreatmentNames {
  ActivationHunterCode = 'activation_HunterCode',
  ActivationBuyInHeader = 'activation_BuyInHeader',
  ActivationNoLoginPOS = 'activation_NoLoginPOS',
  ActivationSecondBuyButton = 'activation_SecondBuyButton',
  ActivationNoPEPPOS = 'activation_NoPEPPOS',
  ActivationVideoLanding = 'activation_VideoLanding',
  ActivationSignInPostPOS = 'activation_SignInPostPOS',
  ActivationPOSCXZendesk = 'activation_POSCXZendesk',
  ActivationPOSValuesSummary = 'activation_POSValuesSummary',
  ActivationDeliveryDate = 'activation_DeliveryDate',
  ActivationPOSValuesLanding = 'activation_POSValuesLanding',
  ActivationPosmetamap = 'activation_posmetamap',
}

export enum SplitIOTreatmentNamesLoading {
  ActivationPOSCXZendeskLoading = 'ActivationPOSCXZendeskLoading',
  ActivationPOSValuesLandingLoading = 'ActivationPOSValuesLandingLoading',
}
