import { AccountTypes, DocumentTypes, ROUTES } from "~/legacy/src/constants";
import { DepositData, DepositDataType } from "./DepositData";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { defaultAppContext } from "~/legacy/src/contexts/AppContext";

const mockedRoute = ROUTES.DEPOSIT_INFORMATION;
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
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

describe("<DepositData />", () => {
  const PROPS: DepositDataType = {
    isLoading: false,
    document: "10617456737",
    bankId: -1,
    bankDescription: "",
    accountNumber: "",
    documentType: DocumentTypes.CC,
    accountType: AccountTypes.SAVINGS_ACCOUNT,
    methodsPaymentType: 1,
    onGoToPay: () => {},
    saveDeliveryDate: (date: string | null) => {},
    isHunter: false,
  };

  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation((key) => ({
      State: mockSplitStates[key] ?? false,
      loading: false,
    }));

    mockSplitStates = {
      [SplitIOTreatmentNames.ActivationDeliveryDate]: false,
      [SplitIOTreatmentNames.ActivationHunterCode]: false,
    };
  });

  test("should show the Spinner", () => {
    render(<DepositData {...PROPS} isLoading={true} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("should allow to confirm the information", async () => {
    render(<DepositData {...PROPS} />);

    fillForm(true, true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("depositData.goToPay") })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: t("commons.confirmData"),
        })
      ).toBeEnabled();
    });
  });

  test("should not allow to confirm the information if the bank is not selected", async () => {
    render(<DepositData {...PROPS} />);

    fillForm(false, true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("depositData.goToPay") })
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", {
          name: t("commons.confirmData"),
        })
      ).not.toBeInTheDocument();
    });
  });

  test("should not allow to confirm the information if the account number is not entered", async () => {
    render(<DepositData {...PROPS} />);

    fillForm(true, false);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("depositData.goToPay") })
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", {
          name: t("commons.confirmData"),
        })
      ).not.toBeInTheDocument();
    });
  });

  test('should raise the "onGoToPay" event', async () => {
    const mockOnGoToPay = jest.fn();

    render(<DepositData {...PROPS} onGoToPay={mockOnGoToPay} />);

    fillForm(true, true);

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
      expect(mockOnGoToPay).toBeCalledWith({
        accountNumber: "123456",
        accountType: AccountTypes.SAVINGS_ACCOUNT,
        bankDescription: "ASOPAGOS S.A.S",
        bankId: 1,
        methodsPayment: "Efectivo",
        methodsPaymentType: 1,
        isHunterImmediatePayment: false,
      });
    });
  });

  test("should redirect to Business Informatio to edit ID", async () => {
    render(<DepositData {...PROPS} />);

    fillForm(true, true);

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.editID")));
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.BUSINESS_INFORMATION}`,
        { state: { origin: ROUTES.DEPOSIT_INFORMATION } }
      )
    );
  });

  test("should enabled all inputs either if user has previous purchase or not", async () => {
    const { container } = render(
      <DepositData
        {...PROPS}
        document={"123"}
        bankId={1}
        bankDescription={"ASOPAGOS S.A.S"}
        accountNumber={"123123"}
        accountType={AccountTypes.SAVINGS_ACCOUNT}
      />,
      {
        contexts: {
          appContext: {
            ...defaultAppContext,
            isLogged: true,
            hasPreviousPurchase: true,
          },
        },
      }
    );
    const inputs = Array.from(container.getElementsByTagName("input"));
    inputs.forEach((input) => {
      expect(input).toBeEnabled();
    });
  });

  test("should display selection date modal", () => {
    mockSplitStates = {
      [SplitIOTreatmentNames.ActivationDeliveryDate]: true,
      [SplitIOTreatmentNames.ActivationHunterCode]: false,
    };

    const mockOnGoToPay = jest.fn();
    render(<DepositData {...PROPS} onGoToPay={mockOnGoToPay} />, {
      contexts: {
        appContext: {
          ...defaultAppContext,
          shipmentInformation: {
            ...defaultAppContext.shipmentInformation,
            cityCode: "11001",
          },
        },
      },
    });

    fillForm(true, true);

    act(() => {
      fireEvent.click(screen.getByText(t("depositData.goToPay")));
    });

    return screen.findByText(t("depositData.dateModal.title"));
  });
});

const fillForm = (fillBank: boolean, fillAccountNumber: boolean) => {
  act(() => {
    if (fillBank) {
      const bankSelector = screen.getByDisplayValue("Selecciona tu banco");

      fireEvent.change(bankSelector, { target: { value: "ASOPAGOS S.A.S" } });
    }

    if (fillAccountNumber) {
      fireEvent.change(screen.getByTestId("accountNumberInput"), {
        target: {
          value: "123456",
        },
      });
    }
  });
};
