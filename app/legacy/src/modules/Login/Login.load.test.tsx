import { ORCHESTRATOR_URL, server } from "~/legacy/src/mocks";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { getAuth, signInWithPopup } from "@firebase/auth";
import { render, t } from "~/legacy/src/utils/tests";

import { LoginLoad } from "./Login.load";
import { ROUTES } from "~/legacy/src/constants";
import { rest } from "msw";

const mockedRoute = ROUTES.LOGIN;
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
  signOut: jest.fn(),
  UserCredential: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

describe("< Login />", () => {
  beforeEach(() => {
    (getAuth as jest.Mocked<any>).mockReturnValue({
      currentUser: {
        getIdToken: jest.fn().mockReturnValue("456def"),
      },
    });
  });

  test("should render the component", () => {
    render(<LoginLoad />);

    expect(screen.getByTestId("login-card")).toBeInTheDocument();
  });

  test("should login with Google successfully", async () => {
    (signInWithPopup as jest.Mocked<any>).mockResolvedValue({
      user: {
        email: "example@gmail.com",
        phoneNumber: "3152322332",
        uid: "123abc",
      },
    });

    render(<LoginLoad />);

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithGoogle") })
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.STORE_SELECTION}`, {
        replace: true,
        state: {
          origin: ROUTES.LOGIN,
        },
      })
    );
  });

  test("should fail Google login and show error alert", async () => {
    (signInWithPopup as jest.Mocked<any>).mockRejectedValueOnce({
      data: "!23123",
    });

    render(<LoginLoad />);

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithGoogle") })
      );
    });

    await waitFor(() =>
      expect(screen.getByText(t("commons.unknownError"))).toBeInTheDocument()
    );
  });

  test("should redirect to Not Registered card", async () => {
    (signInWithPopup as jest.Mocked<any>).mockResolvedValue({
      user: {
        email: "example@gmail.com",
        phoneNumber: "3152322332",
        uid: "123abc",
      },
    });

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/info/:uid`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(""));
      })
    );

    render(<LoginLoad />);

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithGoogle") })
      );
    });

    await waitFor(() =>
      expect(
        screen.getByText(t("login.notRegistered.continueWithPurchase"))
      ).toBeInTheDocument()
    );
  });

  test("should redirect to Not Registered card and redirect to Basic Information for an Unregistered User", async () => {
    (signInWithPopup as jest.Mocked<any>).mockResolvedValue({
      user: {
        email: "example@gmail.com",
        phoneNumber: "3152322332",
        uid: "123abc",
      },
    });

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/users/info/:uid`, (req, res, ctx) => {
        return res(ctx.status(404), ctx.json("Not found"));
      })
    );

    render(<LoginLoad />);

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("login.loginWithGoogle") })
      );
    });

    await waitFor(() => {
      fireEvent.click(
        screen.getByText(t("login.notRegistered.continueWithPurchase"))
      );
    });

    await waitFor(() =>
      expect(mockedUsedNavigate).toBeCalledWith(
        `/${ROUTES.BASIC_INFORMATION}`,
        {
          state: { origin: ROUTES.LOGIN },
        }
      )
    );
  });

  test("should redirect to Purchase Orden", () => {
    render(<LoginLoad />);

    act(() => {
      fireEvent.click(screen.getByText(t("login.continueWithoutLogin")));
    });

    expect(mockedUsedNavigate).toBeCalledWith(`/${ROUTES.PURCHASE_ORDER}`, {
      state: { origin: ROUTES.LOGIN },
    });
  });
});
