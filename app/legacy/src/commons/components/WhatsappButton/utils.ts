import { AmplitudeEventType } from "~/legacy/src/config/Amplitude";
import { BrazeEventType } from "~/legacy/src/config/Braze";
import { ROUTES } from "~/legacy/src/constants";

type HelpTextType = {
  message: string;
  amplitudeEventName?: AmplitudeEventType;
  brazeEventName?: BrazeEventType;
};

export const getWhatsappInfo = (currentRoute: string): HelpTextType => {
  const HelpText: { [key in ROUTES | string]: HelpTextType } = {
    default: {
      message: "¡Hola! Quiero comprar un datáfono pero tengo unas dudas.",
    },
    [ROUTES.HOME]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el paso de resumen de compra.",
      amplitudeEventName: "WebPagosHelpsSteprMposConfirmation",
      brazeEventName: "WebPagosHelpsSummaryConfirmed",
    },
    [ROUTES.BASIC_INFORMATION]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el paso de información básica.",
      amplitudeEventName: "WebPagosHelpsStepBasicInformation",
      brazeEventName: "WebPagosHelpsStepBasicInformation",
    },
    [ROUTES.BUSINESS_INFORMATION]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el paso de información de negocio.",
      amplitudeEventName: "WebPagosHelpsStepStoreInfo",
      brazeEventName: "WebPagosHelpsStepStoreInfo",
    },
    [ROUTES.DEPOSIT_INFORMATION]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el paso de datos depósito.",
      amplitudeEventName: "WebPagosHelpsStepDepositInfo",
      brazeEventName: "WebPagosHelpsStepDepositInfo",
    },
    [ROUTES.PAYMENT_CONFIRMATION]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el proceso de pago.",
      amplitudeEventName: "WebPagosHelpsStepBuyFinished",
      brazeEventName: "WebPagosHelpsStepBuyFinished",
    },
    [ROUTES.SHIPMENT_INFORMATION]: {
      message:
        "¡Hola! Quiero comprar un datáfono pero tengo dudas en el paso de información de envío.",
      amplitudeEventName: "WebPagosHelpsStepInfoDelivery",
      brazeEventName: "WebPagosHelpsStepInfoDelivery",
    },
  };

  return HelpText[currentRoute] || HelpText.default;
};
