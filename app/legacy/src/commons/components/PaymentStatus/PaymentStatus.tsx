import { Button, InputBase, Typography } from "@30sas/web-ui-kit-core";
import { Circle, Container } from "./styles";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { LoginTypes } from "~/legacy/src/constants";
import { PaymentDetail } from "../PaymentDetail";
import TickGreenCircle from "~/legacy/src/assets/tick-circle-green-icon.png";
import Warning from "~/legacy/src/assets/exclamation-warning.png";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { validateCharacterAlphaNumeric } from "~/legacy/src/commons/validations";

type PaymentConfirmationType = {
  mposValue: number;
  mposQuantity: number;
  shippingCost: number;
  shippingTime: number;
  status: "pending" | "success";
  userId: string;
  total: number;
  onFinish: (code?: string) => void;
  isTempCredential?: boolean;
  tempCredLoginType?: LoginTypes | null;
};

export const PaymentStatus = ({
  mposValue,
  mposQuantity,
  shippingCost,
  shippingTime,
  status,
  total,
  onFinish,
  isTempCredential,
  tempCredLoginType,
}: PaymentConfirmationType) => {
  const { isHunters, hunter } = useAppContext();
  const { t } = useTranslation();
  const [codeHunter, setCodeHunter] = useState(() => hunter.id ?? "");
  const isSuccess = status === "success";

  const { State: buttonSignIn, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationSignInPostPOS
  );

  return (
    <Container>
      <Circle variant={status}>
        <img
          loading="lazy"
          src={isSuccess ? TickGreenCircle : Warning}
          alt={
            isSuccess ? "Ícono de compra exitosa" : "Ícono de compra pendiente"
          }
        />
      </Circle>
      <div className="header">
        <Typography variant="XXLargebold" margin="0">
          {isSuccess
            ? t("paymentConfirmation.successfulPurchase")
            : t("paymentConfirmation.pendingPurchase")}
        </Typography>
        <Typography className="header-text" variant="Medium" margin="0">
          {isSuccess
            ? t("paymentConfirmation.purchaseMessage")
            : t("paymentConfirmation.pendingPurchaseMessage")}
        </Typography>
      </div>
      <PaymentDetail
        mposValue={mposValue}
        mposQuantity={mposQuantity}
        shippingCost={shippingCost}
        shippingTime={shippingTime}
        total={total}
      />
      {isSuccess && isTempCredential && (
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
      <Button
        color="success"
        label={
          buttonSignIn && !loading
            ? t("paymentConfirmation.buttonSignIn")
            : t("commons.finish")
        }
        colorType="600"
        hoverColor="success"
        hoverColorType="500"
        upper={false}
        rounded="xl"
        size="medium"
        fullWidth
        textColor="neutrals"
        textColorType="100"
        textVariant="Smallbold"
        variant="primary"
        className="button-finish"
        onClick={() => onFinish(codeHunter)}
      />
    </Container>
  );
};
