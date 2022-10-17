import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { renderHook } from "@testing-library/react-hooks";
import { useGoToBuy } from "./useGoToBuy";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUseNavigate,
}));

describe("useGoToBuy hook", () => {
  it("on press should go to purchase order path", () => {
    const { result } = renderHook(() => useGoToBuy());

    expect(result.current).toBeDefined();
    result.current();

    expect(mockedUseNavigate).toBeCalled();
  });
  it("on press should add custom event args", () => {
    const { result } = renderHook(() => useGoToBuy());
    const customArgs = { custom: "customargs" };

    expect(result.current).toBeDefined();
    result.current(customArgs);

    expect(newAmplitudeEvent).toBeCalled();
    const eventArgs = (newAmplitudeEvent as jest.Mock).mock.calls[0][1];

    expect(eventArgs.custom).toEqual(customArgs.custom);
  });
});
