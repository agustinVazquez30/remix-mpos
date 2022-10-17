import { LoginTypes } from "~/legacy/src/constants";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useMemo } from "react";

export const useFieldsDisabled = () => {
  const { isLogged, basicInformation, hasPreviousPurchase, loginType } =
    useAppContext();

  const fields = useMemo(
    () => ({
      email:
        hasPreviousPurchase ||
        Boolean(
          isLogged && loginType === LoginTypes.EMAIL && basicInformation.email
        ),
      phone:
        hasPreviousPurchase ||
        Boolean(
          isLogged &&
            loginType === LoginTypes.OTP &&
            basicInformation.phoneNumber?.number
        ),
    }),
    [
      isLogged,
      loginType,
      hasPreviousPurchase,
      basicInformation.email,
      basicInformation.phoneNumber?.number,
    ]
  );

  return fields;
};
