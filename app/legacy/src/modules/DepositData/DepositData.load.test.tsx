import { AccountTypes, MethodPayment, ROUTES } from "~/legacy/src/constants";
import {
  DepositInformationState,
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { DepositDataLoad } from "./DepositData.load";
import { newBrazeRevenueEvent } from "~/legacy/src/config/Braze/utils";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

const bankDescription = "ASOPAGOS S.A.S";
const mockedRoute = ROUTES.DEPOSIT_INFORMATION;
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: () => jest.fn(),
}));

jest.mock("~/legacy/src/config/Braze/utils", () => ({
  newBrazeRevenueEvent: jest.fn(),
}));

jest.mock("~/legacy/src/config/SplitIo", () => ({
  useSplitIO: jest.fn(),
  SplitIOTreatmentNames: {
    ActivationBuyInHeader: "activation_NoLoginPOS",
    ActivationDeliveryDate: "activation_DeliveryDate",
    ActivationHunterCode: "activation_HunterCode",
  },
}));

let mockSplitStates: Record<string, boolean> = {
  [SplitIOTreatmentNames.ActivationDeliveryDate]: false,
  [SplitIOTreatmentNames.ActivationHunterCode]: false,
};

describe("<DepositDataLoad />", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "test",
      },
    });

    (useSplitIO as jest.Mock).mockImplementation((key) => ({
      State: mockSplitStates[key] ?? false,
      loading: false,
    }));

    mockSplitStates = {
      [SplitIOTreatmentNames.ActivationDeliveryDate]: false,
      [SplitIOTreatmentNames.ActivationHunterCode]: false,
    };
  });

  const depositInformation: DepositInformationState = {
    accountNumber: "23234343",
    accountType: AccountTypes.SAVINGS_ACCOUNT,
    bankId: 1,
    bankDescription,
    methodsPaymentType: MethodPayment.ONLINE_PAYMENT,
    methodsPayment: "",
    isComplete: true,
  };

  test("should render the deposit data obtained from the AppState", () => {
    render(<DepositDataLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          depositInformation,
        },
      },
    });

    expect(
      screen.getByDisplayValue(depositInformation.bankDescription)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(depositInformation.accountNumber)
    ).toBeInTheDocument();
  });

  test("should redirect to a Error Verifying if transaction upsert fails", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              isComplete: true,
            },
          },
        },
      })
    );

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/" + ROUTES.ERROR_VERIFYING,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );
  });

  test("should create a transaction an redirect to Treinta Checkout (online payment)", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              methodsPaymentType: MethodPayment.ONLINE_PAYMENT,
              isComplete: true,
            },
            utmParameters: {
              utmSource: "ola",
              utmMedium: "k",
              utmCampaign: "ase?",
            },
          },
        },
      })
    );

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${process.env.REACT_APP_TREINTA_CHECKOUT_URL}/${transactionId}?utm_source=ola&utm_medium=k&utm_campaign=ase?`
      );
    });
  });

  test("should create a transaction an redirect to Treinta Checkout (cash payment)", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
          },
        },
      })
    );

    act(() => {
      const cashPaymentOption = screen.getByRole("radio", {
        name: t("depositData.cashPayment"),
      });
      fireEvent.click(cashPaymentOption);
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );
    expect(newBrazeRevenueEvent).toHaveBeenCalled();
  });

  test("should create a temporal transaction an redirect to Treinta Checkout", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;

    server.use(
      rest.post(`${ORCHESTRATOR_URL}/mpos/tmp-transactions`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(transactionId))
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: false,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              isComplete: true,
            },
          },
        },
      })
    );

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${process.env.REACT_APP_TREINTA_CHECKOUT_URL}/${transactionId}?is_temp=true&utm_source=&utm_medium=&utm_campaign=`
      );
    });
  });

  test("should redirect to error delivery page when Logysto endpoint returns a wrong state", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: false,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            businessInformation: {
              ...defaultAppState.businessInformation,
              isComplete: true,
            },
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
              isHunterImmediatePayment: false,
            },
          },
        },
      })
    );

    act(() => {
      const cashPaymentOption = screen.getByRole("radio", {
        name: t("depositData.cashPayment"),
      });
      fireEvent.click(cashPaymentOption);
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.DELIVERY_ORDER_ERROR}`,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );
  });

  test("should ask delivery date and scheduled order (when split io key IO is true )", async () => {
    const transactionId = "123abc";
    let deliveryDate: Date | null = null;

    let itWasScheduled = false;
    let itWasManaged = false;

    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;
    mockSplitStates[SplitIOTreatmentNames.ActivationDeliveryDate] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          itWasManaged = true;
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: false,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logistics-scheduler/save-order`,
        (req, res, ctx) => {
          itWasScheduled = true;
          return res(ctx.status(200), ctx.json(true));
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
            shipmentInformation: {
              cityCode: "11001",
              ...defaultAppState.shipmentInformation,
            },
            receptionInformation: {
              deliveryDate: new Date(),
              isComplete: true,
            },
            setReceptionInformation: jest.fn().mockImplementation((value) => {
              deliveryDate = value;
            }),
          },
        },
      })
    );

    act(() => {
      const cashPaymentOption = screen.getByRole("radio", {
        name: t("depositData.cashPayment"),
      });
      fireEvent.click(cashPaymentOption);
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    /** Selection delivery date modal */
    await screen.findByText(t("depositData.dateModal.title"));
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("depositData.dateModal.buttonSave"),
        })
      );
    });

    /** Confirm data modal*/
    await waitFor(() =>
      userEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      )
    );

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );

    expect(deliveryDate).toBeDefined();
    expect(itWasManaged).toBeFalsy();
    expect(itWasScheduled).toBeTruthy();
  });

  test("should ask delivery date and send order directly (when split io key IO is true )", async () => {
    const transactionId = "123abc";
    let deliveryDate: Date | null = null;

    let itWasScheduled = false;
    let itWasManaged = false;

    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;
    mockSplitStates[SplitIOTreatmentNames.ActivationDeliveryDate] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          itWasManaged = true;
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logistics-scheduler/save-order`,
        (req, res, ctx) => {
          itWasScheduled = true;
          return res(ctx.status(200), ctx.json(true));
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              isHunterImmediatePayment: false,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
            shipmentInformation: {
              cityCode: "11001",
              ...defaultAppState.shipmentInformation,
            },
            receptionInformation: {
              deliveryDate: null,
              isComplete: true,
            },
            setReceptionInformation: jest.fn().mockImplementation((value) => {
              deliveryDate = value.deliveryDate;
            }),
          },
        },
      })
    );

    act(() => {
      const cashPaymentOption = screen.getByRole("radio", {
        name: t("depositData.cashPayment"),
      });
      fireEvent.click(cashPaymentOption);
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    /** Selection delivery date modal */
    await screen.findByText(t("depositData.dateModal.title"));
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("depositData.dateModal.buttonSkip"),
        })
      );
    });

    /** Confirm data modal*/
    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );

    expect(deliveryDate).toBeNull();
    expect(itWasManaged).toBeTruthy();
    expect(itWasScheduled).toBeFalsy();
  });

  test("should redirect to cash payment without using logysto endpoint when is fake transaction", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);
    let isLogystoUsed = false;

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),

      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          isLogystoUsed = true;
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            shipmentInformation: {
              ...defaultAppState.shipmentInformation,
              address: "test address",
            },
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              isHunterImmediatePayment: false,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
            hunter: {
              id: "asereje",
            },
          },
        },
      })
    );

    act(() => {
      const cashPaymentOption = screen.getByRole("radio", {
        name: t("depositData.cashPayment"),
      });
      fireEvent.click(cashPaymentOption);
    });

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
        {
          state: { origin: ROUTES.DEPOSIT_INFORMATION },
        }
      )
    );

    expect(isLogystoUsed).toBeFalsy();
  });

  test.skip("should ask delivery date (when split io key IO is true )", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);
    let isLogystoUsed = false;

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),

      rest.put(
        `${ORCHESTRATOR_URL}/transaction/update-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          isLogystoUsed = true;
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logistics-scheduler/save-order`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            businessInformation: {
              ...defaultAppState.businessInformation,
              isComplete: true,
            },
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              isHunterImmediatePayment: true,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
            hunter: {
              id: "asereje",
            },
          },
        },
      })
    );

    const cashPaymentOption = screen.getByRole("radio", {
      name: t("depositData.cashPayment"),
    });

    await userEvent.click(cashPaymentOption);

    const goToPayButton = screen.getByRole("button", {
      name: t("depositData.goToPay"),
    });

    await waitFor(() => expect(goToPayButton).toBeEnabled());

    await userEvent.click(goToPayButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      ).toBeEnabled();
    });

    const confirmDataButton = screen.getByRole("button", {
      name: t("commons.confirmData"),
    });

    await userEvent.click(confirmDataButton);
    await waitFor(() =>
      fireEvent.click(confirmDataButton.parentElement as HTMLElement)
    );

    await waitFor(
      () =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
          {
            state: { origin: ROUTES.DEPOSIT_INFORMATION },
          }
        ),
      {
        timeout: 3000,
      }
    );

    expect(isLogystoUsed).toBeFalsy();
  });

  test("should ask delivery date (when split io key IO is true )", async () => {
    const transactionId = "123abc";
    jest.mock("uuid", () => transactionId);

    mockSplitStates[SplitIOTreatmentNames.ActivationHunterCode] = true;
    mockSplitStates[SplitIOTreatmentNames.ActivationDeliveryDate] = true;

    server.use(
      rest.post(
        `${ORCHESTRATOR_URL}/transaction/create-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.put(
        `${ORCHESTRATOR_URL}/transaction/update-multiple`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json([
              {
                id: transactionId,
              },
            ])
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/logystics/create-delivery-order-logysto`,
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              isCreated: true,
            })
          );
        }
      ),
      rest.post(
        `${ORCHESTRATOR_URL}/mpos/enrollment/webhook-by-transaction`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(true));
        }
      )
    );

    await waitFor(() =>
      render(<DepositDataLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            businessInformation: {
              ...defaultAppState.businessInformation,
              isComplete: true,
            },
            depositInformation: {
              ...defaultAppState.depositInformation,
              ...depositInformation,
              methodsPaymentType: MethodPayment.CASH_PAYMENT,
              isComplete: true,
            },
            shipmentInformation: {
              cityCode: "11001",
              ...defaultAppState.shipmentInformation,
            },
          },
        },
      })
    );

    const cashPaymentOption = screen.getByRole("radio", {
      name: t("depositData.cashPayment"),
    });

    await userEvent.click(cashPaymentOption);

    const goToPayButton = screen.getByRole("button", {
      name: t("depositData.goToPay"),
    });

    await waitFor(() => expect(goToPayButton).toBeEnabled());
    await userEvent.click(goToPayButton);

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: t("depositData.dateModal.buttonSave"),
        })
      ).toBeEnabled();
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: t("depositData.dateModal.buttonSkip"),
      })
    );

    const confirmDataButton = screen.getByRole("button", {
      name: t("commons.confirmData"),
    });

    await userEvent.click(confirmDataButton);

    await waitFor(
      () =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          "/" + ROUTES.PAYMENT_CONFIRMATION_CASH,
          {
            state: { origin: ROUTES.DEPOSIT_INFORMATION },
          }
        ),
      {
        timeout: 3000,
      }
    );
  });
});
