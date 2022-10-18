import * as braze from "@braze/web-sdk";
import { AppContext, LoginPayload } from "~/legacy/src/contexts/AppContext";
import { CountriesIds, getCountry } from "@30sas/web-ui-kit-utils";
import { LoginTypes, PhoneNumber, ROUTES } from "~/legacy/src/constants";
import { useContext, useEffect, useState } from "react";
import { useQuery, useQueryLocation } from "~/legacy/src/hooks";
import Swal from "sweetalert";
import { addHeaders } from "~/legacy/src/config/Api";
import amplitude from "amplitude-js";
import { useNavigate } from "react-router-dom";

interface PayloadToken {
  token: string;
  uid: string;
  email: string;
  userId: string;
  userType: number;
  storeId: string;
  storeName: string;
}

export const Init = (): JSX.Element => {
  const navigate = useNavigate();
  const { logIn } = useContext(AppContext);
  const queryParams = useQueryLocation();
  const data = queryParams.get("data");
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
  const { setStoreInformation } = useContext(AppContext);
  const [dataToken, setDataToken] = useState<PayloadToken>();

  const autoLogin = async () => {
    let decodedToken;
    let base64ToString;
    let receivedData: PayloadToken;

    try {
      decodedToken = decodeURIComponent(data as string);
      base64ToString = window.atob(decodedToken);
      receivedData = JSON.parse(base64ToString);
      setDataToken(receivedData);
    } catch (e) {
      return navigate(ROUTES.ERROR_VERIFYING);
    }

    await addHeaders({
      idToken: receivedData.token || "",
      uid: receivedData.uid || "",
    });

    const infoData = {
      ...loginInfo,
      uid: receivedData.uid || "",
      userId: receivedData.userId || "",
      loginType: LoginTypes.EMAIL,
      idToken: receivedData.token,
      email: receivedData.email || "",
    };
    setLoginInfo(infoData);

    setStoreInformation({
      storeId: receivedData.storeId,
      storeName: receivedData.storeName,
    });
    amplitude.getInstance().setUserId(receivedData.userId ?? "");
    braze.changeUser(receivedData.userId ?? "");
    return infoData;
  };

  useEffect(() => {
    const uid = loginInfo?.uid ?? dataToken?.uid;
    if (uid.length) {
      validateUid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo, dataToken, setDataToken]);

  useEffect(() => {
    if (data) {
      autoLogin();
      return;
    }
    navigate(ROUTES.HOME, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { refetch: validateUid } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: `users/info/${loginInfo?.uid ?? dataToken?.uid}`,
      headers: {
        authorization: `Bearer ${loginInfo?.idToken || ""}`,
        "user-uid": loginInfo?.uid ?? dataToken?.uid,
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
          navigate(ROUTES.PURCHASE_ORDER, { replace: true });
        }, 100);
      } else {
        Swal(
          JSON.stringify({
            key: "else",
            url: `users/info/${loginInfo?.uid ?? dataToken?.uid}`,
            headers: {
              "user-uid": loginInfo?.uid ?? dataToken?.uid,
              "x-api-key": window.ENV?.REACT_APP_ORCHESTRATOR_KEY || "",
            },
          })
        ).then(() => {
          navigate(ROUTES.LOGIN, { replace: true });
        });
      }
    },
    onError: () => {
      Swal(
        JSON.stringify({
          key: "err",
          url: `users/info/${loginInfo?.uid ?? dataToken?.uid}`,
          headers: {
            "user-uid": loginInfo?.uid ?? dataToken?.uid,
            "x-api-key": window.ENV?.REACT_APP_ORCHESTRATOR_KEY || "",
          },
        })
      ).then(() => {
        navigate(ROUTES.LOGIN, { replace: true });
      });
      //setLoginInfo(defaultLoginInfo);
      //navigate(ROUTES.LOGIN, { replace: true });
    },
  });

  return <div data-testid="init" />;
};
