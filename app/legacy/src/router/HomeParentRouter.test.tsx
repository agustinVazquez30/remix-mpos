import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { HomeParentRouter } from "./HomeParentRouter";
import { render } from "~/legacy/src/utils/tests";

const setIsHunterMock = jest.fn();

describe("<HomeParentRouter />", () => {
  test("should populate hunter with false", () => {
    render(<HomeParentRouter />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          setIsHunters: setIsHunterMock,
        },
      },
    });

    expect(setIsHunterMock).toHaveBeenCalledWith(false);
  });
});
