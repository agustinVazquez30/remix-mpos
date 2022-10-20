import { httpClientOrchestrator } from "~/legacy/src/config/Api";

const OTP_CHANNEL = "sms";
const OTP_SOURCE = "signinOtp";

export const sendOtp = async ({ phoneNumber }: any) => {
  try {
    const response = await httpClientOrchestrator().post("otp/send-code", {
      phoneNumber: `+${phoneNumber}`,
      source: OTP_SOURCE,
      channel: OTP_CHANNEL,
    });

    return response.data;
  } catch (e: any) {
    return false;
  }
};

export const verifyOtp = async ({ sid, phoneNumber, code }: any) => {
  try {
    const response = await httpClientOrchestrator().post("otp/verify-code", {
      sid,
      code,
      phoneNumber: `+${phoneNumber}`,
    });

    return response.data.valid;
  } catch (E) {
    return false;
  }
};
