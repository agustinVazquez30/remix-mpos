import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PaymentError } from "./PaymentError";

describe("<PaymentError />", () => {
  test("should render default values", () => {
    render(<PaymentError isLoading={true} />);

    expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.error.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.error.message.first"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.error.message.middle"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.error.message.last"))
    ).toBeInTheDocument();
  });

  test("should render retry button", () => {
    const handleOnRetry = jest.fn();
    render(<PaymentError isLoading={false} onRetry={handleOnRetry} />);

    const onRetryButton = screen.getByRole("button", {
      name: t("paymentConfirmation.error.retry"),
    });
    expect(onRetryButton).toBeInTheDocument();

    fireEvent.click(onRetryButton);
    expect(handleOnRetry).toHaveBeenCalled();
  });
});
