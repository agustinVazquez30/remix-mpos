import { Button, Link, Typography } from "@30sas/web-ui-kit-core";
import {
  Contact,
  FooterColumns,
  FooterSection,
  HelpFloatButton,
  LinkFooter,
} from "./styles";
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  TwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@30sas/web-ui-kit-icons";
import { DEFAULT_FORMATTED_WHATSAPP_SUPPORT_PHONE } from "~/legacy/src/constants";
import GooglePlayImage from "~/legacy/src/assets/pos-landing/google-play.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TreintaImage from "~/legacy/src/assets/pos-landing/treinta.png";
import { redirect } from "~/legacy/src/utils/redirect";
import { useGoToBuy } from "~/legacy/src/hooks/useGoToBuy";
import { useTranslation } from "react-i18next";

interface Props {
  help: () => void;
}

export const Footer = ({ help }: Props) => {
  const { t } = useTranslation();
  const purchaseOrder = useGoToBuy();

  return (
    <FooterSection>
      <FooterColumns>
        <LinkFooter onClick={() => redirect("https://www.treinta.co/")}>
          <Typography variant="Mediumbold">
            <LazyLoadImage src={TreintaImage} alt="treinta logo" />
          </Typography>
        </LinkFooter>
        <Contact>
          <Link
            className="links"
            StartIcon={EmailIcon}
            justifyContent="left"
            colorLink="info"
            colorLinkType="500"
            label="hola@treinta.co"
            underline="always"
            disabled={false}
            href="https://www.treinta.app/"
            target="_blank"
            labelMargin="0px"
          />
        </Contact>
        <Contact>
          <Link
            className="links"
            StartIcon={WhatsappIcon}
            justifyContent="left"
            colorLink="info"
            colorLinkType="500"
            label={DEFAULT_FORMATTED_WHATSAPP_SUPPORT_PHONE}
            underline="always"
            disabled={false}
            onClick={help}
          />
        </Contact>
        <Contact
          onClick={() =>
            redirect(
              "https://play.google.com/store/apps/details?id=com.treintaapp"
            )
          }
        >
          <LazyLoadImage src={GooglePlayImage} alt="google play" />
        </Contact>
      </FooterColumns>
      <FooterColumns>
        <Typography variant="Mediumbold">Soluciones</Typography>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/administra-negocio")}
        >
          <Typography>{t("posLandingPage.footer.manageYourStore")}</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/treinta-web")}
        >
          <Typography>{t("posLandingPage.footer.treintaPC")}</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/catalogo-virtual")}
        >
          <Typography>{t("posLandingPage.footer.virtualCatalogue")}</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/surte-tu-negocio")}
        >
          <Typography>{t("posLandingPage.footer.provisioning")}</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/ingresos-extra")}
        >
          <Typography>{t("posLandingPage.footer.extraIncome")}</Typography>
        </LinkFooter>
      </FooterColumns>
      <FooterColumns>
        <Typography variant="Mediumbold">Sobre Treinta</Typography>
        <LinkFooter onClick={() => purchaseOrder()}>
          <Typography>Compra en Treinta</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/sobre-treinta")}
        >
          <Typography>Sobre Treinta</Typography>
        </LinkFooter>
        <LinkFooter onClick={help}>
          <Typography>Ayuda</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.treinta.co/contactar-treinta")}
        >
          <Typography>Contáctanos</Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect(window.ENV?.REACT_APP_TERMS_CONDITIONS_URL!)}
        >
          <Typography>
            {t("posLandingPage.footer.termsAndConditions")}
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect(window.ENV?.REACT_APP_DATA_PRIVACY_URL!)}
        >
          <Typography>{t("posLandingPage.footer.dataPrivacy")}</Typography>
        </LinkFooter>
      </FooterColumns>
      <FooterColumns>
        <Typography className="socialNetworks" variant="Mediumbold">
          Síguenos
        </Typography>
        <LinkFooter
          onClick={() => redirect("https://www.facebook.com/treintaco")}
        >
          <Typography className="socialNetworks">
            <FacebookIcon fill="#176BF3" />
            Facebook
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://mobile.twitter.com/treintaco")}
        >
          <Typography className="socialNetworks">
            <TwitterIcon fill="#70B5E7" />
            Twitter
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.instagram.com/treinta.co/")}
        >
          <Typography className="socialNetworks">
            <InstagramIcon />
            Instagram
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() =>
            redirect("https://www.linkedin.com/company/treinta/mycompany/")
          }
        >
          <Typography className="socialNetworks">
            <LinkedinIcon fill="#0946AA" />
            Linkedin
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() => redirect("https://www.tiktok.com/@treinta.co?")}
        >
          <Typography className="socialNetworks">
            <TiktokIcon />
            Tik Tok
          </Typography>
        </LinkFooter>
        <LinkFooter
          onClick={() =>
            redirect(
              "https://www.youtube.com/channel/UCe87SV6HUmvdB1KYXNwgesA/featured"
            )
          }
        >
          <Typography className="socialNetworks">
            <YoutubeIcon fill="#DF2040" />
            YouTube
          </Typography>
        </LinkFooter>
      </FooterColumns>
      <Typography className="copyright">Copyright © 2021 Treinta</Typography>
      <HelpFloatButton>
        <Button
          label="¿Cómo podemos ayudarte?"
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={help}
          fullWidth={true}
          disabled={false}
          className="floatHelpButton"
          StartIcon={WhatsappIcon}
        />
      </HelpFloatButton>
    </FooterSection>
  );
};
