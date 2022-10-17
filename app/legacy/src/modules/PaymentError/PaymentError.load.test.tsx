import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { PaymentErrorLoad } from "./PaymentError.load";
import { ROUTES } from "~/legacy/src/constants";
import { act } from "react-dom/test-utils";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { rest } from "msw";

const mockedUsedNavigate = jest.fn();
const mockedRoute = ROUTES.PAYMENT_ERROR;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

describe("<PaymentErrorLoad />", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        href: "test",
      },
    });
  });

  test("should redirect to Treinta Web on onFinish", async () => {
    render(<PaymentErrorLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          transactionId: "123abc",
          isLogged: true,
        },
      },
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("paymentConfirmation.error.retry"),
        })
      );
    });

    await waitFor(() => {
      expect(window.location.href).toBe(
        `${process.env.REACT_APP_TREINTA_CHECKOUT_URL}/123abc`
      );
    });
  });

  test("should redirect to  Error Verifying if new transaction request fails", async () => {
    server.use(
      rest.put(
        `${ORCHESTRATOR_URL}/transaction/update-multiple`,
        (req, res, ctx) => {
          return res(ctx.status(500));
        }
      )
    );

    render(<PaymentErrorLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          transactionId: "TRANSACTION",
        },
      },
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("paymentConfirmation.error.retry"),
        })
      );
    });

    expect(window.location.href).toEqual(
      `${process.env.REACT_APP_TREINTA_CHECKOUT_URL}/TRANSACTION?=is_temp=true`
    );
  });

  test("should throw a Amplitud event when loaded", () => {
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
            ...defaultAppState.temporalCredentials,
            userId: USER_ID_MATCH,
          },
          isLogged: false,
        },
      },
    };

    render(<PaymentErrorLoad />, fakeContexts);

    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosPaymentRejected",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
  });
});
