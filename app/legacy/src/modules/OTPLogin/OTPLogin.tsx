import { LoginTypes, PhoneNumber } from "~/legacy/src/constants";
import { SendCode, VerifyCode } from "./components";
import { NotRegisteredCard } from "~/legacy/src/commons/components";
import { OTPLoginSteps } from "./constants";

type OTPLoginType = {
  isLoading: boolean;
  isUnregisteredUser: boolean;
  isVeriyCodeValid: boolean;
  phoneNumber: PhoneNumber | null;
  step: OTPLoginSteps;
  onContinueWithoutLogin: () => void;
  onEditPhoneNumber: () => void;
  onSendCode: (phone: PhoneNumber) => void;
  onResendCode: () => void;
  onVerifyCode: (code: string) => void;
  onVerificationCodeChange: () => void;
  OTPLoginFailed: boolean;
};

export const OTPLogin = ({
  isLoading,
  isUnregisteredUser,
  isVeriyCodeValid,
  phoneNumber,
  step,
  onContinueWithoutLogin,
  onEditPhoneNumber,
  onSendCode,
  onResendCode,
  onVerifyCode,
  onVerificationCodeChange,
  OTPLoginFailed,
}: OTPLoginType) => {
  const CurrentStep = () => {
    if (isUnregisteredUser) {
      return (
        <NotRegisteredCard
          loginType={LoginTypes.OTP}
          phoneNumber={phoneNumber}
          onEditPhoneNumber={onEditPhoneNumber}
          onContinue={onContinueWithoutLogin}
        />
      );
    }

    switch (step) {
      case OTPLoginSteps.VERIFY_CODE:
        return (
          <VerifyCode
            isLoading={isLoading}
            isVeriyCodeValid={isVeriyCodeValid}
            phoneNumber={phoneNumber}
            OTPLoginFailed={OTPLoginFailed}
            onEditPhoneNumber={onEditPhoneNumber}
            onResendCode={onResendCode}
            onVerifyCode={onVerifyCode}
            onVerificationCodeChange={onVerificationCodeChange}
          />
        );
      case OTPLoginSteps.SEND_CODE:
      default:
        return (
          <SendCode
            onSendCode={onSendCode}
            isLoading={isLoading}
            OTPLoginFailed={OTPLoginFailed}
          />
        );
    }
  };

  return (
    <>
      <CurrentStep />
      <div id="recaptcha" />
    </>
  );
};
