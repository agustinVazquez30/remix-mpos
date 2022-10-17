import {
  BasicInformationState,
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { BasicInformationLoad } from ".";

import { ROUTES } from "~/legacy/src/constants";
import { RecaptchaVerifier } from "firebase/auth";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { act } from "react-dom/test-utils";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { newBrazeEvent } from "~/legacy/src/config/Braze";
import { rest } from "msw";

import userEvent from "@testing-library/user-event";

const mockedRoute = ROUTES.BASIC_INFORMATION;
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  RecaptchaVerifier: jest.fn(),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

jest.mock("recaptcha-v3", () => ({
  load: () =>
    Promise.resolve({
      execute: () => "token",
    }),
}));

describe("<BasicInformationLoad />", () => {
  const userInfo: BasicInformationState = {
    userId: "123abc",
    firstName: "First Name",
    lastName: "Last Name",
    email: "test@gmail.com",
    phoneNumber: {
      countryId: 1,
      countryCode: "+57",
      number: "3145678984",
    },
    isComplete: true,
  };

  test("should initialize the RecaptchaVerifier api", () => {
    render(<BasicInformationLoad />);

    expect(window.recaptchaVerifier).not.toBeNull();
  });

  test("should render the user info obtained from the AppState if user is not logged", () => {
    render(<BasicInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          basicInformation: {
            ...defaultAppState.basicInformation,
            ...userInfo,
          },
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
          },
        },
      },
    });

    expect(screen.getByDisplayValue(userInfo.firstName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(userInfo.lastName)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(userInfo.phoneNumber.number)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(userInfo.email)).toBeInTheDocument();
  });

  test("should render the user info obtained from requests if user is already logged", async () => {
    const fetchedUserInfo = {
      firstName: "I am",
      lastName: "A Test",
      email: "test@gmail.com",
      phone: "+573103334455",
    };

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/:userId`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            id: "123abc",
            firstName: fetchedUserInfo.firstName,
            lastName: fetchedUserInfo.lastName,
          })
        )
      ),
      rest.get(`${ORCHESTRATOR_URL}/store/find`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json([
            {
              email: fetchedUserInfo.email,
              phone: fetchedUserInfo.phone,
            },
          ])
        )
      )
    );

    await waitFor(() => {
      render(<BasicInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            basicInformation: {
              ...defaultAppState.basicInformation,
              userId: "123abc",
            },
            isLogged: true,
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });
    });

    await waitFor(() => {
      expect(
        screen.getByDisplayValue(fetchedUserInfo.firstName)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(fetchedUserInfo.lastName)
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(fetchedUserInfo.phone.slice(3))
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(fetchedUserInfo.email)
      ).toBeInTheDocument();
    });
  });

  test("should verify the Recaptcha when user not logged", async () => {
    const mockVerify = jest.fn();
    (RecaptchaVerifier as jest.Mocked<any>).mockReturnValue({
      clear: jest.fn(),
      verify: mockVerify,
    });

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            email: "alreadyRegistered",
          })
        )
      )
    );

    render(<BasicInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          basicInformation: {
            ...defaultAppState.basicInformation,
            isComplete: true,
            userId: "123abc",
            email: "kirhammer@gmail.com",
          },
          isLogged: false,
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
          },
        },
      },
    });

    act(() => {
      fireEvent.change(screen.getByTestId("firstname-input"), {
        target: { value: "First Name" },
      });

      fireEvent.change(screen.getByTestId("lastname-input"), {
        target: { value: "Last Name" },
      });

      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3141234567" },
      });

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "tengocuenta@gmail.com" },
      });

      fireEvent.click(screen.getByRole("checkbox"));
    });

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
      expect(mockVerify).toBeCalledTimes(1);
    });
  });

  test("should redirect to Business Information if user is already logged", async () => {
    await waitFor(() => {
      render(<BasicInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            basicInformation: {
              ...defaultAppState.basicInformation,
              ...userInfo,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("checkbox"));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.confirmData") })
      );
    });

    await waitFor(() => {
      expect(newAmplitudeEvent).toHaveBeenCalled();
      expect(newBrazeEvent).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.BUSINESS_INFORMATION}`,
        { state: { origin: ROUTES.BASIC_INFORMATION } }
      );
    });
  });

  test("should redirect to Business Information if user is not logged, verifying captcha", async () => {
    const mockVerify = jest.fn();
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: mockVerify.mockImplementation(options.callback),
      })
    );

    render(<BasicInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          isLogged: false,
          basicInformation: {
            ...defaultAppState.basicInformation,
            ...userInfo,
            userId: "",
          },
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
          },
        },
      },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.confirmData") })
      );
    });

    await waitFor(() => {
      expect(mockVerify).toHaveBeenCalled();
      expect(newAmplitudeEvent).toHaveBeenCalled();
      expect(newBrazeEvent).toHaveBeenCalled();
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.BUSINESS_INFORMATION}`,
        { state: { origin: ROUTES.BASIC_INFORMATION } }
      );
    });
  });

  test("should show Maximum Mpos availability modal", async () => {
    server.use(
      rest.get(
        `${ORCHESTRATOR_URL}/mpos/enrollment/check-availability/:phoneNumber`,
        (req, res, ctx) => res(ctx.status(200), ctx.json(""))
      )
    );

    await waitFor(() => {
      render(<BasicInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppActions,
            ...defaultAppState,
            isLogged: true,
            basicInformation: {
              ...defaultAppState.basicInformation,
              ...userInfo,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("checkbox"));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.confirmData") })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(t("basicInformation.mposAvailability.title"))
      ).toBeInTheDocument();
    });
  });
});

describe.skip("<BasicInformationLoad /> OTP flow", () => {
  const mockVerify = jest.fn();
  let recaptchaCallback = () => {};
  let flagCreateUser = false;
  let flowHasEnded = false;
  let isValidCode = true;

  (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
    (_: string, data: any) => {
      recaptchaCallback = data.callback;
      return {
        clear: jest.fn(),
        verify: mockVerify,
      };
    }
  );

  beforeEach(() => {
    flagCreateUser = false;
    flowHasEnded = false;

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            email: "alreadyRegistered",
          })
        )
      ),
      rest.post(`${ORCHESTRATOR_URL}/otp/send-code`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            sid: "asdf",
          })
        )
      ),
      rest.post(`${ORCHESTRATOR_URL}/otp/verify-code`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            valid: isValidCode,
          })
        )
      ),
      rest.post(`${ORCHESTRATOR_URL}/users/userPOSByPhone`, (req, res, ctx) => {
        flagCreateUser = true;
        return res(
          ctx.status(200),
          ctx.json({
            uid: "uiduiduid",
          })
        );
      }),
      rest.get(
        `${ORCHESTRATOR_URL}/mpos/enrollment/check-availability`,
        (req, res, ctx) => {
          flowHasEnded = true;
          return res(ctx.status(500), ctx.json({}));
        }
      )
    );

    render(<BasicInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          basicInformation: {
            ...defaultAppState.basicInformation,
            isComplete: true,
            userId: "123abc",
            email: "kirhammer@gmail.com",
          },
          isLogged: false,
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationNoLoginPOS]: true,
          },
        },
      },
    });

    act(() => {
      fireEvent.change(screen.getByTestId("firstname-input"), {
        target: { value: "First Name" },
      });

      fireEvent.change(screen.getByTestId("lastname-input"), {
        target: { value: "Last Name" },
      });

      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3141234567" },
      });

      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "tengocuenta@gmail.com" },
      });

      fireEvent.click(screen.getByRole("checkbox"));
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );
    });

    act(() => {
      recaptchaCallback();
    });
  });

  test("should create user when given otp code is valid", async () => {
    isValidCode = true;

    await userEvent.click(
      screen.getByRole("button", { name: `Confirmar datos` })
    );

    await waitFor(() =>
      expect(
        screen.getByText(t("OTPLogin.verifyCode.infoMessage"))
      ).toBeInTheDocument()
    );

    "123456".split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    await waitFor(() => expect(flowHasEnded).toBeTruthy());

    expect(flagCreateUser).toBeTruthy();
    await waitFor(() =>
      expect(
        screen.queryByText(t("OTPLogin.verifyCode.infoMessage"))
      ).toBeFalsy()
    );
  });

  test("should show error message when gived otp code is invalid", async () => {
    isValidCode = false;

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.confirmData") })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(t("OTPLogin.verifyCode.infoMessage"))
      ).toBeInTheDocument();
    });

    "123456".split("").forEach((value, index) => {
      act(() => {
        fireEvent.change(screen.getByTestId(`input-${index}`), {
          target: { value: Number(value) },
        });
      });
    });

    await screen.findByText(t("OTPLogin.verifyCode.warningMessage"));
  });
});
