import { advanceTimersByNTimes, render, t } from "~/legacy/src/utils/tests";
import { fireEvent, screen } from "@testing-library/react";
import { VerifyCode } from "./VerifyCode";
import { act } from "@testing-library/react";

describe("< VerifyCode />", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  const phoneNumber = {
    countryId: 1,
    countryCode: "+57",
    number: "3123232232",
  };

  test("should render the component", () => {
    render(
      <VerifyCode
        isLoading={false}
        isVeriyCodeValid={false}
        phoneNumber={phoneNumber}
        OTPLoginFailed={false}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    expect(screen.getByTestId("verifyCode-card")).toBeInTheDocument();
    expect(
      screen.getByText(`${phoneNumber.countryCode} ${phoneNumber.number} ·`)
    ).toBeInTheDocument();
  });

  test("should call onVerifyCode", () => {
    const code = "132423";
    const onVerifyCodeMock = jest.fn();

    render(
      <VerifyCode
        isLoading={false}
        isVeriyCodeValid={false}
        phoneNumber={phoneNumber}
        OTPLoginFailed={false}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onVerifyCode={onVerifyCodeMock}
        onVerificationCodeChange={() => {}}
      />
    );

    code.split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    expect(onVerifyCodeMock).toHaveBeenCalledWith("132423");
  });

  test("should call onResendCode at the correct times", () => {
    const onResendCode = jest.fn();
    render(
      <VerifyCode
        isLoading={false}
        isVeriyCodeValid={false}
        phoneNumber={phoneNumber}
        OTPLoginFailed={false}
        onEditPhoneNumber={() => {}}
        onResendCode={onResendCode}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    const resendButton = screen.getByText(t("OTPLogin.verifyCode.resendCode"));

    expect(
      screen.queryByText(t("OTPLogin.verifyCode.timer", { seconds: 30 }))
    ).toBeInTheDocument();

    advanceTimersByNTimes(29);

    act(() => {
      fireEvent.click(resendButton);
    });

    expect(onResendCode).not.toHaveBeenCalled();

    expect(
      screen.queryByText(t("OTPLogin.verifyCode.timer", { seconds: 1 }))
    ).toBeInTheDocument();

    advanceTimersByNTimes(1);

    act(() => {
      fireEvent.click(resendButton);
    });

    expect(
      screen.queryByText(t("OTPLogin.verifyCode.timer", { seconds: 1 }))
    ).not.toBeInTheDocument();

    expect(onResendCode).toHaveBeenCalled();
  });

  test("should call onEditPhoneNumber", () => {
    const onEditPhoneNumberMock = jest.fn();

    render(
      <VerifyCode
        isLoading={false}
        isVeriyCodeValid={false}
        phoneNumber={phoneNumber}
        OTPLoginFailed={false}
        onEditPhoneNumber={onEditPhoneNumberMock}
        onResendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={() => {}}
      />
    );

    act(() => {
      fireEvent.click(screen.getByText(t("commons.edit")));
    });

    expect(onEditPhoneNumberMock).toHaveBeenCalled();
  });

  test("should call onVerificationCodeChange", () => {
    const onVerificationCodeChangeMock = jest.fn();

    render(
      <VerifyCode
        isLoading={false}
        isVeriyCodeValid={false}
        phoneNumber={phoneNumber}
        OTPLoginFailed={true}
        onEditPhoneNumber={() => {}}
        onResendCode={() => {}}
        onVerifyCode={() => {}}
        onVerificationCodeChange={onVerificationCodeChangeMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTestId("input-1"));
    });

    expect(onVerificationCodeChangeMock).toHaveBeenCalled();
  });
});
