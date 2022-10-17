import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { renderHook } from "~/legacy/src/utils/tests";
import { useLogout } from "./useLogout";
import { waitFor } from "@testing-library/react";

jest.mock("@firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

describe("useLogout", () => {
  test("should logout user", async () => {
    const logOutMock = jest.fn();

    const { result } = renderHook(() => useLogout(), {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          isLogged: true,
          logOut: logOutMock,
        },
      },
    });

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isLoading: false,
      });

      expect(logOutMock).toHaveBeenCalled();
    });
  });

  test("should not logout user", async () => {
    const logOutMock = jest.fn();

    const { result } = renderHook(() => useLogout(), {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          isLogged: false,
          logOut: logOutMock,
        },
      },
    });

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isLoading: false,
      });

      expect(logOutMock).not.toHaveBeenCalled();
    });
  });
});
