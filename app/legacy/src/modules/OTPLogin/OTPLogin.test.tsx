import { OTPLogin } from "./OTPLogin";
import { OTPLoginSteps } from "./constants";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("< OTPLogin />", () => {
  const phoneNumber = {
    countryId: 1,
    countryCode: "+57",
    number: "3123232232",
  };
  test("should render Send Code Card component", () => {
    render(
      <OTPLogin
        isLoading={false}
        isVeriyCodeValid={false}
        isUnregisteredUser={false}
        OTPLoginFailed={false}
        phoneNumber={phoneNumber}
        step={OTPLoginSteps.SEND_CODE}
        onContinueWithoutLogin={() => {}}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onSendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    expect(screen.getByTestId("sendCode-card")).toBeInTheDocument();
  });

  test("should render Verify Code Card component", () => {
    render(
      <OTPLogin
        isLoading={false}
        isVeriyCodeValid={false}
        isUnregisteredUser={false}
        OTPLoginFailed={false}
        phoneNumber={phoneNumber}
        step={OTPLoginSteps.VERIFY_CODE}
        onContinueWithoutLogin={() => {}}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onSendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    expect(screen.getByTestId("verifyCode-card")).toBeInTheDocument();
  });

  test("should render Not Registered Card", () => {
    render(
      <OTPLogin
        isLoading={false}
        isVeriyCodeValid={false}
        isUnregisteredUser={true}
        OTPLoginFailed={false}
        phoneNumber={phoneNumber}
        step={OTPLoginSteps.VERIFY_CODE}
        onContinueWithoutLogin={() => {}}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onSendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    expect(screen.getByTestId("notRegistered-card")).toBeInTheDocument();
  });
});
