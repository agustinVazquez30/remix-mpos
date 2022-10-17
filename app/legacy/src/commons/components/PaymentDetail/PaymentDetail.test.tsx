import { render, t } from "~/legacy/src/utils/tests";
import { PaymentDetail } from "./PaymentDetail";
import { screen } from "@testing-library/react";

describe("<PaymentDetail />", () => {
  test("should show Payment Detail", () => {
    render(
      <PaymentDetail
        mposValue={50000}
        mposQuantity={1}
        shippingCost={500}
        shippingTime={5}
        total={60000}
      />
    );

    expect(
      screen.getByText(`${t("paymentConfirmation.mposValue")} (x1)`)
    ).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("1 a 7 días")).toBeInTheDocument();
    expect(screen.getByText("60000")).toBeInTheDocument();
  });

  test("should show one day shipping", () => {
    render(
      <PaymentDetail
        mposValue={50000}
        mposQuantity={1}
        shippingCost={500}
        shippingTime={1}
        total={60000}
      />
    );

    expect(screen.getByText("1 día")).toBeInTheDocument();
  });

  test("should show free shipping tag", () => {
    render(
      <PaymentDetail
        mposValue={50000}
        mposQuantity={1}
        shippingCost={0}
        shippingTime={5}
        total={60000}
      />
    );

    expect(screen.getByText("¡GRATIS!")).toBeInTheDocument();
  });
});
