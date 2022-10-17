import { defaultAppContext } from "~/legacy/src/contexts/AppContext";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { renderHook } from "~/legacy/src/utils/tests";
import { useGenericEvent } from "./useGenericEvent";

describe("useGenericEvent", () => {
  test("should populate property isOrganic at user flow", () => {
    const { result } = renderHook(() => useGenericEvent());
    result.current({
      eventName: "",
    });

    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isOrganic: true,
      })
    );

    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.not.objectContaining({
        isHunters: true,
      })
    );
  });
  test("should populate property isHunter at hunters/rockstar flow with hunter context", () => {
    const { result } = renderHook(() => useGenericEvent(), {
      contexts: {
        appContext: {
          ...defaultAppContext,
          hunter: {
            id: "13456789",
          },
        },
      },
    });

    result.current({
      eventName: "",
    });

    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isHunters: true,
      })
    );
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.not.objectContaining({
        isOrganic: true,
      })
    );
  });
  test("should populate property isHunter at hunters/rockstar flow with hunter temporal context", () => {
    const { result } = renderHook(() => useGenericEvent(), {
      contexts: {
        appContext: {
          ...defaultAppContext,
          isHunters: true,
        },
      },
    });

    result.current({
      eventName: "",
    });

    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        isHunters: true,
      })
    );
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      expect.anything(),
      expect.not.objectContaining({
        isOrganic: true,
      })
    );
  });
});
