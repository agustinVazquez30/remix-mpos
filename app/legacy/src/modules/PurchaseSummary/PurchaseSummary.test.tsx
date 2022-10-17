import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PurchaseSummary } from "./PurchaseSummary";
import { act } from "react-dom/test-utils";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";

describe("<PurchaseSummary />", () => {
  const mposProduct = "MPOS Treinta";
  const noShowLoginPos = false;

  test("should show the Spinner", () => {
    render(
      <PurchaseSummary
        isLoading={true}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={() => null}
        noShowLoginPos={noShowLoginPos}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test('"Continue" button should be enabled', () => {
    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={() => null}
        noShowLoginPos={noShowLoginPos}
      />
    );

    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: t("commons.continue"),
      })
    ).toBeEnabled();
  });

  test("should change the detail when changing the quantity of mpos", () => {
    const newMposQuantity = 2;

    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={() => null}
        noShowLoginPos={noShowLoginPos}
      />
    );

    act(() => {
      const quantityInput = screen.getByTestId("mposQuantity").children[1];

      fireEvent.change(quantityInput, {
        target: {
          value: newMposQuantity,
        },
      });
    });

    expect(
      screen.getByText(
        `${t("purchaseSummary.mposValue")} (x${newMposQuantity})`
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText(100000)).toHaveLength(2);
  });

  test("should show the Authentication Modal", async () => {
    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={() => {}}
        noShowLoginPos={noShowLoginPos}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: t("commons.continue") })
    );

    expect(
      screen.getByText(t("purchaseSummary.authenticationModal.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("purchaseSummary.authenticationModal.continueButton"))
    ).toBeInTheDocument();
    expect(screen.getByText(t("commons.yes"))).toBeInTheDocument();
  });

  test('should raise the "onContinue" event', () => {
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
        },
      },
    };

    const mockOnContinue = jest.fn();

    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={mockOnContinue}
        noShowLoginPos={noShowLoginPos}
      />,
      fakeContexts
    );

    fireEvent.click(
      screen.getByRole("button", { name: t("commons.continue") })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("purchaseSummary.authenticationModal.continueButton"),
      })
    );

    expect(mockOnContinue).toBeCalledWith(
      {
        costOfShipping: 0,
        mposProduct,
        mposQuantity: 1,
        mposValue: 50000,
        total: 50000,
      },
      true
    );

    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosSummaryContinue",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
  });

  test('should not raise the WebPagosSummaryContinue Amplitude event when "onContinue" event was previous selected', () => {
    const fakeContexts = {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          basicInformation: {
            ...defaultAppState.basicInformation,
          },
          hasAcceptedPurchasedOrder: true,
        },
      },
    };

    const mockOnContinue = jest.fn();

    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={mockOnContinue}
        noShowLoginPos={noShowLoginPos}
      />,
      fakeContexts
    );

    fireEvent.click(
      screen.getByRole("button", { name: t("commons.continue") })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("purchaseSummary.authenticationModal.continueButton"),
      })
    );

    expect(newAmplitudeEvent).not.toHaveBeenCalled();
  });
});

describe("PurchaseSummary When split IO is true", () => {
  const mposProduct = "MPOS Treinta";
  const noShowLoginPos = true;

  test('should NOT raise the "onContinue" event', () => {
    const mockOnContinue = jest.fn();

    render(
      <PurchaseSummary
        isLoading={false}
        mposProduct={mposProduct}
        mposQuantity={1}
        mposValue={50000}
        costOfShipping={0}
        onLogin={() => {}}
        onContinue={mockOnContinue}
        noShowLoginPos={noShowLoginPos}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: t("commons.continue") })
    );

    expect(mockOnContinue).not.toBeCalledWith(
      {
        costOfShipping: 0,
        mposProduct,
        mposQuantity: 1,
        mposValue: 50000,
        total: 50000,
      },
      true
    );

    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
  });
});
