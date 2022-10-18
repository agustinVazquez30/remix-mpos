import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { PaymentConfirmationLoad } from "./PaymentConfirmation.load";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { newBrazeEvent } from "~/legacy/src/config/Braze";
import { newBrazeRevenueEvent } from "~/legacy/src/config/Braze/utils";

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

jest.mock("~/legacy/src/config/Braze/utils", () => ({
  newBrazeRevenueEvent: jest.fn(),
}));

describe("<PaymentConfirmationLoad />", () => {
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
      render(<PaymentConfirmationLoad />, {
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
    await waitFor(() =>
      render(<PaymentConfirmationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            basicInformation: {
              ...defaultAppState.basicInformation,
              isComplete: true,
            },
          },
        },
      })
    );

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.finish") })
      );
    });

    await waitFor(() => {
      expect(newAmplitudeEvent).toHaveBeenCalled();
      expect(newBrazeEvent).toHaveBeenCalled();
      expect(newBrazeRevenueEvent).toHaveBeenCalled();
      expect(window.location.href).toBe(window.ENV?.REACT_APP_WEB_URL);
    });
  });
});
