import { render, t } from "~/legacy/src/utils/tests";

import { Header } from "./Header";
import { ROUTES } from "~/legacy/src/constants";
import { fireEvent } from "@testing-library/react";
import { useSplitIO } from "~/legacy/src/config/SplitIo";

jest.mock("~/legacy/src/config/SplitIo", () => ({
  useSplitIO: jest.fn(),
  SplitIOTreatmentNames: {
    ActivationBuyInHeader: "Activation_BuyInHeader",
    ActivationVideoLanding: "activation_VideoLanding",
  },
}));

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Header unit tests", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: false,
      loading: false,
    }));
  });
  afterEach(() => {
    (useSplitIO as jest.Mock).mockClear();
  });
  test("should render and snapshot", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-iOdfRm iSTrrv"
      >
        <img
          alt="Treinta"
          class="logo"
          loading="lazy"
          src="treinta.png"
        />
        <div
          class="sc-izDtrv kkuEIv"
          tabindex="1"
        >
          ¿Qué hace único nuestro datáfono?
        </div>
        <div
          class="sc-izDtrv kkuEIv"
          tabindex="2"
        >
          Calcula tu primer venta
        </div>
        <div
          class="sc-izDtrv kkuEIv"
          tabindex="3"
        >
          ¿Algún problema?
        </div>
        <div
          class="right"
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.treintaapp"
            rel="noreferrer"
            target="_blank"
          >
            <svg
              height="40"
              width="134"
            >
              google-play.svg
            </svg>
          </a>
          <button
            class="MuiLoadingButton-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-disableElevation MuiButtonBase-root sc-ipEyDJ gHEgQo css-1p4q9nb-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root"
            data-testid="signin-button"
            tabindex="0"
            type="button"
          >
            <span
              class="MuiButton-startIcon MuiButton-iconSizeMedium css-1d6wzja-MuiButton-startIcon"
            >
              <svg
                height="16"
                width="16"
              >
                user-circle.svg
              </svg>
            </span>
            <p
              class="sc-bcXHqe fRVWtl"
              data-testid="default-typography"
            >
              INGRESAR
            </p>
            <span
              class="MuiButton-endIcon MuiButton-iconSizeMedium css-9tj150-MuiButton-endIcon"
            />
            <span
              class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
            />
          </button>
        </div>
      </div>
    `);
  });
  test("should render default navs items", () => {
    const { getByText, getByTestId } = render(<Header />);

    const nav1 = getByText(t("header.uniqueDataphone"));
    const nav2 = getByText(t("header.calcaulateFirstSale"));
    const nav3 = getByText(t("header.anyProblem"));
    const button = getByTestId("signin-button");

    expect(nav1).toBeInTheDocument();
    expect(nav2).toBeInTheDocument();
    expect(nav3).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test("should render activation video landing item if split return true with 4th place", () => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: true,
      loading: false,
    }));
    const { getByText } = render(<Header />);
    const nav4 = getByText(t("header.activation"));

    expect(nav4.tabIndex).toBe(4);
    expect(nav4).toBeInTheDocument();
  });

  test("navigate to signin should work correctly", () => {
    const { getByTestId } = render(<Header />);

    const button = getByTestId("signin-button");
    fireEvent.click(button);

    expect(mockedUsedNavigate).toBeCalledWith(ROUTES.LOGIN);
  });
});

describe("Header with splitIO on true", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: true,
      loading: false,
    }));
  });
  test("should render buy button", () => {
    const { getByRole } = render(<Header />);

    const button = getByRole("button", {
      name: t("posLandingPage.buyButton"),
      hidden: true,
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockedUsedNavigate).toBeCalledWith(ROUTES.PURCHASE_ORDER);
  });
});
