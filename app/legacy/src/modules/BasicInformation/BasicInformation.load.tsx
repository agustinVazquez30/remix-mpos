import {
  BasicInformationPayload,
  BasicInformationState,
  LoginPayload,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
// import { ConfirmationResult, RecaptchaVerifier, getAuth } from "firebase/auth";
import { CountriesIds, getCountry } from "@30sas/web-ui-kit-utils";
import {
  LoginTypes,
  Origins,
  PhoneNumber,
  ROUTES,
  UserStatus,
  defaultLoginInfo,
} from "~/legacy/src/constants";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  validateUserEmail,
  validateUserOTP,
} from "~/legacy/src/utils/validateUser";
import { BasicInformation } from "./BasicInformation";
import { COUNTRIES } from "@30sas/web-ui-kit-utils";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { TemporalUserData } from "./models";
import { addHeaders } from "~/legacy/src/config/Api";
import { getUUID } from "~/legacy/src/utils/generators";
import { load } from "recaptcha-v3";
import { newDatadogLog } from "~/legacy/src/config/Datadog";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useQuery } from "~/legacy/src/hooks";

const OTP_CHANNEL = "sms";
const OTP_SOURCE = "signinOtp";
const RECAPTCHA_ACTION = "login";
const RECAPTCHA_ERROR = "RecaptchaApiKey is not defined";

