import { Button } from "@30sas/web-ui-kit-core";
import { ContentButtonWhatsapp } from "./styles";
import { DEFAULT_WHATSAPP_SUPPORT_PHONE } from "~/legacy/src/constants";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { SplitIOTreatmentNamesLoading } from "~/legacy/src/config/SplitIo/models";
import { WhatsappIcon } from "@30sas/web-ui-kit-icons";
import { getWhatsappInfo } from "./utils";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { newBrazeEvent } from "~/legacy/src/config/Braze";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const WHATSAPP_JOIN_URL = "https://api.whatsapp.com/send";

export type WhatsappButtonType = {
  phone?: string;
  message?: string;
  label?: string;
  overwriteZendesk?: boolean;
  fullWidth?: boolean;
};

export const WhatsappButton = ({
  phone = DEFAULT_WHATSAPP_SUPPORT_PHONE,
  message,
  label,
  fullWidth = false,
  overwriteZendesk = false,
}: WhatsappButtonType) => {
  const { businessInformation } = useAppContext();
  const { splitIOKeyValue } = useAppContext();
  const showZendeskChat =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationPOSCXZendesk];
  const zendeskChatLoading =
    splitIOKeyValue[SplitIOTreatmentNamesLoading.ActivationPOSCXZendeskLoading];
  const generateEvent = useGenericEvent();

  const { t } = useTranslation();
  const { pathname } = useLocation();

  const handleOnClick = (): void => {
    const whastAppInfo = getWhatsappInfo(pathname);

    if (whastAppInfo.amplitudeEventName) {
      newAmplitudeEvent(whastAppInfo.amplitudeEventName);
    }

    if (whastAppInfo.brazeEventName) {
      newBrazeEvent(whastAppInfo.brazeEventName);
    }

    generateEvent({
      eventName: "WebPagosContactCx",
      eventArgs: { businessInformation },
      platforms: { amplitude: true },
    });

    window.open(
      `${WHATSAPP_JOIN_URL}?phone=${phone}&text=${(
        message || whastAppInfo.message
      ).replace(/\s/g, "%20")}`
    );
  };

  if ((showZendeskChat || zendeskChatLoading) && !overwriteZendesk) return null;

  return (
    <ContentButtonWhatsapp fullWidth={fullWidth}>
      <Button
        label={label ?? t("commons.needHelp")}
        StartIcon={WhatsappIcon}
        color="neutrals"
        colorType="100"
        hoverColor="secondary"
        hoverColorType="100"
        upper={false}
        size="medium"
        textColor="success"
        textColorType="500"
        borderColor="success"
        borderColorType="500"
        textVariant="Mediumbold"
        className="button"
        variant="secondary"
        fullWidth={fullWidth}
        onClick={handleOnClick}
      />
    </ContentButtonWhatsapp>
  );
};
