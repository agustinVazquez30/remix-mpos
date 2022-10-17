import { AppContext, LoginPayload } from "~/legacy/src/contexts/AppContext";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import { LoginTypes, ROUTES } from "~/legacy/src/constants";
import { useContext, useEffect, useState } from "react";
import { useLogout, useQuery } from "~/legacy/src/hooks";
import { OTPLogin } from "./OTPLogin";
import { OTPLoginSteps } from "./constants";
import { PhoneNumber } from "~/legacy/src/constants";
import { addHeaders } from "~/legacy/src/config/Api";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";

export const OTPLoginLoad = () => {
  let auth = getAuth();
  const { logIn } = useContext(AppContext);
  useContext(AppContext);
  const { isLoading: logoutIsLoading } = useLogout();
  const { navigate } = useAllowedNavigation();
  const [isUnregisteredUser, setIsUnregisteredUder] = useState(false);
  const [OTPLoginFailed, setOTPLoginFailed] = useState(false);
  const [currentStep, setCurrentStep] = useState<OTPLoginSteps>(
    OTPLoginSteps.SEND_CODE
  );
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | null>(null);
  const [verifyCaptchaIsLoading, setVerifyCaptchaIsLoading] = useState(false);
  const [isVerifiedCaptcha, setIsVerifiedCaptcha] = useState(false);
  const [sendCodeIsLoading, setSendCodeIsLoading] = useState(false);
  const [verifyCodeIsLoading, setVerifyCodeIsLoading] = useState(false);
  const [isVeriyCodeValid, setIsVerifyCodeValid] = useState(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
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

  const onVerifyCaptcha = (phoneNumber: PhoneNumber) => {
    setOTPLoginFailed(false);
    setPhoneNumber(phoneNumber);
  };

  const { isLoading: verifyPhoneIsLoading, refetch: verifyPhone } =
    useQuery<boolean>({
      api: "orchestrator",
      requestData: {
        url: `users/phone/validation?phone=%2b${
          phoneNumber?.countryCode.replace("+", "") || ""
        }${phoneNumber?.number || ""}&countryId=${
          process.env.REACT_APP_COUNTRY
        }`,
        method: "GET",
      },
      onSuccess: (response) => {
        if (response) {
          onSendCode();
        } else {
          setIsUnregisteredUder(true);
        }
      },
      onError: () => {
        setOTPLoginFailed(true);
      },
    });

  const onSendCode = async () => {
    setSendCodeIsLoading(true);
    try {
      auth = getAuth();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `${phoneNumber?.countryCode}${phoneNumber?.number}`,
        (window as any).recaptchaVerifier
      );

      setConfirmationResult(confirmationResult);
      setCurrentStep(OTPLoginSteps.VERIFY_CODE);
    } catch (error: any) {
      setOTPLoginFailed(true);
      setIsVerifiedCaptcha(false);
      setPhoneNumber(null);
    } finally {
      setSendCodeIsLoading(false);
    }
  };

  const onVerifyCode = async (code: string) => {
    setOTPLoginFailed(false);
    setVerifyCodeIsLoading(true);

    try {
      const response = await confirmationResult?.confirm(code);

      if (response?.user) {
        const { user } = response;

        const idToken = (await auth.currentUser?.getIdToken()) || "";

        setIsVerifyCodeValid(true);

        await addHeaders({
          idToken,
          uid: user.uid || "",
        });

        setLoginInfo({
          ...loginInfo,
          uid: user.uid || "",
          loginType: LoginTypes.OTP,
          idToken,
          phoneNumber: {
            countryId: phoneNumber?.countryId || -1,
            countryCode: phoneNumber?.countryCode || "",
            number: phoneNumber?.number || "",
          },
        });
      }
    } catch (error: any) {
      setOTPLoginFailed(true);
      setVerifyCodeIsLoading(false);
    }
  };

  const onEditPhoneNumber = () => {
    setCurrentStep(OTPLoginSteps.SEND_CODE);
    setIsUnregisteredUder(false);
  };

  const onResendPhone = () => {
    setOTPLoginFailed(false);
    verifyPhone();
  };

  const {
    isLoading: getUserInformationIsLoading,
    refetch: getUserInformation,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: `users/info/${loginInfo?.uid || ""}`,
      headers: {
        authorization: `Bearer ${loginInfo?.idToken || ""}`,
        "user-uid": loginInfo?.uid || "",
        "x-api-key": process.env.REACT_APP_ORCHESTRATOR_KEY || "",
      },
    },
    onSuccess: (response) => {
      if (response) {
        logIn({
          email: response.email,
          idToken: loginInfo.idToken || "",
          uid: loginInfo.uid || "",
          userId: response.id || "",
          loginType: LoginTypes.OTP,
          firstName: response.firstName,
          lastName: response.lastName,
          phoneNumber: {
            countryId: phoneNumber?.countryId || -1,
            countryCode: phoneNumber?.countryCode || "",
            number: phoneNumber?.number || "",
          },
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
    if (phoneNumber && !isVerifiedCaptcha) {
      window?.recaptchaVerifier?.verify();
      setVerifyCaptchaIsLoading(true);
    } else if (phoneNumber && isVerifiedCaptcha) {
      verifyPhone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneNumber]);

  useEffect(() => {
    if (phoneNumber && isVerifiedCaptcha) {
      verifyPhone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifiedCaptcha]);

  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: () => {
          setIsVerifiedCaptcha(true);
          setVerifyCaptchaIsLoading(false);
        },
        "expired-callback": () => {
          setIsVerifiedCaptcha(false);
          setVerifyCaptchaIsLoading(false);
        },
      },
      auth
    );

    return () => {
      window.recaptchaVerifier?.clear?.();
      setIsVerifiedCaptcha(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loginInfo.uid && isVeriyCodeValid) {
      getUserInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo]);

  return (
    <OTPLogin
      isLoading={
        verifyCaptchaIsLoading ||
        verifyPhoneIsLoading ||
        sendCodeIsLoading ||
        verifyCodeIsLoading ||
        getUserInformationIsLoading ||
        logoutIsLoading
      }
      isVeriyCodeValid={isVeriyCodeValid}
      phoneNumber={phoneNumber}
      step={currentStep}
      onContinueWithoutLogin={() => navigate(ROUTES.BASIC_INFORMATION)}
      onEditPhoneNumber={onEditPhoneNumber}
      onResendCode={onResendPhone}
      onSendCode={onVerifyCaptcha}
      onVerifyCode={onVerifyCode}
      onVerificationCodeChange={() => setOTPLoginFailed(false)}
      isUnregisteredUser={isUnregisteredUser}
      OTPLoginFailed={OTPLoginFailed}
    />
  );
};
