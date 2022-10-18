import { AlreadyExistsModal, ConfirmationModal, OTPModal } from "./components";
import {
  AppContext,
  BasicInformationPayload,
} from "~/legacy/src/contexts/AppContext";
import { Button, CheckBox, InputBase } from "@30sas/web-ui-kit-core";
import { LoginTypes, PhoneNumber } from "~/legacy/src/constants";
import { depureEmail, depureText } from "~/legacy/src/commons/validations";
import {
  isColombianCellPhone,
  isEmail,
} from "~/legacy/src/utils/typeValidations";
import { useContext, useEffect, useMemo, useState } from "react";
import { Container } from "./styles";
import { LoginErrorModal } from "./components/LoginErrorModal";
import { MaximumMposQuantityModal } from "./components/MaximumMposQuantityModal";
import { Spinner } from "~/legacy/src/commons/components";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { TypeValidation } from "./models";
import { useFieldsDisabled } from "./hooks/useFieldsDisabled";
import { useTranslation } from "react-i18next";

export type BasicInformationType = {
  isLoading: boolean;
  firstName: string;
  lastName: string;
  phone: PhoneNumber;
  email: string;
  isLogged: boolean;
  showMposAvailabilityModal: boolean;
  showAlreadyExistsModal: boolean;
  showOTPModal: boolean;
  OTPLoginFailed: boolean;
  isVerifiedCodeValid: boolean;
  isLoadingOTP: boolean;
  closeMposAvailabilityModal: () => void;
  closeAlreadyExistsModal: () => void;
  closeOTPModal: () => void;
  onResendOTPPhone: () => void;
  onVerifyOTPCode: (code: string) => void;
  onVerificationCodeNewUserChange: () => void;
  onVerifyCaptcha: (formInfo: BasicInformationPayload) => void;
  onLogin: () => void;
  showLoginErrorModal: { show: boolean; isDifferentEmail: boolean };
  setShowLoginErrorModal: () => void;
};

