import { act, fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { VerificationCode } from "./VerificationCode";

describe("< VerificationCode />", () => {
  test("should render component", () => {
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    expect(screen.getByTestId("verification-code")).toBeInTheDocument();
  });

  test("should call onFocus, set first input to focus when code is invalid and any input is selected", () => {
    const onFocusMock = jest.fn();
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={true}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={() => {}}
        onFocus={onFocusMock}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTestId("input-2"));
    });

    expect(screen.getByTestId("input-0")).toHaveFocus();
    expect(onFocusMock).toHaveBeenCalled();
  });

  test("should call onChange with incomplete verification code and set focus to next input", () => {
    const onChangeMock = jest.fn();
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={onChangeMock}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    const firstInput = screen.getByTestId("input-0");

    act(() => {
      fireEvent.change(firstInput, {
        target: { value: 1 },
      });
    });

    expect(firstInput).toHaveValue(1);
    expect(screen.getByTestId("input-1")).toHaveFocus();
    expect(onChangeMock).toHaveBeenCalledWith({
      verificationCode: "1",
      completed: false,
    });
  });

  test("should call onChange with complete verification code and set focus to last input", () => {
    const onChangeMock = jest.fn();
    const code = "323423";
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={onChangeMock}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    code.split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    code.split("").forEach((value, index) => {
      expect(screen.getByTestId(`input-${index}`)).toHaveValue(Number(value));
    });

    expect(screen.getByTestId("input-5")).toHaveFocus();
    expect(onChangeMock).toHaveBeenCalledWith({
      verificationCode: code,
      completed: true,
    });
  });

  test("should call onEnter when code has length 6 and Enter is pressed", () => {
    const onEnterMock = jest.fn();
    const code = "323423";

    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={onEnterMock}
        onFocus={() => {}}
      />
    );

    code.split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    act(() => {
      fireEvent.keyDown(screen.getByTestId(`input-5`), { key: "Enter" });
    });

    expect(screen.getByTestId("input-5")).toHaveFocus();
    expect(onEnterMock).toHaveBeenCalled();
  });

  test("should set focus on previous input when Backspace is pressed", () => {
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTestId("input-2"));
      fireEvent.keyDown(screen.getByTestId(`input-2`), { key: "Backspace" });
    });

    expect(screen.getByTestId("input-1")).toHaveFocus();
  });

  test("should set focus on next input when Arrow Right is pressed", () => {
    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTestId("input-2"));
      fireEvent.keyDown(screen.getByTestId(`input-2`), { key: "ArrowRight" });
    });

    expect(screen.getByTestId("input-3")).toHaveFocus();
  });

  test("should set focus on next input when Arrow Left is pressed", () => {
    jest.useFakeTimers();

    render(
      <VerificationCode
        name="verificationCode"
        className="verification-code"
        disabled={false}
        hasError={false}
        isValid={false}
        helperText={t("OTPLogin.verifyCode.warningMessage")}
        onChange={() => {}}
        onEnter={() => {}}
        onFocus={() => {}}
      />
    );

    act(() => {
      fireEvent.click(screen.getByTestId("input-2"));
      fireEvent.keyDown(screen.getByTestId(`input-2`), { key: "ArrowLeft" });
    });

    jest.runAllTimers();

    expect(screen.getByTestId("input-1")).toHaveFocus();
  });
});
