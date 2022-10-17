import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { PosLandingPage } from "~/legacy/src/modules";
import { ROUTES } from "~/legacy/src/constants";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";

jest.mock("~/legacy/src/config/SplitIo", () => ({
  useSplitIO: jest.fn(),
  SplitIOTreatmentNames: {
    ActivationSecondBuyButton: "activation_SecondBuyButton",
    ActivationVideoLanding: "activation_VideoLanding",
  },
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("<PosLadingPage />", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: false,
      loading: false,
    }));
  });

  test('should render "Tu negocio en tu bolsillo" section', () => {
    render(<PosLandingPage />);

    expect(
      screen.getByText(t("posLandingPage.aboutApp.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.aboutApp.descBold"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("posLandingPage.aboutApp.button"))
    ).toBeInTheDocument();
  });

  test('should be redirect to "/purchase-order" when hit "quiero mi datafono" button', () => {
    const USER_ID_MATCH = "1";
    const COUNTRY_CODE_MATCH = "+54";
    const NUMBER_MATCH = "1234567890";
    const EMAIL_MATCH = "email@treinta.co";
    const fakeContexts = {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          basicInformation: {
            ...defaultAppState.basicInformation,
            userId: USER_ID_MATCH,
            phoneNumber: {
              countryId: 3,
              countryCode: COUNTRY_CODE_MATCH,
              number: NUMBER_MATCH,
            },
            email: EMAIL_MATCH,
          },
          temporalCredentials: {
            ...defaultAppState.temporalCredentials,
            userId: USER_ID_MATCH,
          },
          isLogged: false,
        },
      },
    };

    render(<PosLandingPage />, fakeContexts);

    fireEvent.click(
      screen.getByRole("button", { name: t("posLandingPage.aboutApp.button") })
    );

    expect(newAmplitudeEvent).toHaveBeenCalled();
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosInteresBuying",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
    expect(mockNavigate).toBeCalledWith(ROUTES.PURCHASE_ORDER);
  });
});

describe("PosLandingPage when splitIO is true", () => {
  beforeEach(() => {
    (useSplitIO as jest.Mock).mockImplementation((type) => {
      const treatments = {
        activation_SecondBuyButton: {
          State: true,
          loading: false,
        },
        activation_VideoLanding: {
          State: false,
          loading: false,
        },
      };
      return treatments[type as keyof typeof treatments];
    });
  });

  test('should NOT show "Tu negocio en tu bolsillo" section', () => {
    render(<PosLandingPage />);

    const aboutAppTitle = screen.queryByText(
      t("posLandingPage.aboutApp.title")
    );
    const aboutAppButton = screen.queryByText(
      t("posLandingPage.aboutApp.button")
    );

    expect(aboutAppTitle).toBeNull();
    expect(aboutAppButton).toBeNull();
  });

  test("should show new benefits when Split IO key", () => {
    (useSplitIO as jest.Mock).mockImplementation((key) => ({
      State: false,
      loading: false,
    }));

    render(<PosLandingPage />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          basicInformation: {
            ...defaultAppState.basicInformation,
          },
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationPOSValuesLanding]: true,
          },
        },
      },
    });

    const benefitsTitle = screen.getByText(t("posLandingPage.benefits.title"));

    const benefitsSubtitle = screen.getByText(
      t("posLandingPage.benefits.subtitle")
    );

    const benefitsDescription = screen.getByText(
      t("posLandingPage.benefits.description")
    );

    expect(benefitsTitle).toBeInTheDocument();
    expect(benefitsSubtitle).toBeInTheDocument();
    expect(benefitsDescription).toBeInTheDocument();
  });
});
