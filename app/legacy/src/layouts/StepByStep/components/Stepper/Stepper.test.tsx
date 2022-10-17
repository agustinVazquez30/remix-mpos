import { render, t } from "~/legacy/src/utils/tests";

import { ROUTES } from "~/legacy/src/constants";
import { Stepper } from ".";
import { screen } from "@testing-library/react";

describe("<Stepper />", () => {
  test("should render the component with all steps", () => {
    render(<Stepper currentStep={ROUTES.DEPOSIT_INFORMATION} />);

    expect(screen.getByText(t("basicInformation.title"))).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("shipmentInformation.title"))
    ).toBeInTheDocument();
    expect(screen.getByText(t("depositData.title"))).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.title"))
    ).toBeInTheDocument();
    expect(screen.getAllByAltText("tick-circle")).toHaveLength(3);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
