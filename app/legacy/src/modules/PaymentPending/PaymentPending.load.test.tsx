import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PaymentPendingLoad } from "./PaymentPending.load";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";

describe("<PaymentPendingLoad />", () => {
  const purchaseSummary = {
    mposValue: 50000,
    mposQuantity: 2,
    costOfShipping: 1000,
    shippingTime: 5,
    total: 120000,
  };

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "test",
      },
    });
  });

  test("should render requested data", async () => {
    await waitFor(() =>
      render(<PaymentPendingLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            purchaseSummary: {
              ...defaultAppState.purchaseSummary,
              ...purchaseSummary,
            },
          },
        },
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(`${t("paymentConfirmation.mposValue")} (x2)`)
      ).toBeInTheDocument();
      expect(screen.getByText("100000")).toBeInTheDocument();
      expect(screen.getByText("1000")).toBeInTheDocument();
      expect(screen.getByText("120000")).toBeInTheDocument();
    });
  });

  test("should redirect to Treinta Web on onFinish", async () => {
    const mockClearSessionStorage = jest.fn();
    Storage.prototype.clear = mockClearSessionStorage;
    await waitFor(() => render(<PaymentPendingLoad />));

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.finish") })
      );
    });

    await waitFor(() => {
      expect(mockClearSessionStorage).toHaveBeenCalled();
      expect(window.location.href).toBe(window.ENV?.REACT_APP_WEB_URL);
    });
  });

  test("should fires amplitude event once at render with context user info", () => {
    expect.assertions(2);

    const USER_ID_MATCH = "1";
    const COUNTRY_CODE_MATCH = "+54";
    const NUMBER_MATCH = "1234567890";
    const EMAIL_MATCH = "email@treinta.co";

    render(<PaymentPendingLoad />, {
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
          isLogged: true,
        },
      },
    });

    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosPaymentIsPending",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
  });
});
