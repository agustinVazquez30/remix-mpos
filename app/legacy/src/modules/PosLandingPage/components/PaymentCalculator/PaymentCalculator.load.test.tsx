import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import { act, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PaymentCalculatorLoad } from "./PaymentCalculator.load";
import { ROUTES } from "~/legacy/src/constants";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

describe("<PaymentCalculator />", () => {
  beforeEach(() => {
    server.use(
      rest.get(`${ORCHESTRATOR_URL}/mpos/catalog/states`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              stateCode: "005",
              stateName: "Antioquia",
              countryCode: "Co",
              countryName: "Colombia",
            },
            {
              stateCode: "008",
              stateName: "Atlántico",
              countryCode: "Co",
              countryName: "Colombia",
            },
          ])
        );
      }),
      rest.get(
        `${ORCHESTRATOR_URL}/mpos/catalog/municipalities`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                cityCode: "05001",
                cityName: "Medellín",
                stateCode: "005",
                stateName: "Antioquia",
                countryCode: "Co",
                countryName: "Colombia",
                rateCode: "000014",
                rateIca: 0.00414,
                stateId: "123",
                createdAt: "2022-05-18T20:55:50.000Z",
                updatedAt: "2022-05-18T20:55:50.000Z",
              },
            ])
          );
        }
      )
    );
  });

  test("should render calculated values", async () => {
    render(<PaymentCalculatorLoad />);

    const calculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.calculateMySale"),
    });
    await screen.findByTestId("subOptionDropdown", undefined, {
      timeout: 10000,
    });
    await waitFor(() => expect(calculateButton).not.toBeDisabled());

    const valueInput = screen.getByTestId("valueInput");
    await userEvent.type(valueInput, "10000");

    const IVADropdown = screen.getByRole("button", { name: "Sin IVA" });
    await userEvent.click(IVADropdown);
    act(() => {
      userEvent.click(screen.getByText("IVA 19%"));
    });
    await userEvent.click(calculateButton);

    expect(screen.getByText("$ 1.900")).toBeInTheDocument();
    expect(screen.getByText("$ 299")).toBeInTheDocument();
    expect(screen.getByText("$ 9.701")).toBeInTheDocument();
    expect(screen.getByText("$ 33,53")).toBeInTheDocument();
    expect(screen.getByText("$ 121,5")).toBeInTheDocument();
    expect(screen.getByText("$ 285")).toBeInTheDocument();
    expect(screen.getByText("$ 440,03")).toBeInTheDocument();
    expect(screen.getByText("$ 9.260,97")).toBeInTheDocument();
  });

  test("should render and hide reset steps", async () => {
    render(<PaymentCalculatorLoad />);

    const calculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.calculateMySale"),
    });
    await screen.findByTestId("subOptionDropdown", undefined, {
      timeout: 10000,
    });
    await waitFor(() => expect(calculateButton).not.toBeDisabled());

    const valueInput = screen.getByTestId("valueInput");
    await userEvent.type(valueInput, "10000");

    const IVADropdown = screen.getByRole("button", { name: "Sin IVA" });
    await userEvent.click(IVADropdown);
    act(() => {
      userEvent.click(screen.getByText("IVA 5%"));
    });

    await userEvent.click(calculateButton);

    expect(screen.getByText("$ 500")).toBeInTheDocument();
    expect(screen.getByText("$ 299")).toBeInTheDocument();
    expect(screen.getByText("$ 9.701")).toBeInTheDocument();
    expect(screen.getByText("$ 39,33")).toBeInTheDocument();
    expect(screen.getByText("$ 142,5")).toBeInTheDocument();
    expect(screen.getByText("$ 75")).toBeInTheDocument();
    expect(screen.getByText("$ 256,83")).toBeInTheDocument();
    expect(screen.getByText("$ 9.444,17")).toBeInTheDocument();

    const recalculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.recalculate"),
    });
    await userEvent.click(recalculateButton);
    expect(recalculateButton).not.toBeInTheDocument();
  });

  test("should go to order", async () => {
    render(<PaymentCalculatorLoad />);

    const calculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.calculateMySale"),
    });
    await screen.findByTestId("subOptionDropdown");
    await waitFor(() => expect(calculateButton).not.toBeDisabled());

    await waitFor(() => userEvent.click(calculateButton));

    const orderButton = screen.getByRole("button", {
      name: `¡${t("posLandingPage.saleCalculator.order")}!`,
    });
    await userEvent.click(orderButton);
    expect(mockNavigate).toHaveBeenLastCalledWith(ROUTES.PURCHASE_ORDER);
  });
});
