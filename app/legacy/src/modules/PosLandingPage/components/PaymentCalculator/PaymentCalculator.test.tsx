import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import { cleanup, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PaymentCalculator } from "./PaymentCalculator";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

describe("<PaymentCalculator />", () => {
  afterEach(cleanup);
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
                rateIca: 0.005,
                stateId: "123",
                createdAt: "2022-05-18T20:55:50.000Z",
                updatedAt: "2022-05-18T20:55:50.000Z",
              },
              {
                cityCode: "05002",
                cityName: "Abejorral",
                stateCode: "005",
                stateName: "Antioquia",
                countryCode: "Co",
                countryName: "Colombia",
                rateCode: "000007",
                rateIca: 0.0035,
                stateId: "123",
                createdAt: "2022-05-18T20:55:50.000Z",
                updatedAt: "2022-05-18T20:55:50.000Z",
              },
              {
                cityCode: "05004",
                cityName: "Abriaquí",
                stateCode: "005",
                stateName: "Antioquia",
                countryCode: "Co",
                countryName: "Colombia",
                rateCode: "000007",
                rateIca: 0,
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

  test("should render default items for first step", () => {
    const mockFunction = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={true}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
      />
    );

    expect(
      screen.getByText(t("posLandingPage.saleCalculator.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.saleCalculator.calculateFirstSale"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.saleCalculator.saleValue"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.stateAndCity")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.infoReteICA")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: t("posLandingPage.saleCalculator.calculateMySale"),
      })
    ).toBeInTheDocument();
    expect(screen.getByAltText("add")).toBeInTheDocument();
    expect(screen.getByAltText("calculator")).toBeInTheDocument();
  });

  test("should render default items for second step", () => {
    const mockFunction = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={false}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
      />
    );

    expect(
      screen.getByText(t("posLandingPage.saleCalculator.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.saleCalculator.calculateFirstSale"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.saleCalculator.saleValue"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.IVAOf")} 0%:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${t("posLandingPage.saleCalculator.treintasCommission")}:`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.saleBeforeTaxes")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.taxByLaw")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.reteICAWillBe")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${t("posLandingPage.saleCalculator.reteFuenteWillBe")}:`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.reteIVAWillBe")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${t("posLandingPage.saleCalculator.lawsTaxes")}:`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: `¡${t("posLandingPage.saleCalculator.order")}!`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: t("posLandingPage.saleCalculator.recalculate"),
      })
    ).toBeInTheDocument();
    expect(screen.getByAltText("add")).toBeInTheDocument();
    expect(screen.getByAltText("receiveIcon")).toBeInTheDocument();
    expect(screen.getByAltText("beforeTaxesIcon1")).toBeInTheDocument();
    expect(screen.getByAltText("beforeTaxesIcon2")).toBeInTheDocument();
    expect(screen.getByAltText("faqIcon1")).toBeInTheDocument();
    expect(screen.getByAltText("faqIcon2")).toBeInTheDocument();
    expect(screen.getByAltText("faqIcon3")).toBeInTheDocument();
    expect(screen.getByAltText("treintaCommissionIcon")).toBeInTheDocument();
    expect(screen.getByAltText("IVAIcon")).toBeInTheDocument();
  });

  test("should format the value entered", async () => {
    const mockFunction = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={false}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
      />
    );

    const valueInput = screen.getByDisplayValue("$");
    await userEvent.type(valueInput, "1000000");
    expect(valueInput).toHaveValue("$ 1.000.000");
  });

  test("should throw events to press button, first step", async () => {
    const mockFunction = jest.fn();
    const mockCalculate = jest.fn();
    const mockChangeValue = jest.fn();

    render(
      <PaymentCalculator
        enableLocation={true}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockChangeValue}
        onCalculate={mockCalculate}
        onRestart={mockFunction}
      />
    );

    await screen.findByTestId("subOptionDropdown", undefined, {
      timeout: 10000,
    });

    const valueInput = screen.getByTestId("valueInput");
    const calculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.calculateMySale"),
    });

    await waitFor(() => expect(calculateButton).not.toBeDisabled());

    await userEvent.type(valueInput, "1000000");
    await userEvent.click(calculateButton);

    expect(valueInput).toHaveValue("$ 1.000.000");
    expect(mockCalculate).toBeCalledWith(0.5);
    expect(mockChangeValue).toBeCalledWith(1000000);
  });

  test("should throw events to press button, second step", async () => {
    const mockFunction = jest.fn();
    const mockGoToOrder = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={false}
        onChangeIVA={mockFunction}
        goToOrder={mockGoToOrder}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
      />
    );

    const goToOrderButton = screen.getByRole("button", {
      name: `¡${t("posLandingPage.saleCalculator.order")}!`,
    });
    await userEvent.click(goToOrderButton);
    expect(mockGoToOrder).toBeCalled();
  });

  test("should not render letters", async () => {
    const mockFunction = jest.fn();
    const mockChangeValue = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={true}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockChangeValue}
        onCalculate={mockFunction}
        onRestart={mockFunction}
      />
    );

    const valueInput = screen.getByTestId("valueInput");

    await userEvent.type(valueInput, "z65s41asd");
    expect(valueInput).toHaveValue("$ 6.541");
    expect(mockChangeValue).toBeCalledWith(6541);

    await userEvent.type(
      valueInput,
      "{backspace}{backspace}{backspace}{backspace}{backspace}"
    );
    expect(valueInput).toHaveValue("$ ");
    expect(mockChangeValue).toBeCalledWith(0);

    userEvent.type(valueInput, "zsasd");
    expect(valueInput).toHaveValue("$ ");
    expect(mockChangeValue).toBeCalledWith(0);
  });

  test("should render formatted values", () => {
    const mockFunction = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={false}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
        beforeTaxesValue={4000.56}
        treintaCommisionValue={9898989.232324}
        reteICAValue={8.51521}
        reteFuenteValue={145865}
        lawsTaxes={0}
        IVAValue={1235.333}
        reteIVAValue={60}
        receivedValue={45632145}
      />
    );

    expect(screen.getByText("$ 4.000,56")).toBeInTheDocument();
    expect(screen.getByText("$ 9.898.989,232324")).toBeInTheDocument();
    expect(screen.getByText("$ 8,51521")).toBeInTheDocument();
    expect(screen.getByText("$ 145.865")).toBeInTheDocument();
    expect(screen.getByText("$ 0")).toBeInTheDocument();
    expect(screen.getByText("$ 60")).toBeInTheDocument();
    expect(screen.getByText("$ 45.632.145")).toBeInTheDocument();
    expect(screen.getByText("$ 1.235,333")).toBeInTheDocument();
  });

  test("should select location to press buttons, first step", async () => {
    const mockFunction = jest.fn();
    const mockCalculate = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={true}
        onChangeIVA={mockFunction}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockCalculate}
        onRestart={mockFunction}
      />
    );

    const calculateButton = screen.getByRole("button", {
      name: t("posLandingPage.saleCalculator.calculateMySale"),
    });
    await screen.findByTestId("subOptionDropdown");
    await waitFor(() => expect(calculateButton).not.toBeDisabled());

    await waitFor(() =>
      expect(screen.getByText("Antioquia")).toBeInTheDocument()
    );

    await userEvent.click(screen.getByText("Antioquia"));
    await userEvent.click(screen.getByText("Atlántico"));

    await waitFor(() => expect(calculateButton).not.toBeDisabled());
    expect(screen.getByText("Medellín")).toBeInTheDocument();

    const subOptionDropdown = screen.getByRole("button", { name: "Medellín" });
    expect(subOptionDropdown).toBeInTheDocument();

    await userEvent.click(subOptionDropdown);
    await userEvent.click(screen.getByText("Abejorral"));

    await userEvent.click(calculateButton);
    expect(mockCalculate).toBeCalledWith(0.35);
  });

  test("should select IVA", async () => {
    const IVAOptions = [
      {
        id: 0,
        label: "Sin IVA",
        value: 0,
      },
      {
        id: 1,
        label: "IVA 19%",
        value: 19,
      },
    ];

    const mockFunction = jest.fn();
    const mockIVA = jest.fn();
    render(
      <PaymentCalculator
        enableLocation={true}
        onChangeIVA={mockIVA}
        goToOrder={mockFunction}
        onChangeValue={mockFunction}
        onCalculate={mockFunction}
        onRestart={mockFunction}
        IVAOptions={IVAOptions}
        defaultIVAOption={IVAOptions[0]}
      />
    );

    const IVADropdown = screen.getByText("Sin IVA");

    await userEvent.click(IVADropdown);
    await userEvent.click(screen.getByRole("option", { name: "IVA 19%" }));

    expect(mockIVA).toBeCalledWith(19);
  });
});
