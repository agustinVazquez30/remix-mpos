import { ConfirmationModal, OTPModal } from "./components";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { CheckBox } from "@30sas/web-ui-kit-core";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useFieldsDisabled } from "./hooks/useFieldsDisabled";
import { useTranslation } from "react-i18next";
import { Form, useActionData, useFetcher, useSubmit } from "@remix-run/react";
import { STATES } from "~/routes/basic-information-handler";

export const BasicInformation = () => {
  const { basicInformation, purchaseSummary, setBasicInformation } =
    useAppContext();
  const { firstName, lastName, phoneNumber, email } = basicInformation;
  const { t } = useTranslation();
  const fields = useFieldsDisabled();
  const fetcher = useFetcher();

  const [otp, setOtp] = useState(false);
  const [modal, setModal] = useState(false);

  const next = () => {
    fetcher.submit(
      {
        ...fetcher.data.user,
        quantity: purchaseSummary.mposQuantity,
        action: "validate",
      },
      { method: "post", action: "/basic-information-handler" }
    );
  };

  const postOTP = (code: string) => {
    setBasicInformation(fetcher.data.user);
    fetcher.submit(
      { ...fetcher.data.user, code, ...fetcher.data.otp, action: "submit" },
      { method: "post", action: "/basic-information-handler" }
    );
  };

  const [acceptedTerms, setAcceptedTerms] = useState(true);

  useEffect(() => {
    if (fetcher.data?.state === STATES.formValid) {
      setModal(true);
    } else if (fetcher.data?.state === STATES.otp) {
      setOtp(true);
    }
  }, [fetcher.data?.state]);

  return (
    <fetcher.Form method="post" action="/basic-information-handler">
      <Container>
        <div className="row">
          <div className="field">
            <p>{t("basicInformation.nameInput.label")}</p>
            <input
              name="firstName"
              placeholder={t("basicInformation.nameInput.placeholder")}
              defaultValue={firstName}
            />
            {fetcher.data?.errors?.firstName && (
              <span style={{ color: "red" }}>Es obligatorio pa</span>
            )}
          </div>
          <div className="field">
            <p>{t("basicInformation.lastNameInput.label")}</p>
            <input
              name="lastName"
              placeholder={t("basicInformation.lastNameInput.placeholder")}
              defaultValue={lastName}
            />
            {fetcher.data?.errors?.lastName && (
              <span style={{ color: "red" }}>Es obligatorio pa</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="field">
            <p>{t("basicInformation.phoneInput.label")}</p>
            <input
              type="number"
              name="phone"
              placeholder={t("basicInformation.phoneInput.placeholder")}
              defaultValue={phoneNumber.number || (phoneNumber as any)}
              disabled={fields.phone}
            />
            {fetcher.data?.errors?.phone && (
              <span style={{ color: "red" }}>
                {t("basicInformation.phoneInput.msgError")}
              </span>
            )}
          </div>
          <div className="field">
            <p>{t("basicInformation.emailInput.label")}</p>
            <input
              name="email"
              placeholder={t("basicInformation.emailInput.placeholder")}
              defaultValue={email}
              disabled={fields.email}
            />
            {fetcher.data?.errors?.email && (
              <span style={{ color: "red" }}>
                {t("basicInformation.emailInput.msgError")}
              </span>
            )}
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
          <button
            type="submit"
            className="button-styled"
            name="action"
            value="confirm"
          >
            {t("commons.continue")}
          </button>
        </div>
        {modal && (
          <ConfirmationModal
            show={modal}
            formInfo={{
              fullName: `${fetcher.data.user.firstName.trim()} ${fetcher.data.user.lastName.trim()}`,
              phone: fetcher.data.user.phone,
              email: fetcher.data.user.email.trim(),
            }}
            onConfirmData={next}
            onClose={() => setModal(false)}
          />
        )}
        <OTPModal
          show={otp}
          isLoading={false}
          isVerifiedCodeValid={false}
          OTPLoginFailed={false}
          phoneNumber={fetcher.data?.user?.phone}
          onClose={() => {}}
          onEditPhoneNumber={() => {}}
          onResendCode={() => {}}
          onVerifyCode={postOTP}
          onVerificationCodeChange={() => {}}
        />
      </Container>
    </fetcher.Form>
  );
};
