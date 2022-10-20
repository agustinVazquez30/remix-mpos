import { isPOSAvailable } from "~/services/mpos";
import { sendOtp, verifyOtp } from "~/services/otp";
import { updateStore } from "~/services/store";
import { createUserByPhone, existsByPhone, updateUser } from "~/services/user";

export const validate = async ({ user, quantity }: any) => {
  const valid = await isPOSAvailable({ phone: user.phone, quantity });

  if (valid) {
    const data = await sendOtp({ phoneNumber: user.phone });
    return data;
  }
};

export const onSubmit = async (args: any) => {
  const isValid = await verifyOtp(args);

  return isValid;
};
