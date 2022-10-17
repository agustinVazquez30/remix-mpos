import { Alert, Button, Typography } from "@30sas/web-ui-kit-core";
import { Container } from "./styles";
import { GoogleIcon } from "@30sas/web-ui-kit-icons";
import { LoginTypes } from "~/legacy/src/constants";
import { NotRegisteredCard } from "~/legacy/src/commons/components/NotRegisteredCard";
import { TreintaCard } from "~/legacy/src/commons/components/TreintaCard";
import { WarningIcon } from "@30sas/web-ui-kit-icons";
import { useTranslation } from "react-i18next";

export type LoginType = {
  googleLoginFailed: boolean;
  googleLoginIsLoading: boolean;
  isUnregisteredUser: boolean;
  onContinueWithoutLogin: () => void;
  onLogin: () => void;
  onOTPLogin: () => void;
  onRegister: () => void;
};

export const Login = ({
  googleLoginFailed,
  googleLoginIsLoading,
  isUnregisteredUser,
  onContinueWithoutLogin,
  onLogin,
  onOTPLogin,
  onRegister,
}: LoginType) => {
  const { t } = useTranslation();

  if (isUnregisteredUser)
    return (
      <NotRegisteredCard
        loginType={LoginTypes.EMAIL}
        onContinue={onContinueWithoutLogin}
      />
    );

  return (
    <TreintaCard
      testId={"login-card"}
      title={t("login.startSession")}
      alert={
        googleLoginFailed && (
          <Alert
            Icon={WarningIcon}
            textVariant="Small"
            backgroundColor="warning"
            backgroundType="300"
            borderColor="danger"
            borderType="500"
            children={
              <Typography
                variant="Small"
                color="warning"
                colorType="700"
                margin="0 0 0 18px"
              >
                {t("commons.unknownError")}
              </Typography>
            }
          />
        )
      }
    >
      <Container>
        <Alert
          textVariant="Small"
          children={
            <Typography
              color="info"
              variant="Small"
              colorType="700"
              textAlign="left"
              margin="-5px"
            >
              {t("login.infoSession")}
            </Typography>
          }
        />
        <Button
          className="google-login"
          StartIcon={GoogleIcon}
          label={t("login.loginWithGoogle")}
          size="medium"
          upper={false}
          color="primary"
          colorType="500"
          hoverColor="primary"
          hoverColorType="300"
          textColor="secondary"
          textColorType="700"
          textVariant="Mediumbold"
          variant="primary"
          onClick={onLogin}
          loading={googleLoginIsLoading}
          fullWidth={true}
        />
        <Button
          label={t("login.loginWithPhoneNumber")}
          size="medium"
          upper={false}
          color="neutrals"
          colorType="100"
          hoverColor="secondary"
          hoverColorType="100"
          textColor="secondary"
          textColorType="700"
          textVariant="Mediumbold"
          variant="primary"
          onClick={onOTPLogin}
          fullWidth={true}
        />
        <div className="footer">
          <Typography variant="Medium" margin="0">
            {t("login.doNotHaveAnAccount")}
          </Typography>
          <div onClick={onRegister}>
            <Typography variant="Medium" margin="0">
              {t("login.continueWithoutLogin")}
            </Typography>
          </div>
        </div>
      </Container>
    </TreintaCard>
  );
};