export const BasicInformationLoad = () => {
  const {
    isLogged,
    purchaseSummary,
    basicInformation = {} as BasicInformationState,
    businessInformation,
    hasPreviousPurchase,
    splitIOKeyValue,
    temporalCredentials,
    setBasicInformation,
    logIn,
    setTemporalCredentials,
    setIdToken,
  } = useAppContext();
  const generateEvent = useGenericEvent();

  const { userId, firstName, lastName, phoneNumber, email } = basicInformation;
  const { storeId } = businessInformation;
  // const auth = getAuth();
  const { navigate } = useAllowedNavigation();

  const [confirmationResult, setConfirmationResult] = useState<
    any | undefined
  >();
  const [showLoginErrorModal, setShowLoginErrorModal] = useState({
    show: false,
    isDifferentEmail: false,
  });
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [verifyCaptchaIsLoading, setVerifyCaptchaIsLoading] = useState(false);
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState(false);
  const [showAlreadyExistsModal, setShowAlreadyExistsModal] = useState(false);
  const [showMposAvailabilityModal, setShowMposAvailabilityModal] =
    useState(false);
  const [loginInfo, setLoginInfo] = useState<LoginPayload>(defaultLoginInfo);
  const isNoLoginPOS =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationNoLoginPOS];
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isFirebaseAuth, setIsFirebaseAuth] = useState(false);
  const [authProcessIsLoading, setAuthProcessIsLoading] = useState(false);
  const [OTPLoginFailed, setOTPLoginFailed] = useState(false);
  const [isVerifiedCodeValid, setIsVerifiedCodeValid] = useState(false);

  const temporalDataRef = useRef<TemporalUserData>({
    storeId: temporalCredentials.storeId,
    userId: temporalCredentials.userId,
  });
  const sidRef = useRef<string>("");

  const {
    isLoading: sendOTPIsLoading,
    refetch: sendOTP,
    source: sendOTPSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "otp/send-code",
      method: "POST",
    },
    onSuccess: async (data) => {
      setShowOTPModal(true);
      sidRef.current = data.sid;
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    isLoading: verifyOTPIsLoading,
    refetch: verifyOTP,
    source: verifyOTPSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "otp/verify-code",
      method: "POST",
    },
    onSuccess: async (response) => {
      if (response.valid) {
        const newTemporalCredentials = {
          storeId: getUUID(),
          userId: getUUID(),
        };

        temporalDataRef.current = {
          ...newTemporalCredentials,
        };

        createUser({
          data: {
            id: newTemporalCredentials.userId,
            first_name: basicInformation.firstName,
            last_name: basicInformation.lastName,
            email: basicInformation.email,
            phone: `${basicInformation.phoneNumber.countryCode}${basicInformation.phoneNumber.number}`,
            country_id: COUNTRIES.COLOMBIA,
            user_status_id: UserStatus.Inactive,
            origin_id: Origins.MPOS,
            is_offline: false,
          },
        });
      } else {
        setOTPLoginFailed(true);
      }
    },
    onError: () => {
      setOTPLoginFailed(true);
    },
  });

  const {
    isLoading: createUserIsLoading,
    refetch: createUser,
    source: createUserSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "users/userPOSByPhone",
      method: "POST",
    },
    onSuccess: async (response) => {
      if (response.uid) {
        setIsVerifiedCodeValid(true);
        setShowOTPModal(false);

        setTemporalCredentials({
          storeId: temporalDataRef.current.storeId,
          userId: temporalDataRef.current.userId,
          userFirebaseId: response.uid,
          loginType: LoginTypes.OTP,
        });

        getMposAvaiability({
          url: `/mpos/enrollment/check-availability/${basicInformation.phoneNumber.number}?quantity=${purchaseSummary.mposQuantity}`,
        });
      } else {
        navigate(ROUTES.ERROR_VERIFYING);
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const { data: userInfo, isLoading: getUserInfoIsLoading } = useQuery({
    api: "orchestrator",
    requestData: {
      url: `/users/${userId}`,
      method: "GET",
    },
    enableRefetch: isLogged,
  });

  const { data: storesInfo, isLoading: getStoreInfoIsLoading } = useQuery({
    api: "orchestrator",
    requestData: {
      url: `/store/find?ids=${storeId}`,
      method: "GET",
    },
    enableRefetch: isLogged,
  });

  const {
    isLoading: updateUserInfoIsLoading,
    refetch: updateUserInfo,
    source: updateUserInfoSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/users/update",
      method: "PUT",
    },
  });

  const {
    isLoading: updateStoreInfoIsLoading,
    refetch: updateStoreInfo,
    source: updateStoreInfoSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/store/update",
      method: "PUT",
    },
  });

  const {
    isLoading: mposAvailabilityIsLoading,
    refetch: getMposAvaiability,
    source: getMposAvaiabilitySource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/mpos/enrollment/check-availability/:phoneNumber?quantity",
      method: "GET",
    },
    onSuccess: async (available) => {
      if (!available) {
        return setShowMposAvailabilityModal(true);
      }

      if (isLogged && !hasPreviousPurchase) {
        await updateUserInfo({
          data: [
            {
              id: userId,
              first_name: firstName,
              last_name: lastName,
              updated_at: Date.now(),
            },
          ],
        });

        await updateStoreInfo({
          data: [
            {
              id: storeId,
              phone: `${phoneNumber.countryCode}${phoneNumber.number}`,
              email: email,
              updated_at: Date.now(),
            },
          ],
        });
      }

      navigate(ROUTES.BUSINESS_INFORMATION);
    },
  });

  const {
    refetch: checkEmailAvailability,
    isLoading: checkEmailAvailabilityIsLoading,
    source: checkEmailAvailabilitySource,
  } = useQuery<{
    userStatusId: UserStatus;
    originId: Origins;
  }>({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: "/users/user/zendesk?email=",
    },
    onSuccess: (email) => {
      if (!email && isNoLoginPOS) {
        handleSendOTP();
      } else if (
        !email ||
        (email.originId === Origins.MPOS &&
          email.userStatusId === UserStatus.Inactive)
      ) {
        getMposAvaiability({
          url: `/mpos/enrollment/check-availability/${basicInformation.phoneNumber.number}?quantity=${purchaseSummary.mposQuantity}`,
        });
      } else {
        isNoLoginPOS
          ? setUserInfo(LoginTypes.EMAIL, email)
          : setShowAlreadyExistsModal(true);
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    refetch: checkPhoneAvailability,
    isLoading: checkPhoneAvailabilityIsLoading,
    source: checkPhoneAvailabilitySource,
  } = useQuery<{
    userStatusId: UserStatus;
    originId: Origins;
  }>({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: "/users/user/zendesk?phone=",
    },
    onSuccess: (isPhoneRegistered) => {
      if (isPhoneRegistered) {
        setUserInfo(LoginTypes.OTP, isPhoneRegistered);
      } else {
        checkEmailAvailability({
          url: `/users/user/zendesk?email=${basicInformation.email}`,
        });
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const { isLoading: validateUidIsLoading, refetch: validateUid } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: `users/info/:user_uid`,
    },
    onSuccess: (response) => {
      if (response) {
        if (response.email === basicInformation.email) {
          checkMposAvaiability();
        } else {
          setShowLoginErrorModal({ show: true, isDifferentEmail: true });
        }
      } else {
        setShowLoginErrorModal({ show: true, isDifferentEmail: false });
        setLoginInfo(defaultLoginInfo);
      }
    },
    onError: () => {
      setShowLoginErrorModal({ show: true, isDifferentEmail: false });
      setLoginInfo(defaultLoginInfo);
    },
  });

  const checkMposAvaiability = () => {
    getMposAvaiability({
      url: `/mpos/enrollment/check-availability/${basicInformation.phoneNumber.number}?quantity=${purchaseSummary.mposQuantity}`,
    });

    logIn(loginInfo);
  };

  const isValidUser = async (code: string) => {
    setAuthProcessIsLoading(true);
    try {
      const response = await confirmationResult?.confirm(code);

      if (response?.user) {
        const { user } = response;

        await setAuthorizationToken(user);
        checkMposAvaiability();
        setIsVerifiedCodeValid(true);
      } else {
        setOTPLoginFailed(true);
      }
    } catch (error) {
      setOTPLoginFailed(true);
    } finally {
      setAuthProcessIsLoading(false);
    }
  };

  const setAuthorizationToken = async (user: any) => {
    const idToken = '(await auth.currentUser?.getIdToken()) || "";';

    setIdToken(idToken);
    setLoginInfo({ ...loginInfo, uid: user.uid, idToken });
    await addHeaders({
      idToken,
      uid: user.uid || "",
    });
  };

  const onLoginUser = async () => {
    setAuthProcessIsLoading(true);

    if (loginInfo.loginType === LoginTypes.OTP) {
      const otpConfirmationResult = await validateUserOTP(
        basicInformation.phoneNumber
      );

      setConfirmationResult(otpConfirmationResult);
      setIsFirebaseAuth(true);
      setShowOTPModal(true);
    } else {
      const emailConfirmationResult = await validateUserEmail(
        basicInformation.email
      );
      if (emailConfirmationResult) {
        await setAuthorizationToken(emailConfirmationResult.user);
        validateUid({ url: `users/info/${emailConfirmationResult.user.uid}` });
      }
    }

    setAuthProcessIsLoading(false);
  };

  const setUserInfo = async (loginType: LoginTypes, data: any) => {
    setLoginInfo({
      uid: data.uid,
      userId: data.id,
      loginType: loginType,
      idToken: "",
      email: basicInformation.email,
      firstName: data.firstName,
      lastName: data.lastName,
      storeId: data.stores[0],
      phoneNumber: {
        countryId: basicInformation.phoneNumber.countryId,
        countryCode: basicInformation.phoneNumber.countryCode,
        number: basicInformation.phoneNumber.number,
      },
    });

    setShowAlreadyExistsModal(true);
  };

  const alreadyExistsAccountValidation = () => {
    if (isNoLoginPOS) {
      checkPhoneAvailability({
        url: `/users/user/zendesk?phone=${basicInformation.phoneNumber.countryCode}${basicInformation.phoneNumber.number}`,
      });
    } else {
      checkEmailAvailability({
        url: `/users/user/zendesk?email=${basicInformation.email}`,
      });
    }
  };

  const onVerifyCaptcha = async (
    formInfo: BasicInformationPayload
  ): Promise<void> => {
    setBasicInformation(formInfo);

    newDatadogLog("WebPagosInformation", {
      userId,
      ...formInfo,
      step: 1,
    });
    generateEvent({
      isFreshData: true,
      customBasicInfo: { ...formInfo, userId },
      eventName: "WebPagosBasicInformationConfirmed",
    });

    setIsUpdatingData(true);
  };

  const formatPhoneNumber = useCallback((): PhoneNumber => {
    const rawPhoneNumber =
      storesInfo?.[0]?.phone || userInfo?.phone || phoneNumber.number || "";
    const countryId = Number(window.ENV?.REACT_APP_COUNTRY || -1);
    const countryCode =
      getCountry(Number(countryId) as CountriesIds).code || "";

    return {
      countryId,
      countryCode,
      number: rawPhoneNumber.includes("+")
        ? rawPhoneNumber.slice(countryCode.length)
        : rawPhoneNumber,
    };
  }, [storesInfo, userInfo, phoneNumber]);

  const handleSendOTP = useCallback(async () => {
    const recaptchaApiKey = window.ENV?.REACT_APP_RECAPTCHA_API_KEY;
    if (!recaptchaApiKey) {
      throw new Error(RECAPTCHA_ERROR);
    }

    const recaptcha = await load(recaptchaApiKey, {
      autoHideBadge: true,
    });
    const token = await recaptcha.execute(RECAPTCHA_ACTION);

    sendOTP({
      data: {
        channel: OTP_CHANNEL,
        phoneNumber: `${basicInformation.phoneNumber.countryCode}${basicInformation.phoneNumber.number}`,
        source: OTP_SOURCE,
        token,
      },
    });
  }, [
    basicInformation.phoneNumber.countryCode,
    basicInformation.phoneNumber.number,
    sendOTP,
  ]);

  const handleVerifyCode = useCallback(
    (code: string) => {
      verifyOTP({
        data: {
          sid: sidRef.current,
          phoneNumber: `${basicInformation.phoneNumber.countryCode}${basicInformation.phoneNumber.number}`,
          code,
        },
      });
    },
    [
      basicInformation.phoneNumber.countryCode,
      basicInformation.phoneNumber.number,
      sidRef,
      verifyOTP,
    ]
  );

  const handleOnCloseOTPModal = useCallback(() => {
    setShowOTPModal(false);
    setOTPLoginFailed(false);
  }, []);

  // useEffect(() => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     "recaptcha",
  //     {
  //       size: "invisible",
  //       callback: () => {
  //         setIsVerifiedCaptcha(true);
  //         setVerifyCaptchaIsLoading(false);
  //       },
  //       "expired-callback": () => {
  //         setIsVerifiedCaptcha(false);
  //         setVerifyCaptchaIsLoading(false);
  //       },
  //     },
  //     auth
  //   );

  //   return () => {
  //     window.recaptchaVerifier?.clear?.();
  //     setIsVerifiedCaptcha(false);
  //   };
  // }, [auth]);

  useEffect(() => {
    if (!isUpdatingData || !basicInformation.isComplete) return;

    setIsUpdatingData(false);

    if (isLogged) {
      getMposAvaiability({
        url: `/mpos/enrollment/check-availability/${basicInformation.phoneNumber.number}?quantity=${purchaseSummary.mposQuantity}`,
      });
    } else {
      if (isVerifiedCaptcha) {
        alreadyExistsAccountValidation();
      } else {
        setIsVerifiedCaptcha(false);
        setVerifyCaptchaIsLoading(true);
        window.recaptchaVerifier?.verify?.();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdatingData, isLogged, basicInformation]);

  useEffect(() => {
    if (isVerifiedCaptcha) {
      alreadyExistsAccountValidation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifiedCaptcha]);

  useEffect(() => {
    return () => {
      updateUserInfoSource.cancel();
      updateStoreInfoSource.cancel();
      getMposAvaiabilitySource.cancel();
      checkEmailAvailabilitySource.cancel();
      checkPhoneAvailabilitySource.cancel();
      sendOTPSource.cancel();
      verifyOTPSource.cancel();
      createUserSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BasicInformation
      isLoading={
        getUserInfoIsLoading ||
        getStoreInfoIsLoading ||
        verifyCaptchaIsLoading ||
        updateUserInfoIsLoading ||
        updateStoreInfoIsLoading ||
        mposAvailabilityIsLoading ||
        checkEmailAvailabilityIsLoading ||
        checkPhoneAvailabilityIsLoading ||
        validateUidIsLoading ||
        isUpdatingData ||
        sendOTPIsLoading ||
        verifyOTPIsLoading ||
        createUserIsLoading ||
        authProcessIsLoading
      }
      firstName={isLogged ? userInfo?.firstName || firstName : firstName}
      lastName={isLogged ? userInfo?.lastName || lastName : lastName}
      phone={isLogged ? formatPhoneNumber() : phoneNumber}
      email={
        isLogged ? storesInfo?.[0]?.email || userInfo?.email || email : email
      }
      isLogged={isLogged}
      showMposAvailabilityModal={showMposAvailabilityModal}
      closeMposAvailabilityModal={() => setShowMposAvailabilityModal(false)}
      showAlreadyExistsModal={showAlreadyExistsModal}
      showOTPModal={showOTPModal}
      OTPLoginFailed={OTPLoginFailed}
      isVerifiedCodeValid={isVerifiedCodeValid}
      isLoadingOTP={sendOTPIsLoading || verifyOTPIsLoading}
      closeAlreadyExistsModal={() => setShowAlreadyExistsModal(false)}
      onLogin={() => (isNoLoginPOS ? onLoginUser() : navigate(ROUTES.LOGIN))}
      onVerifyCaptcha={(formInfo) => onVerifyCaptcha(formInfo)}
      onVerificationCodeNewUserChange={() => setOTPLoginFailed(false)}
      showLoginErrorModal={showLoginErrorModal}
      setShowLoginErrorModal={() =>
        setShowLoginErrorModal({ show: false, isDifferentEmail: false })
      }
      closeOTPModal={handleOnCloseOTPModal}
      onResendOTPPhone={isFirebaseAuth ? () => onLoginUser() : handleSendOTP}
      onVerifyOTPCode={isFirebaseAuth ? isValidUser : handleVerifyCode}
    />
  );
};
