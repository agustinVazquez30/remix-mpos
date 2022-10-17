import { TransactionInfo, TransactionInfoType } from "./TransactionInfo";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

const transactionInfo: TransactionInfoType = {
  authorizationCode: "548817",
  transactionDate: "29 jul 2021 - 10:25:46",
  paymentMethod: "Datáfono",
  cardType: "1",
  creditCardNumber: "**** **** **** 4319",
  signatureURL: "",
  status: "READY",
  acqRrn: "",
  intallments: 1,
};

describe("<TransactionInfo />", () => {
  test("should render the transaction information", () => {
    render(<TransactionInfo {...transactionInfo} />);

    expect(
      screen.getByText(transactionInfo.authorizationCode)
    ).toBeInTheDocument();
    expect(
      screen.getByText(transactionInfo.transactionDate)
    ).toBeInTheDocument();
    expect(screen.getByText(transactionInfo.paymentMethod)).toBeInTheDocument();
    expect(
      screen.getByText(transactionInfo.creditCardNumber)
    ).toBeInTheDocument();
  });
});
