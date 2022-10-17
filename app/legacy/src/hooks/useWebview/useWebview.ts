// Just an example of how to build webview url
// Example or dev purposes

import { ERR_URL, WEBVIEW_URL, country } from "./constants";
import { ROUTES } from "~/legacy/src/constants";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useCallback } from "react";

export const __useWebview__ = () => {
  const {
    resetContext,
    basicInformation,
    businessInformation,
    tokens,
    uid,
    loginType,
  } = useAppContext();

  const getWebviewUrl = useCallback(() => {
    try {
      const payload = {
        token: tokens.idToken,
        uid: uid,
        email: basicInformation.email,
        userId: basicInformation.userId,
        storeId: businessInformation.storeId,
        /* istanbul ignore next "phone" o "google"*/
        signInMethod: loginType === "email" ? "google" : "phone",
        firstName: basicInformation.firstName,
        lastName: basicInformation.lastName,
        /* istanbul ignore next */
        phoneNumber: basicInformation.phoneNumber.number && {
          countryId: country.id,
          countryCode: country.code,
          // Trim country code
          number: "3333333333",
        },
      };
      const encodedToken = btoa(JSON.stringify(payload));
      return `${WEBVIEW_URL}${encodeURIComponent(encodedToken)}`;
    } catch (e: any) {
      throw new Error(`${ERR_URL}: ${e}`);
    }
  }, [
    uid,
    loginType,
    tokens.idToken,
    basicInformation.email,
    basicInformation.userId,
    basicInformation.lastName,
    basicInformation.firstName,
    businessInformation.storeId,
    basicInformation.phoneNumber.number,
  ]);

  const navigateWebview = () => {
    if (!tokens.idToken) {
      alert("Tenes que loggearte primero ;)");
      window.location.href = ROUTES.LOGIN;
      return;
    }
    const goTo = getWebviewUrl();
    if (goTo) {
      resetContext();
      sessionStorage.clear();
      window.location.href = goTo;
    } else {
      throw new Error(ERR_URL);
    }
  };

  return { getWebviewUrl, navigateWebview };
};
