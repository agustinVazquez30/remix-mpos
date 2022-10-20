import { ActionFunction, json, redirect } from "@remix-run/node";
import { ROUTES } from "~/legacy/src/constants";
import {
  onSubmit,
  validate,
} from "~/legacy/src/modules/BasicInformation/constants";

const getUser = (formData: any) => {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const phone = formData.get("phone");
  const email = formData.get("email");

  return { lastName, firstName, phone, email };
};
const getValidations = (user: any) => {
  return Object.fromEntries(
    Object.keys(user).map((key) => {
      return [key, !Boolean((user as any)[key as any])];
    })
  );
};

export const STATES = {
  initial: "INIT",
  formValid: "FORM_OK",
  error: "FORM_ERR",
  otp: "OTP",
  submit: "SUBMIT",
};

const handleConfirm = (formData: any) => {
  const user = getUser(formData);
  const errors = getValidations(user);
  if (Object.keys(errors).some((key) => errors[key])) {
    return json({ errors, state: STATES.error });
  } else {
    return json({ state: STATES.formValid, user });
  }
};

const handleValidate = async (formData: any) => {
  const user = getUser(formData);
  const quantity = formData.get("quantity");
  const otp = await validate({ user, quantity });

  if (otp) {
    return json({ user, otp, state: STATES.otp });
  } else {
    return json({ error: "otp" });
  }
};

const handleSubmit = async (formData: any) => {
  const user = getUser(formData);
  const code = formData.get("code");
  const sid = formData.get("sid");
  const result = await onSubmit({
    sid,
    code,
    phoneNumber: user.phone,
  });

  if (result) {
    return redirect(`/${ROUTES.BUSINESS_INFORMATION}`);
  }

  return json({ error: "code" });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let action = formData.get("action");

  switch (action) {
    case "confirm":
      return handleConfirm(formData);
    case "validate":
      return handleValidate(formData);
    case "submit":
      return handleSubmit(formData);
  }
};
