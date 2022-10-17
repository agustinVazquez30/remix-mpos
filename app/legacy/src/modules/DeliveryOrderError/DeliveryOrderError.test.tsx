import { render, t } from "~/legacy/src/utils/tests";
import { DeliveryOrderError } from ".";
import { screen } from "@testing-library/react";

describe("<Discarded />", () => {
  test("Should render elements", () => {
    render(<DeliveryOrderError />);

    expect(screen.queryByTestId("backgroundCloseIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("closeIcon")).toBeInTheDocument();
    expect(
      screen.getByText(t("deliveryOrderError.title.first"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("deliveryOrderError.title.last"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("deliveryOrderError.message.first"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("deliveryOrderError.message.last"))
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: t("commons.writeToSupport") })
    ).toBeInTheDocument();
  });
});
