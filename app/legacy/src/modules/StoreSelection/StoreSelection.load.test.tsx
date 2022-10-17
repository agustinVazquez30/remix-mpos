import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { ROUTES } from "~/legacy/src/constants";
import { StoreSelectionLoad } from "./StoreSelection.load";
import { rest } from "msw";

const mockedRoute = ROUTES.STORE_SELECTION;
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

const stores = [
  {
    id: "789",
    name: "My Store",
    userType: 1,
  },
  {
    id: "456",
    name: "My Other Store",
    userType: 1,
  },
  {
    id: "789",
    name: "My Last Store",
    userType: 2,
  },
];

describe("<StoreSelectionLoad />", () => {
  beforeEach(() => {
    server.use(
      rest.get(`${ORCHESTRATOR_URL}/store/user/`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json(stores))
      ),
      rest.get(`${ORCHESTRATOR_URL}/transaction/by-store/`, (req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
      )
    );
  });
  test("Should render", async () => {
    const { getByText } = await waitFor(() => render(<StoreSelectionLoad />));

    expect(getByText(t("storeSelection.placeholder"))).toBeInTheDocument();
  });

  test("Should redirect to Purchase order once store is selected", async () => {
    const { getByTestId, debug } = await waitFor(() =>
      render(<StoreSelectionLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            ...defaultAppActions,
            isLogged: true,
          },
        },
      })
    );

    const storeSelect = screen.getByDisplayValue("Selecciona una tienda");

    setTimeout(() => {
      fireEvent.change(storeSelect, {
        target: { value: stores[1].name },
      });
    }, 500);

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.PURCHASE_ORDER}`, {
        replace: true,
        state: {
          origin: ROUTES.STORE_SELECTION,
        },
      });
    });
  });

  test("Should redirect to Purchase Summary if not logged", async () => {
    render(<StoreSelectionLoad />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          isLogged: false,
        },
      },
    });

    expect(mockedUsedNavigate).toBeCalledWith(ROUTES.HOME, {
      replace: true,
      state: {
        origin: ROUTES.STORE_SELECTION,
      },
    });
  });

  test("Should set previous purchase data", async () => {
    const mockSetMpostPaymentInformation = jest.fn();

    const { getByTestId } = await waitFor(() =>
      render(<StoreSelectionLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            ...defaultAppActions,
            setMPOSPaymentInformation: mockSetMpostPaymentInformation,
            isLogged: true,
          },
        },
      })
    );

    const storeSelect = screen.getByDisplayValue("Selecciona una tienda");

    setTimeout(() => {
      fireEvent.change(storeSelect, {
        target: { value: "My Other Store" },
      });
    }, 500);

    await waitFor(() => {
      expect(mockSetMpostPaymentInformation).toHaveBeenCalledWith({
        purchaseSummary: {
          costOfShipping: 0,
          isComplete: true,
          mposCalculatedTax: 38000,
          mposCostShipping: 0,
          mposProduct: "Datáfono Treinta",
          mposQuantity: 4,
          mposTax: 19,
          mposTotal: 238000,
          mposUnits: 4,
          mposValue: 50000,
          tax: 19,
          taxValue: 38000,
          total: 238000,
        },
      });
    });
  });
});

describe("<StoreSelectionLoad /> server errors", () => {
  test("Should redirect to Error Verifying if store selection fails", async () => {
    server.use(
      rest.get(`${ORCHESTRATOR_URL}/store/user/`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    await waitFor(() =>
      render(<StoreSelectionLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            ...defaultAppActions,
            isLogged: true,
          },
        },
      })
    );

    await waitFor(() => {
      expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.ERROR_VERIFYING}`, {
        state: { origin: ROUTES.STORE_SELECTION },
      });
    });
  });
});
