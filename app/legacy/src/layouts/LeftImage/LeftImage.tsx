import { Container, Details, DetailsContainer } from "./styles";
import ImageFreeDelivery from "~/legacy/src/assets/pos-landing/free-delivery.png";
import ImageNoPhone from "~/legacy/src/assets/pos-landing/no-phone.png";
import ImagePayments from "~/legacy/src/assets/pos-landing/payments.png";
import ImageSupport from "~/legacy/src/assets/pos-landing/support.png";
import { ReactNode } from "react";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { Typography } from "@30sas/web-ui-kit-core";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useTranslation } from "react-i18next";

type LeftImageType = {
  image: string;
  form: ReactNode;
  floatButton: ReactNode;
};

export const LeftImage = ({ form, image, floatButton }: LeftImageType) => {
  const { t } = useTranslation();

  const { splitIOKeyValue } = useAppContext();

  const showNewImage =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationPOSValuesSummary] ?? true;

  return (
    <Container showNewImage={showNewImage}>
      <div className="left-container">
        <div className="container-image">
          <img loading="lazy" src={image} alt="left" data-testid="left-image" />
          {showNewImage ? (
            <DetailsContainer>
              <Typography
                className="imageMessage"
                variant="XXXLargebold"
                margin="0"
              >
                {`${t("leftImage.imageMessage.yourMpos")} `}
                <span className="important-text">
                  {`${t("leftImage.imageMessage.noContracts")}`}
                </span>
              </Typography>
              <Details>
                <img loading="lazy" src={ImageNoPhone} alt="free delivery" />
                <Typography variant="Large">
                  <span className="important-text">
                    {`${t("leftImage.imageMessage.noWifi.begin")} `}
                  </span>
                  {`${t("leftImage.imageMessage.noWifi.end")}`}
                </Typography>
              </Details>
              <Details>
                <img loading="lazy" src={ImageSupport} alt="free delivery" />
                <Typography variant="Large">
                  <span className="important-text">
                    {`${t("leftImage.imageMessage.support.begin")} `}
                  </span>
                  {`${t("leftImage.imageMessage.support.end")}`}
                </Typography>
              </Details>
              <Details>
                <img loading="lazy" src={ImagePayments} alt="free delivery" />
                <Typography variant="Large">
                  {`${t("leftImage.imageMessage.contactlessPayment.begin")} `}
                  <span className="important-text">
                    {`${t("leftImage.imageMessage.contactlessPayment.end")}`}
                  </span>
                </Typography>
              </Details>
              <Details>
                <img
                  loading="lazy"
                  src={ImageFreeDelivery}
                  alt="free delivery"
                />
                <Typography variant="Large">
                  <span className="important-text">
                    {`${t("leftImage.imageMessage.freeShipping.begin")} `}
                  </span>
                  {`${t("leftImage.imageMessage.freeShipping.end")}`}
                </Typography>
              </Details>
            </DetailsContainer>
          ) : (
            <Typography
              className="imageMessage"
              variant="XXXLargebold"
              margin="0"
            >
              {`${t("leftImage.imageMessage.yourMpos")} `}
              <span className="important-text">
                {`${t("leftImage.imageMessage.noContracts")}`}
              </span>
            </Typography>
          )}
        </div>
      </div>
      <div className="right-container">
        <div className="content">{form}</div>
        <div className="float-button">{floatButton}</div>
      </div>
    </Container>
  );
};
