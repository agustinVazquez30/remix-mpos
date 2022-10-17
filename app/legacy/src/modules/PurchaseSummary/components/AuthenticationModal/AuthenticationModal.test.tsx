import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { AuthenticationModal } from "./AuthenticationModal";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<AuthenticationModal />", () => {
  test("should render component", () => {
    render(
      <AuthenticationModal
        showModal={true}
        onClose={() => {}}
        onContinue={() => {}}
        onLogin={() => {}}
      />
    );

    expect(
      screen.getByText(t("purchaseSummary.authenticationModal.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("purchaseSummary.authenticationModal.continueButton"))
    ).toBeInTheDocument();
    expect(screen.getByText(t("commons.yes"))).toBeInTheDocument();
  });

  test("should call onContinue callback", () => {
    const onContinueMock = jest.fn();

    render(
      <AuthenticationModal
        showModal={true}
        onClose={() => {}}
        onContinue={onContinueMock}
        onLogin={() => {}}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("purchaseSummary.authenticationModal.continueButton"),
      })
    );

    expect(onContinueMock).toHaveBeenCalled();
  });

  test("should redirect to Login", () => {
    const onLoginMock = jest.fn();

    render(
      <AuthenticationModal
        showModal={true}
        onClose={() => {}}
        onContinue={() => {}}
        onLogin={onLoginMock}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: t("commons.yes") }));

    expect(onLoginMock).toHaveBeenCalled();
  });
});
