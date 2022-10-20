import { Container, Landing } from "./styles";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { useEffect, useMemo } from "react";
import { About } from "./components/About";
import { AppTreinta } from "./components/AppTreinta";
import { Banner } from "./components/Banner";
import { DEFAULT_WHATSAPP_SUPPORT_PHONE } from "~/legacy/src/constants";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { PaymentCalculatorLoad } from "./components";
import { Support } from "./components/Support";
import { VideoLanding } from "./components/VideoLanding";
import { redirect } from "~/legacy/src/utils/redirect";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useParams } from "@remix-run/react";

export const PosLandingPage = ({ data }: any) => {
  const { search } = useParams();
  const { setHasAcceptedPurchasedOrder, setUtmParameters } = useAppContext();
  const generateEvent = useGenericEvent();

  const utmParams = useMemo(() => new URLSearchParams(search), [search]);

  const helpButton = () => {
    redirect(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "¡Hola! Quiero comprar un datáfono pero tengo unas dudas."
      )}&phone=${DEFAULT_WHATSAPP_SUPPORT_PHONE} `
    );
  };

  const { State: noShowSecondBuyButton, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationSecondBuyButton
  );
  const { State: showVideoLanding } = useSplitIO(
    SplitIOTreatmentNames.ActivationVideoLanding
  );

  const splitAppTreinta =
    !loading && !noShowSecondBuyButton ? <AppTreinta /> : null;

  useEffect(() => {
    sessionStorage.clear();
    const utmParameters = {
      utmSource: utmParams.get("utm_source"),
      utmMedium: utmParams.get("utm_medium"),
      utmCampaign: utmParams.get("utm_campaign"),
    };

    setUtmParameters({ ...utmParameters });
    setHasAcceptedPurchasedOrder(false);

    generateEvent({
      eventName: "WebPagosArrivesLandingPage",
      eventArgs: { utmParameters },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setHasAcceptedPurchasedOrder, setUtmParameters, utmParams]);

  return (
    <Container>
      <Landing>
        <Banner data={data} />
        <About />
        {splitAppTreinta}
        <PaymentCalculatorLoad />
        {showVideoLanding && <VideoLanding />}
        <Support help={helpButton} />
        <Faq data={data} />
        <Footer help={helpButton} />
      </Landing>
    </Container>
  );
};
