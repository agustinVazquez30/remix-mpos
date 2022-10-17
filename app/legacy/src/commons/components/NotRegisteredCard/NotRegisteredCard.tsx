import { Alert, Button, Typography } from "@30sas/web-ui-kit-core";
import { LoginTypes, PhoneNumber } from "~/legacy/src/constants";
import { Container } from "./styles";
import { TreintaCard } from "~/legacy/src/commons/components/TreintaCard";
import { WarningIcon } from "@30sas/web-ui-kit-icons";
import { useTranslation } from "react-i18next";

type NotRegisteredCardType = {
  loginType: LoginTypes;
  onContinue: () => void;
  phoneNumber?: PhoneNumber | null;
  onEditPhoneNumber?: () => void;
};

export const NotRegisteredCard = ({
  loginType,
  onContinue,
  phoneNumber,
  onEditPhoneNumber,
}: NotRegisteredCardType) => {
  const { t } = useTranslation();

  return (
    <TreintaCard
      title={
        loginType === LoginTypes.EMAIL
          ? t("login.notRegistered.title")
          : t("login.notRegistered.titlePhone", {
              phone: `${phoneNumber?.countryCode} ${phoneNumber?.number}`,
            })
      }
      testId="notRegistered-card"
      alert={
        <Alert
          Icon={WarningIcon}
          textVariant="Small"
          backgroundColor="warning"
          backgroundType="300"
          borderColor="warning"
          borderType="500"
          children={
            <Typography
              variant="Small"
              color="warning"
              colorType="700"
              margin="0 0 0 18px"
            >
              {loginType === LoginTypes.EMAIL
                ? t("login.notRegistered.emailWarning")
                : t("login.notRegistered.phoneWarning")}
            </Typography>
          }
        />
      }
    >
      <Container>
        <Typography className="subtitle" variant="Medium" margin="0">
          {t("login.notRegistered.subtitle")}
        </Typography>
        <Button
          label={t("login.notRegistered.continueWithPurchase")}
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
          onClick={onContinue}
          fullWidth={true}
        />
        {loginType === LoginTypes.OTP && (
          <Button
            label={t("login.notRegistered.reWritePhoneNumber")}
            className="edit-phone"
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
            onClick={onEditPhoneNumber}
            fullWidth={true}
          />
        )}
      </Container>
    </TreintaCard>
  );
};
