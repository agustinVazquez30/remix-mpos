import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { OTPLoginLoad } from "./OTPLogin.load";
import { ROUTES } from "~/legacy/src/constants";
import { rest } from "msw";

const mockedRoute = ROUTES.OTP_LOGIN;
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("@firebase/auth", () => ({
  ...jest.requireActual("@firebase/auth"),
  getAuth: jest.fn(),
  signInWithPhoneNumber: jest.fn(),
  RecaptchaVerifier: jest.fn(),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: () => jest.fn(),
}));

describe("< OTP Login />", () => {
  beforeEach(() => {
    (getAuth as jest.Mocked<any>).mockReturnValue({
      currentUser: {
        getIdToken: jest.fn().mockReturnValue("456def"),
      },
    });
  });

  test("should render the component", () => {
    render(<OTPLoginLoad />);

    expect(screen.getByTestId("sendCode-card")).toBeInTheDocument();
  });

  test("should OTP login successfully", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockResolvedValue({
      confirm: jest.fn().mockResolvedValue({
        user: {
          uid: "123abc",
        },
      }),
    });

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      Array(6)
        .fill(1)
        .forEach((value, index) => {
          fireEvent.change(screen.getByTestId(`input-${index}`), {
            target: { value: Number(value) },
          });
        });
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.STORE_SELECTION}`, {
        replace: true,
        state: {
          origin: ROUTES.OTP_LOGIN,
        },
      })
    );
  });

  test("should show Error Toast if phone validation request fails", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    server.use(
      rest.get(
        `${process.env.REACT_APP_ORCHESTRATOR_URL}/users/phone/validation`,
        (req, res, ctx) => res(ctx.status(500))
      )
    );

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() =>
      expect(screen.getByText(t("commons.unknownError"))).toBeInTheDocument()
    );
  });

  test("should fail phone validation and show Not Registered card and redirect to Basic Information", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    server.use(
      rest.get(
        `${process.env.REACT_APP_ORCHESTRATOR_URL}/users/phone/validation`,
        (req, res, ctx) => res(ctx.status(200), ctx.json(""))
      )
    );

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("login.notRegistered.continueWithPurchase"),
        })
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(t("login.notRegistered.phoneWarning"))
      ).toBeInTheDocument();
      expect(mockedUsedNavigate).toBeCalledWith(
        `/${ROUTES.BASIC_INFORMATION}`,
        {
          state: { origin: ROUTES.OTP_LOGIN },
        }
      );
    });
  });

  test("should fail Code Sending and show Error toast", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockRejectedValue();

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() =>
      expect(screen.getByText(t("commons.unknownError"))).toBeInTheDocument()
    );
  });

  test("should fail Code Verification and show Error toast", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockResolvedValue({
      confirm: jest.fn().mockRejectedValue("Failed"),
    });

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      Array(6)
        .fill(1)
        .forEach((value, index) => {
          fireEvent.change(screen.getByTestId(`input-${index}`), {
            target: { value: Number(value) },
          });
        });
    });

    await waitFor(() =>
      expect(
        screen.getByText(t("OTPLogin.verifyCode.warningMessage"))
      ).toBeInTheDocument()
    );
  });

  test("should show Not Registered card  if user information cannot be retrieved", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockResolvedValue({
      confirm: jest.fn().mockResolvedValue({
        user: {
          uid: "123abc",
        },
      }),
    });

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/info/:uid`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(""));
      })
    );

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      Array(6)
        .fill(1)
        .forEach((value, index) => {
          fireEvent.change(screen.getByTestId(`input-${index}`), {
            target: { value: Number(value) },
          });
        });
    });

    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: t("login.notRegistered.continueWithPurchase"),
        })
      ).toBeInTheDocument()
    );
  });

  test("should show Not Registered card  if user information not found cannot be retrieved", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockResolvedValue({
      confirm: jest.fn().mockResolvedValue({
        user: {
          uid: "123abc",
        },
      }),
    });

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/info/:uid`, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      Array(6)
        .fill(1)
        .forEach((value, index) => {
          fireEvent.change(screen.getByTestId(`input-${index}`), {
            target: { value: Number(value) },
          });
        });
    });

    await waitFor(() =>
      expect(
        screen.getByRole("button", {
          name: t("login.notRegistered.continueWithPurchase"),
        })
      ).toBeInTheDocument()
    );
  });

  test("should return to Send Code card", async () => {
    (RecaptchaVerifier as jest.Mocked<any>).mockImplementation(
      (_1: any, options: { callback: () => void }, _3: any) => ({
        clear: jest.fn(),
        verify: jest.fn().mockImplementation(options.callback),
      })
    );

    (signInWithPhoneNumber as jest.Mocked<any>).mockResolvedValue({
      confirm: jest.fn().mockResolvedValue({
        user: {
          uid: "123abc",
        },
      }),
    });

    render(<OTPLoginLoad />);

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText(t("commons.edit")));
    });

    await waitFor(() =>
      expect(screen.getByText(t("OTPLogin.sendCode.title"))).toBeInTheDocument()
    );
  });
});
