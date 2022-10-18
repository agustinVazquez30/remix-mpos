import { BasicInformation, BasicInformationType } from "./BasicInformation";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { defaultAppContext } from "~/legacy/src/contexts/AppContext";

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

describe("<BasicInformation />", () => {
  const userInfo = {
    firstName: "",
    lastName: "",
    phone: {
      countryId: 1,
      countryCode: "+57",
      number: "",
    },
    email: "",
  };

  const componentProps: BasicInformationType = {
    isLogged: false,
    isLoading: false,
    onVerifyCaptcha: () => null,
    showAlreadyExistsModal: false,
    showMposAvailabilityModal: false,
    closeAlreadyExistsModal: () => {},
    closeMposAvailabilityModal: () => {},
    onLogin: () => {},
    setShowLoginErrorModal: () => {},
    showOTPModal: false,
    OTPLoginFailed: false,
    isVerifiedCodeValid: false,
    isLoadingOTP: false,
    closeOTPModal: function (): void {
      throw new Error("Function not implemented.");
    },
    onResendOTPPhone: function (): void {
      throw new Error("Function not implemented.");
    },
    onVerifyOTPCode: function (code: string): void {
      throw new Error("Function not implemented.");
    },
    onVerificationCodeNewUserChange: function (): void {
      throw new Error("Function not implemented.");
    },
    showLoginErrorModal: {
      show: false,
      isDifferentEmail: false,
    },
    ...userInfo,
  };

  test("should show the Spinner", () => {
    render(<BasicInformation {...componentProps} isLoading={true} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("should open the terms and conditions page", async () => {
    render(<BasicInformation {...componentProps} />);

    expect(screen.getByTestId("terms-conditions-link")).toHaveAttribute(
      "href",
      window.ENV?.REACT_APP_TERMS_CONDITIONS_URL
    );
    expect(screen.getByTestId("terms-conditions-link")).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  test("should open the data privacy page", async () => {
    render(<BasicInformation {...componentProps} />);

    expect(screen.getByTestId("data-privacy-link")).toHaveAttribute(
      "href",
      window.ENV?.REACT_APP_DATA_PRIVACY_URL
    );
    expect(screen.getByTestId("data-privacy-link")).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  test("should allow to confirm the information", async () => {
    const mockOnVerifyCaptcha = jest.fn();

    render(
      <BasicInformation
        {...componentProps}
        onVerifyCaptcha={mockOnVerifyCaptcha}
      />
    );

    fillForm("First Name", "Last Name", "3141234567", "test@gmail.com", true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
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

  test("should not allow to confirm the information if the name is not entered", async () => {
    const mockOnVerifyCaptcha = jest.fn();

    render(
      <BasicInformation
        {...componentProps}
        onVerifyCaptcha={mockOnVerifyCaptcha}
      />
    );

    fillForm("", "Last Name", "3141234567", "test@gmail.com", true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
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

  test("should not allow to confirm the information if the phone is invalid", async () => {
    render(<BasicInformation {...componentProps} />);

    fillForm("First Name", "Last Name", "3141234", "test@gmail.com", true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
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

  test("should not allow to confirm the information if the email is invalid", async () => {
    const mockOnVerifyCaptcha = jest.fn();

    render(
      <BasicInformation
        {...componentProps}
        onVerifyCaptcha={mockOnVerifyCaptcha}
      />
    );

    fillForm("First Name", "Last Name", "3141234567", "test", true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", {
          name: t("basicInformation.confirmData"),
        })
      ).not.toBeInTheDocument();
    });
  });

  test("should not allow to confirm the information if the terms and conditions are not accepted", async () => {
    const mockOnVerifyCaptcha = jest.fn();

    render(
      <BasicInformation
        {...componentProps}
        onVerifyCaptcha={mockOnVerifyCaptcha}
      />
    );

    fillForm("First Name", "Last Name", "3141234567", "test@gmail.com", false);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
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

  test('should raise the "onVerifyCaptcha" event', async () => {
    const mockOnVerifyCaptcha = jest.fn();
    const firstName = "First Name";
    const lastName = "Last Name";
    const phone = "3141234567";
    const email = "test@gmail.com";

    render(
      <BasicInformation
        {...componentProps}
        onVerifyCaptcha={mockOnVerifyCaptcha}
      />
    );

    fillForm(firstName, lastName, phone, email, true);

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.confirmData") })
      );
    });

    await waitFor(() => {
      expect(mockOnVerifyCaptcha).toBeCalledWith({
        email,
        firstName,
        lastName,
        phoneNumber: {
          countryId: 1,
          countryCode: "+57",
          number: "3141234567",
        },
      });
    });
  });

  test("should render already register modal", async () => {
    render(
      <BasicInformation {...componentProps} showAlreadyExistsModal={true} />
    );

    expect(screen.getByTestId("already-exists-popup")).toBeInTheDocument();
  });

  test("should close already regiter popup when user close the popup", async () => {
    const mockOnClose = jest.fn();

    render(
      <BasicInformation
        {...componentProps}
        showAlreadyExistsModal={true}
        closeAlreadyExistsModal={mockOnClose}
      />
    );

    const closeButton = screen.getByTestId("already-exists-popup").children[2]
      .children[0];

    act(() => {
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test("should render Maximum Mpos quantity modal", async () => {
    render(
      <BasicInformation {...componentProps} showMposAvailabilityModal={true} />
    );

    expect(
      screen.getByText(t("basicInformation.mposAvailability.title"))
    ).toBeInTheDocument();
  });

  test("should not be disable inputs if user has already purchased an Mpos", async () => {
    const userInfo = {
      firstName: "Testing",
      lastName: "library",
      phone: {
        countryId: 1,
        countryCode: "+57",
        number: "3103333333",
      },
      email: "testing@library.com",
    };

    render(
      <BasicInformation {...componentProps} {...userInfo} isLogged={true} />,
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

    expect(
      screen.getByPlaceholderText(t("basicInformation.nameInput.placeholder"))
    ).not.toBeDisabled();
    expect(
      screen.getByPlaceholderText(
        t("basicInformation.lastNameInput.placeholder")
      )
    ).not.toBeDisabled();
    expect(
      screen.getByPlaceholderText(t("basicInformation.phoneInput.placeholder"))
    ).toBeDisabled();
  });
});

const fillForm = (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  isAcceptedTerms: boolean
) => {
  act(() => {
    fireEvent.change(screen.getByTestId("firstname-input"), {
      target: { value: firstName },
    });

    fireEvent.change(screen.getByTestId("lastname-input"), {
      target: { value: lastName },
    });

    fireEvent.change(screen.getByTestId("phone-input"), {
      target: { value: phone },
    });

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: email },
    });

    isAcceptedTerms && fireEvent.click(screen.getByRole("checkbox"));
  });
};
