import {
  BankList,
  BanksContainer,
  DetailImage,
  DetailItems,
  DetailsContainer,
  DetailsSides,
  PosDetailImg,
  SectionDetails,
} from "./styles";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import BancolombiaImage from "~/legacy/src/assets/pos-landing/bancolombia.png";
import { Benefits } from "./Benefits";
import DaviplataImage from "~/legacy/src/assets/pos-landing/davi-plata.png";
import DaviviendaImage from "~/legacy/src/assets/pos-landing/davivienda.png";
import FreeDeliveryImage from "~/legacy/src/assets/pos-landing/free-delivery.png";
import InstantMoneyImage from "~/legacy/src/assets/pos-landing/instant-money.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NequiImage from "~/legacy/src/assets/pos-landing/nequi.png";
import NoPhoneImage from "~/legacy/src/assets/pos-landing/no-phone.png";
import PaymentsImage from "~/legacy/src/assets/pos-landing/payments.png";
import PosDetailsImage from "~/legacy/src/assets/pos-landing/contactless_mpos.png";
import RedAvalImage from "~/legacy/src/assets/pos-landing/red-aval.png";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import SupportImage from "~/legacy/src/assets/pos-landing/support.png";
import TransferImage from "~/legacy/src/assets/pos-landing/transfer.png";
import { Typography } from "@30sas/web-ui-kit-core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  const { splitIOKeyValue } = useContext(AppContext);

  const showNewBenefits =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationPOSValuesLanding];

  const benefitsSection = showNewBenefits ? (
    <Benefits />
  ) : (
    <>
      <Typography forwardedAs="h2" variant="XXXLargebold" className="title">
        {t("posLandingPage.details.title")}
      </Typography>
      <DetailsContainer>
        <DetailsSides style={{ gridArea: "left-side" }}>
          <DetailItems>
            <LazyLoadImage
              src={NoPhoneImage}
              style={{ width: "4rem", height: "auto" }}
              alt="no phone"
            />
            <Typography variant="Large">
              {t("posLandingPage.details.noPhone")}
              <strong>
                {" "}
                {t("posLandingPage.details.noPhoneBold")}
                <br />
                {t("posLandingPage.details.noPhoneBold2")}
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
              <strong>{t("posLandingPage.details.supportBold")}</strong>{" "}
              {t("posLandingPage.details.support")}
              <br /> {t("posLandingPage.details.support2")}
              <br /> {t("posLandingPage.details.support3")}
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage
              src={PaymentsImage}
              style={{ width: "4rem", height: "auto" }}
              alt="payments"
            />
            <Typography variant="Largebold">
              {t("posLandingPage.details.payments")}
              <br />
              {t("posLandingPage.details.payments2")}
            </Typography>
          </DetailItems>
        </DetailsSides>
        <div style={{ gridArea: "data-phone" }}>
          <DetailImage>
            <PosDetailImg src={PosDetailsImage} alt="pos-details" />
          </DetailImage>
        </div>
        <DetailsSides style={{ gridArea: "right-side" }}>
          <DetailItems>
            <LazyLoadImage src={InstantMoneyImage} alt="instant money" />
            <Typography variant="Large">
              {t("posLandingPage.details.instantMoney")}{" "}
              <strong>{t("posLandingPage.details.instantMoneyBold")}</strong>{" "}
              {t("posLandingPage.details.instantMoney2")}
              <br />
              {t("posLandingPage.details.instantMoney3")}{" "}
              <strong>{t("posLandingPage.details.instantMoneyBold2")}</strong>
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage src={TransferImage} alt="bank transfers free" />
            <Typography variant="Large">
              <strong>{t("posLandingPage.details.bankTransferBold")}</strong>{" "}
              {t("posLandingPage.details.bankTransfer")}
              <br />
              {t("posLandingPage.details.bankTransfer2")}
              <br />
              <strong>{t("posLandingPage.details.bankTransferBold2")}</strong>
            </Typography>
          </DetailItems>
          <DetailItems>
            <LazyLoadImage src={FreeDeliveryImage} alt="free delivery" />
            <Typography variant="Large">
              <strong>{t("posLandingPage.details.freeDeliveryBold")}</strong>{" "}
              {t("posLandingPage.details.freeDelivery")}
              <br /> {t("posLandingPage.details.freeDelivery2")}
            </Typography>
          </DetailItems>
        </DetailsSides>
      </DetailsContainer>
    </>
  );

  return (
    <SectionDetails id={t("anchorTags.aboutAnchor")}>
      {benefitsSection}
      <BanksContainer>
        <Typography variant="Largebold" className="title">
          {t("posLandingPage.details.recieveMoney")}
        </Typography>
        <BankList>
          <LazyLoadImage
            style={{ gridArea: "bancolombia" }}
            src={BancolombiaImage}
            alt="bacolombia"
          />
          <LazyLoadImage
            style={{ gridArea: "davivienda" }}
            src={DaviviendaImage}
            alt="davivienda"
          />
          <LazyLoadImage
            style={{ gridArea: "nequi" }}
            src={NequiImage}
            alt="nequi"
          />
          <LazyLoadImage
            style={{ gridArea: "daviplata" }}
            src={DaviplataImage}
            alt="davi plata"
          />
          <LazyLoadImage
            style={{ gridArea: "red-aval" }}
            src={RedAvalImage}
            alt="red aval"
          />
          <Typography style={{ gridArea: "more" }} variant="Largebold">
            y más...
          </Typography>
        </BankList>
        {showNewBenefits && (
          <Typography variant="Smallbold" className="subtitle">
            {t("posLandingPage.details.recieveMoneyIn30min")}
          </Typography>
        )}
      </BanksContainer>
    </SectionDetails>
  );
};