export const BasicInformation = ({
  isLoading,
  firstName,
  lastName,
  phone,
  email,
  showMposAvailabilityModal,
  showAlreadyExistsModal,
  showOTPModal,
  OTPLoginFailed,
  isVerifiedCodeValid,
  isLoadingOTP,
  closeMposAvailabilityModal,
  closeAlreadyExistsModal,
  closeOTPModal,
  onResendOTPPhone,
  onVerifyOTPCode,
  onVerificationCodeNewUserChange,
  onVerifyCaptcha,
  onLogin,
  isLogged,
  showLoginErrorModal,
  setShowLoginErrorModal,
}: BasicInformationType) => {
  const { t } = useTranslation();
  const { loginType, splitIOKeyValue } = useContext(AppContext);
  const [firstNameLocal, setFirstName] = useState(firstName);
  const [lastNameLocal, setLastName] = useState(lastName);
  const [phoneLocal, setPhone] = useState<PhoneNumber>(phone);
  const [emailLocal, setEmail] = useState(email);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const fields = useFieldsDisabled();

  const splitActivationNoLoginPOS =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationNoLoginPOS];

  const onChangePhone = (phone: string) => {
    setPhone({ ...phoneLocal, number: phone });
  };

  useEffect(() => {
    setFirstName(firstName);
    setLastName(lastName);
    setPhone(phone);
    setEmail(email);
  }, [firstName, lastName, phone, email]);

  const isContinueButtonDisabled = useMemo(
    () =>
      !firstNameLocal ||
      !lastNameLocal ||
      !isColombianCellPhone(phoneLocal.number) ||
      (!isLogged
        ? !isEmail(emailLocal, isLogged, loginType, splitActivationNoLoginPOS)
        : false) ||
      !acceptedTerms,
    [
      firstNameLocal,
      lastNameLocal,
      phoneLocal.number,
      emailLocal,
      isLogged,
      loginType,
      acceptedTerms,
      splitActivationNoLoginPOS,
    ]
  );

  return (
    <Container>
      <div className="row">
        <div className="field">
          <InputBase
            dataTestId="firstname-input"
            label={t("basicInformation.nameInput.label")}
            placeholder={t("basicInformation.nameInput.placeholder")}
            value={firstNameLocal}
            onChange={(e) => setFirstName(depureText(e.target.value))}
            rounded="md"
          />
        </div>
        <div className="field">
          <InputBase
            dataTestId="lastname-input"
            label={t("basicInformation.lastNameInput.label")}
            placeholder={t("basicInformation.lastNameInput.placeholder")}
            value={lastNameLocal}
            onChange={(e) => setLastName(depureText(e.target.value))}
            rounded="md"
          />
        </div>
      </div>
      <div className="row">
        <div className="field">
          <InputBase
            label={t("basicInformation.phoneInput.label")}
            type="number"
            dataTestId="phone-input"
            placeholder={t("basicInformation.phoneInput.placeholder")}
            onChange={({ target }) => onChangePhone(target.value)}
            value={phoneLocal.number}
            error={
              phoneLocal.number
                ? !isColombianCellPhone(phoneLocal.number)
                : false
            }
            errorText={t("basicInformation.phoneInput.msgError")}
            disabled={fields.phone}
          />
        </div>
        <div className="field">
          <InputBase
            dataTestId="email-input"
            label={t("basicInformation.emailInput.label")}
            placeholder={t("basicInformation.emailInput.placeholder")}
            value={emailLocal}
            onChange={(e) => setEmail(depureEmail(e.target.value))}
            rounded="md"
            error={
              (emailLocal && !isLogged) ||
              (isLogged && loginType === LoginTypes.OTP)
                ? !isEmail(
                    emailLocal,
                    isLogged,
                    loginType,
                    splitActivationNoLoginPOS
                  )
                : false
            }
            errorText={
              (isLogged && loginType === LoginTypes.OTP) ||
              splitActivationNoLoginPOS
                ? t("basicInformation.emailInput.msgError")
                : t("basicInformation.emailInput.msgErrorGmail")
            }
            disabled={fields.email}
          />
        </div>
      </div>
      <div className="input-checkbox">
        <CheckBox
          margin="0 0 0 -9px !important"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
        >
          {`${t("basicInformation.termsInput.readAndAccept")} `}
          <a
            data-testid="terms-conditions-link"
            className="link"
            href={window.ENV?.REACT_APP_TERMS_CONDITIONS_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t("basicInformation.termsInput.termsAndConditions")}
          </a>
          {` ${t("commons.and")} `}
          <a
            data-testid="data-privacy-link"
            className="link"
            href={window.ENV?.REACT_APP_DATA_PRIVACY_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t("basicInformation.termsInput.dataPrivacy")}
          </a>
          {` ${t("commons.of")} ${t("commons.company")}`}
        </CheckBox>
      </div>
      <div id="recaptcha"></div>
      <div className="button-container">
        <Button
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("commons.continue")}
          upper={false}
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          className="button-styled"
          onClick={() => setShowConfirmationModal(true)}
          fullWidth
          disabled={isContinueButtonDisabled}
        />
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          formInfo={{
            fullName: `${firstNameLocal.trim()} ${lastNameLocal.trim()}`,
            phone: phoneLocal.number,
            email: emailLocal.trim(),
          }}
          onConfirmData={() =>
            onVerifyCaptcha({
              firstName: firstNameLocal.trim(),
              lastName: lastNameLocal.trim(),
              phoneNumber: phoneLocal,
              email: emailLocal.trim(),
            })
          }
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
      <LoginErrorModal
        show={showLoginErrorModal.show}
        title={t(
          showLoginErrorModal.isDifferentEmail
            ? "basicInformation.errorModal.isDifferentEmail"
            : "basicInformation.errorModal.title"
        )}
        onClose={setShowLoginErrorModal}
        onClick={setShowLoginErrorModal}
      />
      <AlreadyExistsModal
        show={showAlreadyExistsModal}
        onClose={closeAlreadyExistsModal}
        type={TypeValidation.EMAIL}
        onLogin={onLogin}
      />
      <MaximumMposQuantityModal
        show={showMposAvailabilityModal}
        onClose={closeMposAvailabilityModal}
      />
      <OTPModal
        show={showOTPModal}
        isLoading={isLoadingOTP}
        isVerifiedCodeValid={isVerifiedCodeValid}
        OTPLoginFailed={OTPLoginFailed}
        phoneNumber={phone}
        onClose={closeOTPModal}
        onEditPhoneNumber={closeOTPModal}
        onResendCode={onResendOTPPhone}
        onVerifyCode={onVerifyOTPCode}
        onVerificationCodeChange={onVerificationCodeNewUserChange}
      />
      {isLoading && <Spinner fullScreen={true} />}
    </Container>
  );
};
