import { render, t } from "~/legacy/src/utils/tests";

import { PurchaseDetail } from ".";
import { screen } from "@testing-library/react";

describe("<PurchaseDetail />", () => {
  const parameters = {
    mposValue: 50000,
    mposQuantity: 1,
    costOfShipping: 0,
    total: 50500,
    oldPrice: 120000,
  };

  test('should render the purchase detail and "Free" as shipping cost', () => {
    const { mposValue, mposQuantity, costOfShipping, total, oldPrice } =
      parameters;

    render(
      <PurchaseDetail
        mposValue={mposValue}
        mposQuantity={mposQuantity}
        costOfShipping={costOfShipping}
        total={total}
        oldPrice={oldPrice}
      />
    );

    expect(
      screen.getByText(`${t("purchaseSummary.mposValue")} (x${mposQuantity})`)
    ).toBeInTheDocument();
    expect(screen.getByText(mposValue)).toBeInTheDocument();
    expect(screen.getByText("¡GRATIS!")).toBeInTheDocument();
    expect(screen.getByText(total)).toBeInTheDocument();
  });

  test("should render the purchase detail with shipping cost", () => {
    const { mposValue, mposQuantity, total, oldPrice } = parameters;
    const costOfShipping = 5000;

    render(
      <PurchaseDetail
        mposValue={mposValue}
        mposQuantity={mposQuantity}
        costOfShipping={costOfShipping}
        total={total}
        oldPrice={oldPrice}
      />
    );

    expect(screen.getByText(costOfShipping)).toBeInTheDocument();
    expect(screen.queryByText("¡GRATIS!")).not.toBeInTheDocument();
  });
});
