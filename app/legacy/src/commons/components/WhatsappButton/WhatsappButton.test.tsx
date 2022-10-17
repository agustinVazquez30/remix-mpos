import { DEFAULT_WHATSAPP_SUPPORT_PHONE, ROUTES } from "~/legacy/src/constants";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { render, t } from "~/legacy/src/utils/tests";
import { WhatsappButton } from ".";
import { fireEvent } from "@testing-library/react";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { newBrazeEvent } from "~/legacy/src/config/Braze";
import { useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useLocation: jest.fn(),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

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
      isLogged: true,
    },
  },
};

describe("<WhatsappButton />", () => {
  beforeEach(() => {
    window.open = jest.fn();
    (useLocation as jest.Mocked<any>).mockReturnValue({
      pathname: "/does-not-exist",
    });
  });

  test("should render the Whatsapp button", () => {
    const { getByRole } = render(<WhatsappButton />);

    expect(
      getByRole("button", { name: t("commons.needHelp") })
    ).toBeInTheDocument();
  });

  test("should render the custom Whatsapp button label", () => {
    const label = "test label";
    const { getByRole } = render(<WhatsappButton label={label} />);

    expect(getByRole("button", { name: label })).toBeInTheDocument();
  });

  test("should open new tab with default whatsapp support phone and message", () => {
    const { getByRole } = render(<WhatsappButton />, fakeContexts);

    fireEvent.click(getByRole("button", { name: t("commons.needHelp") }));
    expect(window.open).toHaveBeenLastCalledWith(
      `https://api.whatsapp.com/send?phone=${DEFAULT_WHATSAPP_SUPPORT_PHONE}&text=¡Hola!%20Quiero%20comprar%20un%20datáfono%20pero%20tengo%20unas%20dudas.`
    );
    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosContactCx",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
    expect(newBrazeEvent).not.toHaveBeenCalled();
  });

  test("should open new tab with custom whatsapp support phone", () => {
    const customPhone = "+573010000000";
    const { getByRole } = render(
      <WhatsappButton phone={customPhone} />,
      fakeContexts
    );

    fireEvent.click(getByRole("button", { name: t("commons.needHelp") }));
    expect(window.open).toHaveBeenLastCalledWith(
      `https://api.whatsapp.com/send?phone=${customPhone}&text=¡Hola!%20Quiero%20comprar%20un%20datáfono%20pero%20tengo%20unas%20dudas.`
    );
    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosContactCx",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
    expect(newBrazeEvent).not.toHaveBeenCalled();
  });

  test("should open new tab with default whatsapp support phone and custom message", () => {
    const customMessage = "Hola Treinta Pagos";
    const { getByRole } = render(
      <WhatsappButton message={customMessage} />,
      fakeContexts
    );

    fireEvent.click(getByRole("button", { name: t("commons.needHelp") }));
    expect(window.open).toHaveBeenLastCalledWith(
      `https://api.whatsapp.com/send?phone=${DEFAULT_WHATSAPP_SUPPORT_PHONE}&text=${customMessage.replace(
        /\s/g,
        "%20"
      )}`
    );
    expect(newAmplitudeEvent).toHaveBeenCalledTimes(1);
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosContactCx",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
    expect(newBrazeEvent).not.toHaveBeenCalled();
  });

  test("should open new tab with message for Business Information", () => {
    (useLocation as jest.Mocked<any>).mockReturnValue({
      pathname: ROUTES.BUSINESS_INFORMATION,
    });

    const { getByRole } = render(<WhatsappButton />, fakeContexts);
    fireEvent.click(getByRole("button", { name: t("commons.needHelp") }));

    expect(useLocation).toHaveBeenCalled();
    expect(window.open).toHaveBeenLastCalledWith(
      `https://api.whatsapp.com/send?phone=${DEFAULT_WHATSAPP_SUPPORT_PHONE}&text=¡Hola!%20Quiero%20comprar%20un%20datáfono%20pero%20tengo%20dudas%20en%20el%20paso%20de%20información%20de%20negocio.`
    );
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosHelpsStepStoreInfo"
    );
    expect(newAmplitudeEvent).toHaveBeenCalledWith(
      "WebPagosContactCx",
      expect.objectContaining({
        userId: USER_ID_MATCH,
        phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
        email: EMAIL_MATCH,
      })
    );
    expect(newBrazeEvent).toHaveBeenCalledWith("WebPagosHelpsStepStoreInfo");
  });
});
