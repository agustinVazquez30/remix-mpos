import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { DEFAULT_FORMATTED_WHATSAPP_SUPPORT_PHONE } from "~/legacy/src/constants";
import { Footer } from "./Footer";
import { redirect } from "~/legacy/src/utils/redirect";

jest.mock("~/legacy/src/utils/redirect", () => ({
  redirect: jest.fn(),
}));

const helpButtonMock = jest.fn();
const purchaseOrderMock = jest.fn();

const manageYourStore = t("posLandingPage.footer.manageYourStore");
const treintaPC = t("posLandingPage.footer.treintaPC");
const virtualCatalogue = t("posLandingPage.footer.virtualCatalogue");
const provisioning = t("posLandingPage.footer.provisioning");
const extraIncome = t("posLandingPage.footer.extraIncome");
const termsAndConditions = t("posLandingPage.footer.termsAndConditions");
const dataPrivacy = t("posLandingPage.footer.dataPrivacy");

const allowedUrls = [
  { text: manageYourStore, url: "https://www.treinta.co/administra-negocio" },
  { text: treintaPC, url: "https://www.treinta.co/treinta-web" },
  {
    text: virtualCatalogue,
    url: "https://www.treinta.co/catalogo-virtual",
  },
  { text: provisioning, url: "https://www.treinta.co/surte-tu-negocio" },
  { text: extraIncome, url: "https://www.treinta.co/ingresos-extra" },
];

describe("<Footer/>", () => {
  test("should render component", async () => {
    render(<Footer help={helpButtonMock} />);

    allowedUrls.forEach(({ text, url }) => {
      const link = screen.getByText(text);
      fireEvent.click(link);
      expect(redirect).toBeCalledWith(url);
    });

    fireEvent.click(screen.getByText("Ayuda"));
    await waitFor(() => expect(helpButtonMock.mock.calls).toHaveLength(1));

    fireEvent.click(screen.getByText(DEFAULT_FORMATTED_WHATSAPP_SUPPORT_PHONE));
    await waitFor(() => expect(helpButtonMock.mock.calls).toHaveLength(2));
  });
});
