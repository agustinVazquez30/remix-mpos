export enum OTPLoginSteps {
  SEND_CODE = 0,
  VERIFY_CODE = 1,
}
export interface VerificationCodeInterface {
  verificationCode: string;
  completed: boolean;
}
