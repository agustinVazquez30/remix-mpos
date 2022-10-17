import { Alert, Button, InputBase, Typography } from "@30sas/web-ui-kit-core";
import { ContainerPaymentCash, ImgContainer } from "./styles";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import DeliveryMan from "~/legacy/src/assets/delivery-man.png";
import { InfoIcon } from "@30sas/web-ui-kit-icons";
import { LoginTypes } from "~/legacy/src/constants";
import { PaymentDetail } from "../PaymentDetail";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validateCharacterAlphaNumeric } from "~/legacy/src/commons/validations";

type PaymentConfirmationType = {
  mposValue: number;
  mposQuantity: number;
  shippingCost: number;
  shippingTime: number;
  userId: string;
  total: number;
  codeHunder?: string;
  onFinish: (vendorCode?: string) => void;
  isTempCredential?: boolean;
  tempCredLoginType?: LoginTypes | null;
};

export const PaymentStatusCash = ({
  mposValue,
  mposQuantity,
  shippingCost,
  shippingTime,
  total,
  onFinish,
  isTempCredential,
  tempCredLoginType,
}: PaymentConfirmationType) => {
  const { t } = useTranslation();
  const { isHunters, hunter } = useAppContext();
  const [codeHunter, setCodeHunter] = useState(() => hunter.id ?? "");

  const { State: buttonSignIn, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationSignInPostPOS
  );

  return (
    <ContainerPaymentCash>
      <ImgContainer style={{ gridArea: "image" }}>
        <img loading="lazy" src={DeliveryMan} alt="pos" className="pos-image" />
      </ImgContainer>
      <div className="header">
        <Typography variant="XXLargebold" margin="0">
          {t("paymentConfirmation.titlePaymentCash")}
        </Typography>
      </div>
      <div className="spacing">
        <Alert
          Icon={InfoIcon}
          textVariant="Small"
          children={
            <div className="Alert">
              <Typography variant="Medium" margin="0">
                {t("paymentConfirmation.subtitlePaymentCash")}
              </Typography>
            </div>
          }
        />
      </div>
      <PaymentDetail
        mposValue={mposValue}
        mposQuantity={mposQuantity}
        shippingCost={shippingCost}
        shippingTime={shippingTime}
        total={total}
      />
      <div className="ButtonHunter">
        <Typography variant="Mediumbold" margin="0">
          {t("paymentConfirmation.textHunter")}
        </Typography>
        <InputBase
          disabled={isHunters}
          dataTestId="firstname-input"
          placeholder={t("paymentConfirmation.inputHunter")}
          value={codeHunter}
          onChange={(e) =>
            setCodeHunter(validateCharacterAlphaNumeric(e.target.value))
          }
          rounded="md"
        />
      </div>
      <div className="InfoSend">
        <Typography className="header-text" variant="Mediumbold" margin="0">
          {t("paymentConfirmation.localBusinessDays")}
        </Typography>

        <Typography className="header-text" variant="Mediumbold" margin="0">
          {t("paymentConfirmation.businessDays")}
        </Typography>

        {isTempCredential && (
          <div className="newAccountConfirmation">
            <Typography className="header-text" variant="Mediumbold" margin="0">
              {t("paymentConfirmation.registerWithDeviceLabel", {
                device:
                  tempCredLoginType === LoginTypes.EMAIL
                    ? t("commons.loginTypes.email")
                    : t("commons.loginTypes.phone"),
              })}
            </Typography>
          </div>
        )}
      </div>
      <Button
        label={
          buttonSignIn && !loading
            ? t("paymentConfirmation.buttonSignIn")
            : t("commons.finish")
        }
        color="success"
        colorType="600"
        hoverColor="success"
        hoverColorType="500"
        upper={false}
        rounded="xl"
        size="large"
        fullWidth
        textColor="neutrals"
        textColorType="100"
        textVariant="Smallbold"
        variant="primary"
        className="button-finish"
        onClick={() => onFinish(codeHunter)}
      />
    </ContainerPaymentCash>
  );
};
