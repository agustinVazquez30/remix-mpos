import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { ROUTES } from "~/legacy/src/constants";
import { RightHeader } from ".";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("<RightHeader />", () => {
  test("should render the first step", () => {
    render(<RightHeader currentStep={ROUTES.BASIC_INFORMATION} />);

    expect(screen.getByText(t("basicInformation.title"))).toBeInTheDocument();
    expect(screen.getByText("Paso 1 de 5")).toBeInTheDocument();
  });

  test("should render the second step", () => {
    render(<RightHeader currentStep={ROUTES.BUSINESS_INFORMATION} />);

    expect(screen.queryByText(t("commons.goBack"))).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.title"))
    ).toBeInTheDocument();
    expect(screen.getByText("Paso 2 de 5")).toBeInTheDocument();
  });

  test("should not render the fifth step", () => {
    render(<RightHeader currentStep={ROUTES.PAYMENT_CONFIRMATION} />);

    expect(
      screen.queryByText(t("paymentConfirmation.title"))
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Paso 5 de 5")).not.toBeInTheDocument();
  });

  test("should navigate to prev step", () => {
    const { getByText } = render(
      <RightHeader currentStep={ROUTES.BUSINESS_INFORMATION} />
    );

    const back = getByText(t("commons.goBack"));
    fireEvent.click(back);

    expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.BASIC_INFORMATION}`, {
      state: {
        origin: "/",
      },
    });
  });
});
