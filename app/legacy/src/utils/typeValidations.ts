/* eslint-disable no-useless-escape */
import { FranchisesCards, LoginTypes } from "~/legacy/src/constants";

import MastercardIcon from "~/legacy/src/assets/franchises-cards/mastercard.png";

import VisaIcon from "~/legacy/src/assets/franchises-cards/visa.png";
export const isNumber = (value: any) => /^\d+$/.test(value);

export const isEmail = (
  text = "",
  isLogged: boolean,
  loginType: LoginTypes | null,
  splitOn = false
) => {
  if (splitOn) {
    const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return expression.test(text);
  }

  if (!isLogged) {
    const expression = /[\w\.%-+]{3,30}(\+?[\w\.%-+]{0,10})?@gmail\.com$/;

    return expression.test(text);
  }

  if (loginType === LoginTypes.OTP) {
    const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return expression.test(text);
  }

  const expression = /[\w\.%-+]{3,30}(\+?[\w\.%-+]{0,10})?@gmail\.com$/;

  return expression.test(text);
};

export const isColombianCellPhone = (cellPhone = "") => {
  const expressionFormat = /3[0-9]{9}/gm;
  const NUMBER_OF_CHARACTERS = 10;

  return (
    expressionFormat.test(cellPhone) &&
    cellPhone.length === NUMBER_OF_CHARACTERS
  );
};

export const validationCarType = (value: number): string => {
  if (FranchisesCards.VISA === value) {
    return VisaIcon;
  } else if (FranchisesCards.MASTERCARD === value) {
    return MastercardIcon;
  } else {
    return "";
  }
};
