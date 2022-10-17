import { Alert, Typography } from "@30sas/web-ui-kit-core";
import { ChatCircleIcon, ClockIcon } from "@30sas/web-ui-kit-icons";
import { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { PhoneNumber } from "~/legacy/src/constants";
import { TreintaCard } from "~/legacy/src/commons/components";
import { VerificationCode } from "~/legacy/src/commons/components/VerificationCode";
import { VerificationCodeInterface } from "../../constants";
import { useTranslation } from "react-i18next";

type VerifyCodeType = {
  isLoading: boolean;
  isVeriyCodeValid: boolean;
  OTPLoginFailed: boolean;
  phoneNumber: PhoneNumber | null;
  onEditPhoneNumber: () => void;
  onResendCode: () => void;
  onVerifyCode: (code: string) => void;
  onVerificationCodeChange: () => void;
};

export const VerifyCode = ({
  isLoading,
  isVeriyCodeValid,
  phoneNumber,
  OTPLoginFailed,
  onEditPhoneNumber,
  onResendCode,
  onVerifyCode,
  onVerificationCodeChange,
}: VerifyCodeType) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(30);
  const [verificationCode, setVerificationCode] =
    useState<VerificationCodeInterface | null>(null);
  const refVerifyCodeButton = useRef<HTMLButtonElement>(null);

  const handleOnResendCode = () => {
    if (timer > 0) return;
    setTimer(30);
    onResendCode();
  };

  useEffect(() => {
    const timeoutInteval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    if (timer === 0) clearInterval(timeoutInteval);

    return () => clearInterval(timeoutInteval);
  }, [timer]);

  useEffect(() => {
    if (verificationCode?.completed) {
      onVerifyCode(verificationCode?.verificationCode || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode]);

  return (
    <TreintaCard
      testId="verifyCode-card"
      title={t("OTPLogin.verifyCode.title")}
      alert={
        !OTPLoginFailed && (
          <Alert
            Icon={ClockIcon}
            textVariant="Small"
            backgroundColor="info"
            backgroundType="100"
            borderColor="info"
            borderType="500"
            children={
              <Typography
                variant="Small"
                color="info"
                colorType="700"
                margin="0 0 0 18px"
              >
                {t("OTPLogin.verifyCode.infoMessage")}
              </Typography>
            }
          />
        )
      }
    >
      <Container isTimerActive={!!timer}>
        <Typography className="subtitle" variant="Medium" margin="0">
          {`${t("OTPLogin.verifyCode.subtitle")} `}
          <strong>{`${phoneNumber?.countryCode} ${phoneNumber?.number} · `}</strong>
          <span className="edit-link" onClick={onEditPhoneNumber}>
            {t("commons.edit")}{" "}
          </span>
        </Typography>
        <VerificationCode
          name="verificationCode"
          className="verification-code"
          disabled={isLoading}
          hasError={OTPLoginFailed}
          isValid={isVeriyCodeValid}
          helperText={t("OTPLogin.verifyCode.warningMessage")}
          onChange={setVerificationCode}
          onEnter={() => refVerifyCodeButton.current?.click()}
          onFocus={onVerificationCodeChange}
        />
        {!!timer && (
          <Typography className="subtitle" variant="Small" margin="0">
            {`${t("OTPLogin.verifyCode.footer")} `}
            <strong>
              {t("OTPLogin.verifyCode.timer", { seconds: timer })}
            </strong>
          </Typography>
        )}

        <div className="footer">
          <div className="footer-action" onClick={handleOnResendCode}>
            <Typography variant="Small" margin="0">
              <ChatCircleIcon height={13} width={13} />
              {t("OTPLogin.verifyCode.resendCode")}
            </Typography>
          </div>
        </div>
      </Container>
    </TreintaCard>
  );
};
