import { Alert, Popup, Typography } from "@30sas/web-ui-kit-core";
import { ChatCircleIcon, ClockIcon } from "@30sas/web-ui-kit-icons";
import { Container, PopupContent } from "./styles";
import { useEffect, useRef, useState } from "react";
import { PhoneNumber } from "~/legacy/src/constants";
import { TreintaLogoIcon } from "@30sas/web-ui-kit-icons";
import { VerificationCode } from "~/legacy/src/commons/components/VerificationCode";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

type OTPModalProperties = {
  show: boolean;
  isLoading: boolean;
  isVerifiedCodeValid: boolean;
  OTPLoginFailed: boolean;
  phoneNumber: PhoneNumber | null;
  onClose: () => void;
  onEditPhoneNumber: () => void;
  onResendCode: () => void;
  onVerifyCode: (code: string) => void;
  onVerificationCodeChange: () => void;
};

interface VerificationCodeInterface {
  verificationCode: string;
  completed: boolean;
}

const MAX_TIMER_TIME = 30;

export const OTPModal = ({
  show,
  isLoading,
  isVerifiedCodeValid,
  phoneNumber,
  OTPLoginFailed,
  onEditPhoneNumber,
  onResendCode,
  onVerifyCode,
  onVerificationCodeChange,
  onClose,
}: OTPModalProperties) => {
  const { t } = useTranslation();
  const windowSize = useWindowSize();
  const { breakpointsUnits } = useTheme();

  const [timer, setTimer] = useState(MAX_TIMER_TIME);
  const [verificationCode, setVerificationCode] =
    useState<VerificationCodeInterface | null>(null);

  const refVerifyCodeButton = useRef<HTMLButtonElement>(null);

  const handleOnResendCode = () => {
    if (timer > 0) return;
    setTimer(MAX_TIMER_TIME);
    onResendCode();
  };

  useEffect(() => {
    if (show) {
      const timeoutInteval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer === 0) clearInterval(timeoutInteval);

      return () => clearInterval(timeoutInteval);
    } else {
      setTimer(MAX_TIMER_TIME);
    }
  }, [timer, show]);

  useEffect(() => {
    if (
      verificationCode?.completed &&
      verificationCode?.verificationCode?.length
    ) {
      onVerifyCode(verificationCode.verificationCode);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode]);

  useEffect(() => {
    if (OTPLoginFailed) {
      setTimer(0);
    }
  }, [OTPLoginFailed]);

  return (
    <Popup
      open={show}
      onClose={() => onClose()}
      padding="16px"
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
    >
      <PopupContent>
        <Container isTimerActive={!!timer}>
          {!OTPLoginFailed && (
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
          )}
          <TreintaLogoIcon className="logo" height={48} width={148} />
          <Typography className="title" variant="XXLargebold" margin="0">
            {t("OTPLogin.verifyCode.title")}
          </Typography>
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
            isValid={isVerifiedCodeValid}
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
      </PopupContent>
    </Popup>
  );
};
