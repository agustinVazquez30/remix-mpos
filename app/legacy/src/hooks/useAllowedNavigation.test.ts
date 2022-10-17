import { ROUTES } from "~/legacy/src/constants";
import { renderHook } from "~/legacy/src/utils/tests";
import { useAllowedNavigation } from "./useAllowedNavigation";
import { useLocation } from "react-router-dom";
import { waitFor } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest.fn(),
}));

describe("useAllowedNavigation", () => {
  beforeEach(() => {
    (useLocation as jest.Mocked<any>).mockImplementation(() => ({
      pathname: ROUTES.BASIC_INFORMATION,
      state: {
        origin: ROUTES.BASIC_INFORMATION,
      },
    }));
  });

  test("return isAllowedNavigation true if location has origin", async () => {
    const { result } = renderHook(() => useAllowedNavigation());

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isAllowedNavigation: true,
        navigate: result.current.navigate,
      });
    });
  });

  test("return isAllowedNavigation true if pathname does not exits", async () => {
    (useLocation as jest.Mocked<any>).mockImplementation(() => ({
      pathname: "/invented-route",
    }));
    const { result } = renderHook(() => useAllowedNavigation());

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isAllowedNavigation: true,
        navigate: result.current.navigate,
      });
    });
  });

  test("return isAllowedNavigation false if location has no origin", async () => {
    (useLocation as jest.Mocked<any>).mockImplementation(() => ({
      pathname: ROUTES.BUSINESS_INFORMATION,
    }));
    const { result } = renderHook(() => useAllowedNavigation());

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        isAllowedNavigation: false,
        navigate: result.current.navigate,
      });
    });
  });

  test("return call useNavigate with origin", async () => {
    const { result } = renderHook(() => useAllowedNavigation());

    result.current.navigate(ROUTES.SHIPMENT_INFORMATION);

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.SHIPMENT_INFORMATION}`,
        { state: { origin: ROUTES.BASIC_INFORMATION } }
      );
    });
  });

  test("return call useNavigate with other navigation options", async () => {
    const { result } = renderHook(() => useAllowedNavigation());

    result.current.navigate(ROUTES.SHIPMENT_INFORMATION, { replace: true });

    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `/${ROUTES.SHIPMENT_INFORMATION}`,
        { replace: true, state: { origin: ROUTES.BASIC_INFORMATION } }
      );
    });
  });
});
