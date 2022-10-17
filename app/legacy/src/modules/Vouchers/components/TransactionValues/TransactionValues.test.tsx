import { TransactionValues } from "./TransactionValues";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<TransactionValues />", () => {
  test("should render the transaction values", () => {
    const total = 320000000;

    render(
      <TransactionValues
        total={total}
        subTotal={0}
        extraTaxAmount={0}
        taxAmount={0}
      />
    );

    expect(screen.getByText(total)).toBeInTheDocument();
  });
});
