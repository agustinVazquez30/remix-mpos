import { act } from "react-dom/test-utils";
import { renderHook } from "~/legacy/src/utils/tests";
import { signInWithPopup } from "@firebase/auth";
import { useLoginWithGoogle } from "./useLoginWithGoogle";
import { waitFor } from "@testing-library/react";

jest.mock("@firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
  UserCredential: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}));

describe("useLoginWithGoogle", () => {
  test("should create provider instances", async () => {
    const { result } = renderHook(() =>
      useLoginWithGoogle({
        onSuccess: () => {},
        onError: () => {},
      })
    );

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isLoading: false,
        refetch: result.current.refetch,
      });
    });
  });

  test("should login successfully", async () => {
    // @ts-ignore
    signInWithPopup.mockResolvedValue("success");
    const onSuccessMock = jest.fn();

    const { result } = renderHook(() =>
      useLoginWithGoogle({
        onSuccess: onSuccessMock,
        onError: () => {},
      })
    );

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current).toStrictEqual({
      isLoading: false,
      refetch: result.current.refetch,
    });
    expect(onSuccessMock).toHaveBeenCalledWith("success");
  });

  test("should fail login", async () => {
    // @ts-ignore
    signInWithPopup.mockRejectedValue("failed");
    const onErrorMock = jest.fn();

    const { result } = renderHook(() =>
      useLoginWithGoogle({
        onSuccess: () => {},
        onError: onErrorMock,
      })
    );

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current).toStrictEqual({
      isLoading: false,
      refetch: result.current.refetch,
    });

    expect(onErrorMock).toHaveBeenLastCalledWith("failed");
  });
});
