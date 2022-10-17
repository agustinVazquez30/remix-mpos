import { ROUTES } from "~/legacy/src/constants";

export const ERR_URL = "No se pudo generar la url para el webview";
export const WEBVIEW_URL = `/${ROUTES.PURCHASE_ORDER}?token=`;
export const country = {
  id: 1,
  code: "+57",
};

export const MOCK_GOOGLE_PAYLOAD = {
  userId: "32386235-3562-5564-a235-336333343431",
  email: "agustreinta@gmail.com",
  phoneNumber: "",
  signInMethod: "google",
  firstName: "Chico",
  lastName: "bestia",
};

export const MOCK_PHONE_PAYLOAD = {
  userId: "32386235-3562-5564-a235-336333343431",
  email: "",
  phoneNumber: {
    countryId: country.id,
    countryCode: country.code,
    number: "3333333333",
  },
  signInMethod: "phone",
  firstName: "Chico",
  lastName: "bestia",
};
