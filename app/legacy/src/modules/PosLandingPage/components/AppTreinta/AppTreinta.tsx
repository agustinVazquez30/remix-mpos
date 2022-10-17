import { BuyButton, BuyButtonVariants } from "~/legacy/src/commons/BuyButton";
import { Link, Typography } from "@30sas/web-ui-kit-core";
import { MposBalanceImage, SectionApp } from "./styles";
import MposBalance from "~/legacy/src/assets/pos-landing/balances_mpos.png";
import { useTranslation } from "react-i18next";

export const AppTreinta = () => {
  const { t } = useTranslation();
  return (
    <SectionApp>
      <div
        style={{
          gridArea: "description",
          alignSelf: "center",
          justifySelf: "center",
        }}
      >
        <Typography className="title" variant="XXXLargebold">
          {t("posLandingPage.aboutApp.title")}
        </Typography>
        <Typography className="desc" variant="Large" color="gray">
          <strong>{t("posLandingPage.aboutApp.descBold")}</strong>{" "}
          {t("posLandingPage.aboutApp.desc")}
          <br />
          {t("posLandingPage.aboutApp.desc2")}
          <br />
          {t("posLandingPage.aboutApp.desc3")}
        </Typography>
        <div className="link">
          <Link
            justifyContent="left"
            colorLink="info"
            colorLinkType="500"
            label={t("posLandingPage.aboutApp.link")}
            underline="always"
            disabled={false}
            href="https://www.treinta.app/"
            target="_blank"
          />
        </div>
        <div>
          <BuyButton
            variant={BuyButtonVariants.secondary}
            label={t("posLandingPage.aboutApp.button")}
          />
        </div>
      </div>
      <div style={{ gridArea: "image" }}>
        <MposBalanceImage src={MposBalance} alt="mpos balance" />
      </div>
    </SectionApp>
  );
};
