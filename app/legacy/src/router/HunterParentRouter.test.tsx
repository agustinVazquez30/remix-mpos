import { cleanup, screen } from "@testing-library/react";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { HunterParentRouter } from "./HunterParentRouter";
import { render } from "~/legacy/src/utils/tests";
import { useHunterValidation } from "~/legacy/src/hooks/useHunterValidation";

jest.mock("~/legacy/src/hooks/useHunterValidation", () => ({
  useHunterValidation: jest.fn(),
}));

const setIsHunterMock = jest.fn();

describe("<HunterParentRouter />", () => {
  afterEach(cleanup);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should populate hunter with true", () => {
    (useHunterValidation as jest.Mock).mockImplementation(() => ({
      isLoading: true,
    }));
    render(<HunterParentRouter />, {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          setIsHunters: setIsHunterMock,
        },
      },
    });

    expect(setIsHunterMock).toHaveBeenCalledWith(true);
  });

  test("should render full screen spinner by default", () => {
    (useHunterValidation as jest.Mock).mockImplementation(() => ({
      status: "pending",
    }));
    render(<HunterParentRouter />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("should render null if user not founded or error occurs", () => {
    (useHunterValidation as jest.Mock).mockImplementation(() => ({
      isLoading: false,
    }));
    const { container } = render(<HunterParentRouter />);
    expect(container.children.length).toBe(0);
  });
});
