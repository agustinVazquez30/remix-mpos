import {
  GoogleAuthProvider,
  getAuth,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { PhoneNumber } from "~/legacy/src/constants";

export const validateUserOTP = async (phoneNumber: PhoneNumber) => {
  const auth = getAuth();

  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      `${phoneNumber?.countryCode}${phoneNumber?.number}`,
      (window as any).recaptchaVerifier
    );

    return confirmationResult;
  } catch (error) {
    console.error(error);
  }
};

export const validateUserEmail = async (email: string) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    login_hint: email,
  });

  try {
    const confirmationResult = await signInWithPopup(auth, provider);

    return confirmationResult;
  } catch (error) {
    console.error(error);
  }
};
