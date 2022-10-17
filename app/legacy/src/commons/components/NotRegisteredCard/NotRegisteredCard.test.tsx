import { act, fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { LoginTypes } from "~/legacy/src/constants";
import { NotRegisteredCard } from "./NotRegisteredCard";

describe("< NotRegisteredCard />", () => {
  test("should render component with failed email login", () => {
    render(
      <NotRegisteredCard loginType={LoginTypes.EMAIL} onContinue={() => {}} />
    );

    expect(
      screen.getByText(t("login.notRegistered.emailWarning"))
    ).toBeInTheDocument();
  });

  test("should render component with failed OTP login", () => {
    render(
      <NotRegisteredCard loginType={LoginTypes.OTP} onContinue={() => {}} />
    );

    expect(
      screen.getByText(t("login.notRegistered.phoneWarning"))
    ).toBeInTheDocument();
  });

  test("should call onContinue", () => {
    const onContinueMock = jest.fn();
    const { getByRole } = render(
      <NotRegisteredCard
        loginType={LoginTypes.OTP}
        onContinue={onContinueMock}
      />
    );

    act(() => {
      fireEvent.click(
        getByRole("button", {
          name: t("login.notRegistered.continueWithPurchase"),
        })
      );
    });

    expect(onContinueMock).toHaveBeenCalled();
  });
});
