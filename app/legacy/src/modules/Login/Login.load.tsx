import { AppContext, LoginPayload } from "~/legacy/src/contexts/AppContext";
import { CountriesIds, getCountry } from "@30sas/web-ui-kit-utils";
import { LoginTypes, PhoneNumber, ROUTES } from "~/legacy/src/constants";

import { useContext, useEffect, useState } from "react";
import { useLoginWithGoogle, useLogout, useQuery } from "~/legacy/src/hooks";
import { Login } from "./Login";
import { addHeaders } from "~/legacy/src/config/Api";
import { getAuth } from "@firebase/auth";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";

export const LoginLoad = () => {
  const auth = getAuth();
  const { navigate } = useAllowedNavigation();
  const { logIn } = useContext(AppContext);
  useContext(AppContext);
  const { isLoading: logoutIsLoading } = useLogout();
  const [isUnregisteredUser, setIsUnregisteredUder] = useState(false);
  const [googleLoginFailed, setGoogleLoginFailed] = useState(false);
  const defaultLoginInfo = {
    uid: "",
    userId: "",
    loginType: LoginTypes.EMAIL,
    idToken: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: {} as PhoneNumber,
  };
  const [loginInfo, setLoginInfo] = useState<LoginPayload>(defaultLoginInfo);

  const onLoginWithGoogle = () => {
    setGoogleLoginFailed(false);
    refetch();
  };

  const { refetch, isLoading: googleLoginIsLoading } = useLoginWithGoogle({
    onSuccess: async ({ user }) => {
      const idToken = (await auth.currentUser?.getIdToken()) || "";

      await addHeaders({
        idToken,
        uid: user.uid || "",
      });

      setLoginInfo({
        ...loginInfo,
        uid: user.uid || "",
        loginType: LoginTypes.EMAIL,
        idToken,
        email: user.email || "",
      });
    },
    onError: () => {
      setGoogleLoginFailed(true);
    },
  });

  const { isLoading: validateUidIsLoading, refetch: validateUid } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: `users/info/${loginInfo?.uid || ""}`,
      headers: {
        authorization: `Bearer ${loginInfo?.idToken || ""}`,
        "user-uid": loginInfo?.uid || "",
        "x-api-key": window.ENV?.REACT_APP_ORCHESTRATOR_KEY || "",
      },
    },
    onSuccess: (response) => {
      if (response) {
        const countryId =
          response.countryId || window.ENV?.REACT_APP_COUNTRY || -1;
        const countryCode =
          getCountry(Number(countryId) as CountriesIds).code || "";
        const phoneNumber: PhoneNumber = {
          countryId,
          countryCode,
          number: response.phone
            ? response.phone?.length > 0 && response.phone?.includes("+")
              ? response.phone.slice(countryCode.length)
              : `${response.phone}`
            : "",
        };

        logIn({
          email: loginInfo.email,
          idToken: loginInfo.idToken || "",
          uid: loginInfo.uid || "",
          userId: response.id || "",
          loginType: LoginTypes.EMAIL,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber,
        });

        setTimeout(() => {
          navigate(ROUTES.STORE_SELECTION, { replace: true });
        }, 100);
      } else {
        setIsUnregisteredUder(true);
        setLoginInfo(defaultLoginInfo);
      }
    },
    onError: () => {
      setIsUnregisteredUder(true);
      setLoginInfo(defaultLoginInfo);
    },
  });

  useEffect(() => {
    loginInfo.uid && validateUid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo]);

  return (
    <Login
      isUnregisteredUser={isUnregisteredUser}
      googleLoginFailed={googleLoginFailed}
      googleLoginIsLoading={
        googleLoginIsLoading || validateUidIsLoading || logoutIsLoading
      }
      onContinueWithoutLogin={() => navigate(ROUTES.BASIC_INFORMATION)}
      onLogin={onLoginWithGoogle}
      onOTPLogin={() => navigate(ROUTES.OTP_LOGIN)}
      onRegister={() => navigate(ROUTES.PURCHASE_ORDER)}
    />
  );
};
