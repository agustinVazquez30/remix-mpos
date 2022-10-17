import { advanceTimersByNTimes, render, t } from "~/legacy/src/utils/tests";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { OTPModal } from "./OTPModal";
import { act } from "@testing-library/react-hooks";

const phone = {
  countryId: 1,
  countryCode: "+57",
  number: "3213456768",
};

describe("<OTPModal/>", () => {
  const setup = ({
    OTPLoginFailed = false,
  }: { OTPLoginFailed?: boolean } = {}) => {
    const mockOnClose = jest.fn();
    const mockOnEditPhoneNumber = jest.fn();
    const mockOnResendCode = jest.fn();
    const mockOnVerifyCode = jest.fn();
    const mockOnVerificationCodeChange = jest.fn();

    render(
      <OTPModal
        show={true}
        isLoading={false}
        isVerifiedCodeValid={false}
        OTPLoginFailed={OTPLoginFailed}
        phoneNumber={phone}
        onClose={mockOnClose}
        onEditPhoneNumber={mockOnEditPhoneNumber}
        onResendCode={mockOnResendCode}
        onVerifyCode={mockOnVerifyCode}
        onVerificationCodeChange={mockOnVerificationCodeChange}
      />
    );

    return {
      mockOnClose,
      mockOnResendCode,
      mockOnVerifyCode,
      mockOnEditPhoneNumber,
      mockOnVerificationCodeChange,
    };
  };
  test("timer should works", async () => {
    jest.useFakeTimers();

    const { mockOnResendCode } = setup();

    expect(
      screen.getByText(`${phone?.countryCode} ${phone?.number} ·`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("OTPLogin.verifyCode.footer"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("OTPLogin.verifyCode.infoMessage"))
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(t("OTPLogin.verifyCode.resendCode")));
    expect(mockOnResendCode).not.toHaveBeenCalled();

    advanceTimersByNTimes(10);

    await screen.findByText(
      t("OTPLogin.verifyCode.timer").replace("{{seconds}}", "20")
    );

    advanceTimersByNTimes(10);

    await screen.findByText(
      t("OTPLogin.verifyCode.timer").replace("{{seconds}}", "10")
    );

    advanceTimersByNTimes(10);

    await waitFor(() => {
      const label = screen.queryByText(t("OTPLogin.verifyCode.footer"));
      return expect(label).toBeNull();
    });

    fireEvent.click(screen.getByText(t("OTPLogin.verifyCode.resendCode")));
    expect(mockOnResendCode).toHaveBeenCalled();
  });

  test("should capture and retrieve OTP code", () => {
    const code = "561380";
    const { mockOnVerifyCode } = setup();

    code.split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    expect(mockOnVerifyCode).toHaveBeenCalledWith(code);
  });

  test("should call onVerificationCodeChange when trying focus a OTP input", () => {
    const { mockOnVerificationCodeChange } = setup({ OTPLoginFailed: true });

    act(() => {
      fireEvent.click(screen.getByTestId("input-1"));
    });

    const infoText = screen.queryByText(t("OTPLogin.verifyCode.infoMessage"));
    expect(infoText).toBeFalsy();

    expect(mockOnVerificationCodeChange).toHaveBeenCalled();
  });
});
