import { StoreInfo } from "./StoreInfo";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

const transactionInfo = {
  storeName: "Tiendita Don Pepe",
  storeAddress: "Calle 116 # 7-01 Local 321",
  storeEmail: "donpepe@gmail.com",
};

describe("<StoreInfo />", () => {
  test("should render the store information", () => {
    render(<StoreInfo {...transactionInfo} />);

    expect(screen.getByText(transactionInfo.storeName)).toBeInTheDocument();
    expect(screen.getByText(transactionInfo.storeAddress)).toBeInTheDocument();
    expect(screen.getByText(transactionInfo.storeEmail)).toBeInTheDocument();
  });
});
