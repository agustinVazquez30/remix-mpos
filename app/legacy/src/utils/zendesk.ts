import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useEffect } from "react";

declare global {
  interface Window {
    zE: (...params: any[]) => void;
    zESettings: any;
  }
}

export const useSetupZendesk = () => {
  useEffect(() => {
    window.zE("webWidget", "hide");
    window.zE("webWidget", "setLocale", "es");
    window.zE("webWidget", "chat:addTags", ["POS-Activation"]);
  }, []);
};

export const useShowZendesk = () => {
  const { splitIOKeyValue } = useAppContext();
  const showZendeskChat =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationPOSCXZendesk];

  useEffect(() => {
    if (showZendeskChat) {
      window.zE("webWidget", "show");
    }

    return () => {
      window.zE("webWidget", "hide");
    };
  }, [showZendeskChat]);
};
