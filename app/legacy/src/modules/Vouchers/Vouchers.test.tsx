import { Vouchers, VouchersType } from "./Vouchers";

import { fireEvent, screen } from "@testing-library/react";
import { render } from "~/legacy/src/utils/tests";

const transactionInfo: VouchersType = {
  storeName: "Tiendita Don Pepe",
  storeAddress: "Calle 116 # 7-01 Local 321",
  storeEmail: "donpepe@gmail.com",
  authorizationCode: "548817",
  transactionDate: "29 jul 2021 - 10:25:46",
  paymentMethod: "Datáfono",
  cardType: "1",
  creditCardNumber: "**** **** **** 4319",
  total: 320000000000,
  acqRrn: "",
  extraTaxAmount: 0,
  intallments: 1,
  logoStore: "",
  onGeneratePDF: () => {},
  signatureURL: "",
  status: "",
  subTotal: 0,
  taxAmount: 0,
};

describe("<Vouchers />", () => {
  test("should render the received transaction information", () => {
    render(<Vouchers {...transactionInfo} onGeneratePDF={() => null} />);

    expect(screen.getByText(transactionInfo.storeName)).toBeInTheDocument();
    expect(screen.getByText(transactionInfo.storeAddress)).toBeInTheDocument();
    expect(screen.getByText(transactionInfo.storeEmail)).toBeInTheDocument();
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
    expect(screen.getByText(transactionInfo.total)).toBeInTheDocument();
  });

  test("should raise the onGeneratePDF event", () => {
    const mockOnGeneratePDF = jest.fn();

    render(<Vouchers {...transactionInfo} onGeneratePDF={mockOnGeneratePDF} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Descargar PDF",
      })
    );

    expect(mockOnGeneratePDF).toBeCalledTimes(1);
  });
});
