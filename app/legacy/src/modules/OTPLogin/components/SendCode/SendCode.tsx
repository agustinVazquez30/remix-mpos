import { Alert, Button, Typography } from "@30sas/web-ui-kit-core";
import { DefaultCountry, PhoneNumber } from "~/legacy/src/constants";
import { Container } from "./styles";
import { CountriesIds } from "@30sas/web-ui-kit-utils";
import { PhoneInput } from "../PhoneInput";
import { TreintaCard } from "~/legacy/src/commons/components";
import { WarningIcon } from "@30sas/web-ui-kit-icons";
import { isColombianCellPhone } from "~/legacy/src/utils/typeValidations";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SendCodeType = {
  isLoading: boolean;
  OTPLoginFailed: boolean;
  onSendCode: (phoneNumber: PhoneNumber) => void;
};

export const SendCode = ({
  onSendCode,
  isLoading,
  OTPLoginFailed,
}: SendCodeType) => {
  const { t } = useTranslation();
  const [phoneLocal, setPhone] = useState<PhoneNumber>({
    ...DefaultCountry,
    number: "",
  });

  return (
    <TreintaCard
      testId="sendCode-card"
      title={t("OTPLogin.sendCode.title")}
      alert={
        OTPLoginFailed && (
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
        <Typography className="subtitle" variant="Medium" margin="0">
          {`${t("OTPLogin.sendCode.subtitle1")} `}
          <strong>{t("OTPLogin.sendCode.subtitle2")}</strong>
        </Typography>
        <PhoneInput
          defaultCountryId={
            Number(process.env.REACT_APP_COUNTRY || -1) as CountriesIds
          }
          placeholder={t("OTPLogin.sendCode.phoneInput.placeholder")}
          onChangeCountry={({ id, code }) =>
            setPhone({
              ...phoneLocal,
              countryId: id,
              countryCode: code,
            } as PhoneNumber)
          }
          onChangePhone={(phone) =>
            setPhone({ ...phoneLocal, number: phone } as PhoneNumber)
          }
          phone={phoneLocal?.number as string}
          width=""
          hasError={
            phoneLocal?.number
              ? !isColombianCellPhone(phoneLocal.number)
              : false
          }
          msgError={t("OTPLogin.sendCode.phoneInput.msgError")}
          testIdInputCellPhone="phone-input"
        />
        <Button
          className="continue-button"
          label={t("OTPLogin.sendCode.continue")}
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
          onClick={() => onSendCode(phoneLocal)}
          loading={isLoading}
          disabled={!isColombianCellPhone(phoneLocal?.number)}
          fullWidth={true}
        />
      </Container>
    </TreintaCard>
  );
};
