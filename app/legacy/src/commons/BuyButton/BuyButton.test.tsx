import { render, t } from "~/legacy/src/utils/tests";
import { BuyButton } from "./BuyButton";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const mockedHandleBuy = jest.fn();
jest.mock("~/legacy/src/hooks/useGoToBuy", () => ({
  useGoToBuy: () => mockedHandleBuy,
}));

describe("<BuyButton /> Component", () => {
  it("should renders correctly", () => {
    const { getByRole } = render(<BuyButton />);

    expect(
      getByRole("button", { name: t("posLandingPage.buyButton") })
    ).toBeInTheDocument();
  });
  it("should render custom label and className", () => {
    const { getByRole } = render(
      <BuyButton label="my-label" className="my-class" />
    );

    expect(getByRole("button", { name: "my-label" })).toBeInTheDocument();
    expect(getByRole("button", { name: "my-label" })).toHaveClass("my-class");
  });
  it("when press should useGoToBuyHook", async () => {
    const { getByRole } = render(<BuyButton />);

    await userEvent.click(
      getByRole("button", { name: t("posLandingPage.buyButton") })
    ),
      expect(mockedHandleBuy).toHaveBeenCalledWith({ button: "Main" });
  });
});
