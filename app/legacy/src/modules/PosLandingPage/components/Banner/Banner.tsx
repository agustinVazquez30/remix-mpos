import {
  ActionsContainer,
  BuyNow,
  Container,
  ImgContainer,
  SectionInfo,
} from "./styles";
import { Button, Typography } from "@30sas/web-ui-kit-core";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import { BuyButton } from "~/legacy/src/commons/BuyButton";
import { PhoneIcon } from "@30sas/web-ui-kit-icons";
import PosImage from "~/legacy/src/assets/pos-landing/head_mpos.webm";
import { Theme } from "@30sas/web-ui-kit-theme";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { redirect } from "~/legacy/src/utils/redirect";
import { useContext } from "react";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

const DEFAULT_UTM_VALUE = "xxxxx";

const replaceAll = (text: string, map: Record<string, string>): string => {
  const regex = new RegExp(Object.keys(map).join("|"), "gi");
  return text.replace(
    regex,
    (matched: string) => map?.[matched] ?? DEFAULT_UTM_VALUE
  );
};

export const Banner: React.FC = () => {
  const { utmParameters } = useContext(AppContext);
  const { t } = useTranslation();
  const theme = useTheme() as Theme;

  const handleRedirectEvent = () => {
    newAmplitudeEvent("webPagosLandingContactMe", { utmParameters });

    const url = replaceAll(process.env.REACT_APP_TREINTA_BUY_WITH_ADVISOR!, {
      "-utm_source-": utmParameters.utmSource ?? DEFAULT_UTM_VALUE,
      "-utm_medium-": utmParameters.utmMedium ?? DEFAULT_UTM_VALUE,
      "-utm_campaign-": utmParameters.utmCampaign ?? DEFAULT_UTM_VALUE,
    });
    redirect(url);
  };

  return (
    <Container>
      <SectionInfo style={{ gridArea: "info" }}>
        <Typography
          forwardedAs="h1"
          dataTestId="titleBanner"
          variant="Large"
          className="title"
        >
          Un datáfono portátil y sin cargos ocultos
        </Typography>

        <Typography className="subtitle">Solo pagas por venta:</Typography>
        <Typography className="commission">
          2.99%
          <span className="subtitle-bold"> + impuestos de ley</span>
        </Typography>
      </SectionInfo>
      <BuyNow>
        {t("posLandingPage.buyNowCurrentPrice")}{" "}
        <del>{t("posLandingPage.oldPrice")}</del>{" "}
        <span className="buy-now-new-price">
          {t("posLandingPage.newPrice")}!
        </span>
      </BuyNow>
      <ImgContainer style={{ gridArea: "image" }}>
        <video className="pos-image" autoPlay muted>
          <source src={PosImage} type="video/webm" />
        </video>
      </ImgContainer>
      <ActionsContainer style={{ gridArea: "actions" }}>
        <BuyButton className="buyButton" />

        <Button
          label={t("posLandingPage.faqSection")}
          color="neutrals"
          colorType="100"
          hoverColor="secondary"
          hoverColorType="100"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="success"
          textVariant="Mediumbold"
          variant="secondary"
          onClick={handleRedirectEvent}
          fullWidth={true}
          StartIcon={() => <PhoneIcon fill={theme.colors.success[600]} />}
          textColorType="600"
          borderColor="success"
          borderColorType="600"
          className="faqButton"
        />
      </ActionsContainer>
    </Container>
  );
};
