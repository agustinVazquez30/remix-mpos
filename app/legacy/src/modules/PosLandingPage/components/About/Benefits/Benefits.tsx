import {
  ContainerMposImage,
  DetailItems,
  DetailsContainer,
  DetailsSides,
  TextSection,
} from "./styles";
import ContactlessMposImage from "~/legacy/src/assets/pos-landing/contactless-mpos-mini.png";
import FreeDeliveryImage from "~/legacy/src/assets/pos-landing/free-delivery.png";
import InstantMoneyImage from "~/legacy/src/assets/pos-landing/instant-money.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoPhoneImage from "~/legacy/src/assets/pos-landing/no-phone.png";
import PaymentsImage from "~/legacy/src/assets/pos-landing/payments.png";
import SupportImage from "~/legacy/src/assets/pos-landing/support.png";
import TransferImage from "~/legacy/src/assets/pos-landing/transfer.png";
import { Typography } from "@30sas/web-ui-kit-core";
import { useTranslation } from "react-i18next";

export const Benefits = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography forwardedAs="h2" variant="XXXLargebold" className="title">
        {t("posLandingPage.benefits.title")}
      </Typography>
      <DetailsContainer>
        <div style={{ gridArea: "main-image" }}>
          <TextSection>
            <Typography
              forwardedAs="h2"
              variant="XXXLargebold"
              className="message"
            >
              {t("posLandingPage.benefits.subtitle")}
            </Typography>
            <Typography forwardedAs="h2" variant="XLarge" className="message">
              {t("posLandingPage.benefits.description")}
            </Typography>
            <ContainerMposImage>
              <img src={ContactlessMposImage} alt="pos-details" />
            </ContainerMposImage>
          </TextSection>
        </div>
        <DetailsSides style={{ gridArea: "left-side" }}>
          <DetailItems>
            <LazyLoadImage
              src={NoPhoneImage}
              style={{ width: "4rem", height: "auto" }}
              alt="no phone"
            />
            <Typography variant="Large">
              {t("posLandingPage.benefits.details.noPhone")}
              <strong>
                {" "}
                {t("posLandingPage.benefits.details.noPhoneBold")}
                <br />
                {t("posLandingPage.benefits.details.noPhoneBold2")}
              </strong>
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage
              src={SupportImage}
              style={{ width: "4rem", height: "auto" }}
              alt="support"
            />
            <Typography variant="Large">
              <strong>
                {t("posLandingPage.benefits.details.supportBold")}
              </strong>{" "}
              {t("posLandingPage.benefits.details.support")}
              <br /> {t("posLandingPage.benefits.details.support2")}
              <br /> {t("posLandingPage.benefits.details.support3")}
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage
              src={PaymentsImage}
              style={{ width: "4rem", height: "auto" }}
              alt="payments"
            />
            <Typography variant="Largebold">
              {t("posLandingPage.benefits.details.payments")}
              <br />
              {t("posLandingPage.benefits.details.payments2")}
            </Typography>
          </DetailItems>
        </DetailsSides>
        <DetailsSides style={{ gridArea: "right-side" }}>
          <DetailItems>
            <LazyLoadImage src={InstantMoneyImage} alt="instant money" />
            <Typography variant="Large">
              {t("posLandingPage.benefits.details.instantMoney")}{" "}
              <strong>
                {t("posLandingPage.benefits.details.instantMoneyBold")}
              </strong>{" "}
              {t("posLandingPage.benefits.details.instantMoney2")}
              <br />
              {t("posLandingPage.benefits.details.instantMoney3")}{" "}
              <strong>
                {t("posLandingPage.benefits.details.instantMoneyBold2")}
              </strong>
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage src={TransferImage} alt="bank transfers free" />
            <Typography variant="Large">
              <strong>
                {t("posLandingPage.benefits.details.bankTransferBold")}
              </strong>{" "}
              {t("posLandingPage.benefits.details.bankTransfer")}
              <br />
              {t("posLandingPage.benefits.details.bankTransfer2")}
              <br />
              <strong>
                {t("posLandingPage.benefits.details.bankTransferBold2")}
              </strong>
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage src={FreeDeliveryImage} alt="free delivery" />
            <Typography variant="Large">
              <strong>
                {t("posLandingPage.benefits.details.freeDeliveryBold")}
              </strong>{" "}
              {t("posLandingPage.benefits.details.freeDelivery")}
              <br /> {t("posLandingPage.benefits.details.freeDelivery2")}
            </Typography>
          </DetailItems>
        </DetailsSides>
      </DetailsContainer>
    </>
  );
};
