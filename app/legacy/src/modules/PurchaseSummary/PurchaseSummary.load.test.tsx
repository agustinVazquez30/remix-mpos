import {
  defaultAppActions,
  defaultAppContext,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { PurchaseSummaryLoad } from ".";
import { ROUTES } from "~/legacy/src/constants";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { newBrazeEvent } from "~/legacy/src/config/Braze";
import { useSplitIO } from "~/legacy/src/config/SplitIo";

const mockedRoute = ROUTES.HOME;
const mockNavigate = jest.fn();
const mockQueryLocation = jest.fn();

jest.mock("~/legacy/src/config/SplitIo", () => ({
  useSplitIO: jest.fn(),
  SplitIOTreatmentNames: { ActivationBuyInHeader: "activation_NoLoginPOS" },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("~/legacy/src/hooks", () => ({
  ...jest.requireActual("~/legacy/src/hooks"),
  useQueryLocation: () => ({
    get: mockQueryLocation,
  }),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

describe("<PurchaseSummaryLoad />", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: false,
      loading: false,
    }));
  });

  test("should render the parameters obtained", async () => {
    await waitFor(() => render(<PurchaseSummaryLoad />));

    await waitFor(() => {
      expect(screen.getByText("MPOS Treinta")).toBeInTheDocument();
      expect(screen.getAllByText(50000)).toHaveLength(2);
    });
  });

  test("should render the mpos quantity obtained from the AppState", async () => {
    const mposQuantity = 2;

    await waitFor(() =>
      render(<PurchaseSummaryLoad />, {
        contexts: {
          appContext: {
            ...defaultAppContext,
            purchaseSummary: {
              ...defaultAppContext.purchaseSummary,
              mposQuantity,
            },
          },
        },
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(`${t("purchaseSummary.mposValue")} (x${mposQuantity})`)
      ).toBeInTheDocument();

      expect(screen.getAllByText(100000)).toHaveLength(2);
      expect(screen.getByText(5000)).toBeInTheDocument();
    });
  });

  test('should navigate to the route "/basic-information when not logged"', async () => {
    await waitFor(() => render(<PurchaseSummaryLoad />));

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("purchaseSummary.authenticationModal.continueButton"),
        })
      );

      expect(newAmplitudeEvent).toHaveBeenCalled();
      expect(newBrazeEvent).toHaveBeenCalled();
      expect(mockNavigate).toBeCalledWith(`/${ROUTES.BASIC_INFORMATION}`, {
        state: { origin: ROUTES.HOME },
      });
    });
  });

  test("should navigate to route /basic-information when logged", async () => {
    mockQueryLocation.mockImplementation((param) => param === "back" && "");

    await waitFor(() =>
      render(<PurchaseSummaryLoad />, {
        contexts: {
          appContext: {
            ...defaultAppContext,
            ...defaultAppActions,
            isLogged: true,
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
      expect(mockNavigate).toBeCalledWith(`/${ROUTES.BASIC_INFORMATION}`, {
        state: { origin: ROUTES.HOME },
      });
    });
  });

  test("should redirect to last completed step on component load for not-logged user", async () => {
    await waitFor(() =>
      render(<PurchaseSummaryLoad />, {
        contexts: {
          appContext: {
            ...defaultAppContext,
            purchaseSummary: {
              ...defaultAppState.purchaseSummary,
              mposQuantity: 2,
              isComplete: true,
            },
            basicInformation: {
              ...defaultAppState.basicInformation,
              isComplete: true,
            },
            businessInformation: {
              ...defaultAppState.businessInformation,
              isComplete: true,
            },
            isLogged: false,
          },
        },
      })
    );

    await waitFor(() =>
      expect(mockNavigate).toBeCalledWith(`/${ROUTES.BUSINESS_INFORMATION}`, {
        state: { origin: ROUTES.HOME },
      })
    );
  });

  test("should stay on Purchase Summary on user return", async () => {
    mockQueryLocation.mockImplementation((param) => param === "back" && "");

    const mposQuantity = 2;

    await waitFor(() =>
      render(<PurchaseSummaryLoad />, {
        contexts: {
          appContext: {
            ...defaultAppContext,
            purchaseSummary: {
              ...defaultAppState.purchaseSummary,
              mposQuantity,
              isComplete: true,
            },
            isLogged: true,
          },
        },
      })
    );

    await waitFor(() =>
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      )
    );

    await waitFor(() => {
      expect(mockQueryLocation).toHaveBeenLastCalledWith("back");
      expect(
        screen.getByText(`${t("purchaseSummary.mposValue")} (x${mposQuantity})`)
      ).toBeInTheDocument();
      expect(screen.getAllByText(100000)).toHaveLength(2);
      expect(screen.getByText(5000)).toBeInTheDocument();
    });
  });

  test("should redirect to Login", async () => {
    const USER_ID_MATCH = "1";
    const COUNTRY_CODE_MATCH = "+54";
    const NUMBER_MATCH = "1234567890";
    const EMAIL_MATCH = "email@treinta.co";
    const fakeContexts = {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          basicInformation: {
            ...defaultAppState.basicInformation,
            userId: USER_ID_MATCH,
            phoneNumber: {
              countryId: 3,
              countryCode: COUNTRY_CODE_MATCH,
              number: NUMBER_MATCH,
            },
            email: EMAIL_MATCH,
          },
          temporalCredentials: {
            userId: USER_ID_MATCH,
            storeId: "",
            userFirebaseId: "",
            isComplete: false,
            loginType: null,
          },
          isLogged: false,
        },
      },
    };

    await waitFor(() => render(<PurchaseSummaryLoad />, fakeContexts));

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.yes"),
        })
      );
    });

    await waitFor(() =>
      expect(mockNavigate).toBeCalledWith(`/${ROUTES.LOGIN}`, {
        state: { origin: ROUTES.HOME },
      })
    );

    expect(newAmplitudeEvent).toHaveBeenNthCalledWith(
      1,
      "WebPagosSummaryContinue",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );

    expect(newAmplitudeEvent).toHaveBeenNthCalledWith(
      2,
      "WebPagosLoggedUser",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
  });
});

describe("PurchaseSummaryLoad When split IO is true", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: true,
      loading: false,
    }));
  });

  test('should navigate to the route "/basic-information" and NOT raise WebPagosSummaryConfirmed event', async () => {
    await waitFor(() =>
      render(<PurchaseSummaryLoad />, {
        contexts: {
          appContext: {
            ...defaultAppContext,
            purchaseSummary: {
              ...defaultAppState.purchaseSummary,
              mposValue: 10,
              mposQuantity: 2,
            },
          },
        },
      })
    );
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: t("commons.continue") })
      ).toBeEnabled();
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });
    expect(newAmplitudeEvent).not.toHaveBeenCalledWith(
      "WebPagosSummaryConfirmed"
    );
    expect(newBrazeEvent).not.toHaveBeenCalledWith("WebPagosSummaryConfirmed");

    expect(mockNavigate).toBeCalledWith(`/${ROUTES.BASIC_INFORMATION}`, {
      state: { origin: ROUTES.HOME },
    });
  });
});
