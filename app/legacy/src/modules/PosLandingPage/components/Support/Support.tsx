import { Button, Typography } from "@30sas/web-ui-kit-core";
import {
  GreenSection,
  LeftSupportSection,
  RightSupportSection,
  SupportImg,
  SupportImgContainer,
  SupportSection,
} from "./styles";
import SupportTreintaImage from "~/legacy/src/assets/pos-landing/support-treinta.png";
import { WhatsappIcon } from "@30sas/web-ui-kit-icons";
import { getBasicInfoProperties } from "~/legacy/src/utils/getEventProperties";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useTranslation } from "react-i18next";

interface Props {
  help: () => void;
}

export const Support = ({ help }: Props) => {
  const { t } = useTranslation();
  const { basicInformation, utmParameters } = useAppContext();

  const handleHelp = () => {
    help();
    newAmplitudeEvent("WebPagosNeedHelp", {
      ...getBasicInfoProperties(basicInformation),
      utmParameters,
    });
  };

  return (
    <SupportSection id={t("anchorTags.supportAnchor")}>
      <LeftSupportSection>
        <GreenSection />
        <SupportImgContainer>
          <SupportImg src={SupportTreintaImage} alt="support treinta" />
        </SupportImgContainer>
      </LeftSupportSection>
      <RightSupportSection>
        <Typography forwardedAs="h2" className="title" variant="XXXLargebold">
          {t("posLandingPage.support.title")}
        </Typography>
        <ul>
          <li>
            <Typography className="text">
              <strong>Te asignamos un asesor personal</strong> para que te ayude
              a resolver cualquier inquietud.
            </Typography>
          </li>
          <li>
            <Typography className="text">
              <strong>Te acompañamos 24/7</strong> durante la compra y uso del
              datáfono.
            </Typography>
          </li>
        </ul>
        <div>
          <Button
            label="Necesito ayuda"
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
            onClick={handleHelp}
            fullWidth={true}
            StartIcon={() => <WhatsappIcon fill="success" />}
            textColorType="500"
            borderColor="success"
            borderColorType="500"
            className="help-button"
          />
        </div>
      </RightSupportSection>
    </SupportSection>
  );
};
