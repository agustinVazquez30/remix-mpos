import { Login, LoginType } from "./Login";
import { act, fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

const componentProps: LoginType = {
  isUnregisteredUser: false,
  googleLoginFailed: false,
  googleLoginIsLoading: false,
  onContinueWithoutLogin: () => {},
  onLogin: () => {},
  onOTPLogin: () => {},
  onRegister: () => {},
};

describe("< Login />", () => {
  test("should render the component", () => {
    render(<Login {...componentProps} />);

    expect(screen.getByTestId("login-card")).toBeInTheDocument();
  });

  test("should render NotRegistered card if user is not registered and call onContinueWithoutLogin", () => {
    const onContinueWithoutLogin = jest.fn();
    render(
      <Login
        {...componentProps}
        isUnregisteredUser={true}
        onContinueWithoutLogin={onContinueWithoutLogin}
      />
    );

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("login.notRegistered.continueWithPurchase"),
        })
      );
    });

    expect(onContinueWithoutLogin).toHaveBeenCalled();
  });

  test("should render an Alert when Google login fails", () => {
    render(<Login {...componentProps} googleLoginFailed={true} />);

    expect(screen.getByText(t("commons.unknownError"))).toBeInTheDocument();
  });

  test("should have Google login button disabled while loading", async () => {
    const onLoginMock = jest.fn();

    render(
      <Login
        {...componentProps}
        googleLoginIsLoading={true}
        onLogin={onLoginMock}
      />
    );

    const buttons = await screen.findAllByRole("button");

    expect(buttons[0]).toBeDisabled();
  });

  test("should call onLogin when Google login button is clicked", () => {
    const onLoginMock = jest.fn();

    render(<Login {...componentProps} onLogin={onLoginMock} />);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithGoogle") })
      );
    });

    expect(onLoginMock).toHaveBeenCalled();
  });

  test("should call onOTPLogin when OTP login button is clicked", () => {
    const onOTPLogin = jest.fn();

    render(<Login {...componentProps} onOTPLogin={onOTPLogin} />);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithPhoneNumber") })
      );
    });

    expect(onOTPLogin).toHaveBeenCalled();
  });
});
