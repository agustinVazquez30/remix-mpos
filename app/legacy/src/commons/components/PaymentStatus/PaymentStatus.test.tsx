import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { LoginTypes } from "~/legacy/src/constants";
import { PaymentStatus } from "./PaymentStatus";
import React from "react";

const NOOP = () => {
  // no op
};

const purchaseData = {
  mposValue: 50000,
  mposQuantity: 1,
  shippingCost: 500,
  shippingTime: 5,
  total: 60000,
  userId: "",
  onFinish: NOOP,
};

describe("<PaymentStatus />", () => {
  test('should render purchase information"', () => {
    render(
      <PaymentStatus {...purchaseData} onFinish={NOOP} status="success" />
    );

    expect(
      screen.getByText(`${t("paymentConfirmation.mposValue")} (x1)`)
    ).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("1 a 7 días")).toBeInTheDocument();
    expect(screen.getByText("60000")).toBeInTheDocument();
  });

  test('should render success variant texts"', () => {
    render(
      <PaymentStatus {...purchaseData} onFinish={NOOP} status="success" />
    );

    expect(screen.getByAltText("Ícono de compra exitosa")).toBeInTheDocument();

    expect(
      screen.getByText(t("paymentConfirmation.successfulPurchase"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.purchaseMessage"))
    ).toBeInTheDocument();
  });
  test('should render pending variant texts"', () => {
    render(
      <PaymentStatus {...purchaseData} onFinish={NOOP} status="pending" />
    );

    expect(
      screen.getByAltText("Ícono de compra pendiente")
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("paymentConfirmation.pendingPurchaseMessage"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("paymentConfirmation.pendingPurchase"))
    ).toBeInTheDocument();
  });

  test('should show call onFinish"', () => {
    const onFinishMock = jest.fn();

    render(
      <PaymentStatus
        mposValue={purchaseData.mposValue}
        mposQuantity={purchaseData.mposQuantity}
        shippingCost={purchaseData.shippingCost}
        shippingTime={purchaseData.shippingTime}
        total={purchaseData.total}
        onFinish={onFinishMock}
        userId={purchaseData.userId}
        status="success"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: t("commons.finish") }));

    expect(onFinishMock).toHaveBeenCalled();
  });

  test("should show the new account confirmation copies when temporal credentail is setup", () => {
    render(
      <PaymentStatus
        {...purchaseData}
        onFinish={NOOP}
        status="success"
        isTempCredential={true}
        tempCredLoginType={LoginTypes.OTP}
      />
    );

    expect(
      screen.getByText(
        t("paymentConfirmation.registerWithDeviceLabel", {
          device: t("commons.loginTypes.phone"),
        })
      )
    ).toBeInTheDocument();
  });
});
