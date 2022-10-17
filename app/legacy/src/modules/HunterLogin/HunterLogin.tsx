import { Button, InputBase, Typography } from "@30sas/web-ui-kit-core";
import { CardWrapper, Container, FloatContainer } from "./styles";
import { useCallback, useEffect, useRef, useState } from "react";
import DataphoneAsset from "~/legacy/src/assets/dataphone.svg";
import { ROUTES } from "~/legacy/src/constants";
import { Theme } from "~/legacy/src/config/Theme";
import TreintaLogoAsset from "~/legacy/src/assets/treinta-logo.svg";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { useHunterValidation } from "~/legacy/src/hooks/useHunterValidation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

export const HunterLogin = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { validate, status } = useHunterValidation();
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isMobile = width <= Theme.breakpointsUnits.sm;

  useEffect(() => {
    if (status === "resolved") {
      navigate(ROUTES.PURCHASE_ORDER, { replace: true });
    }
  }, [status, navigate]);

  const onLogin = useCallback(() => {
    validate(inputRef.current?.value?.trim() as string);
  }, [validate]);

  const setButtonStatus = useCallback((value: string) => {
    setDisabled(!Boolean(value));
  }, []);

  return (
    <Container>
      <CardWrapper className="card">
        <header className="card__header">
          <img src={TreintaLogoAsset} alt="Treinta Logo" width={150} />
          <Typography
            variant={isMobile ? "Largebold" : "XLargebold"}
            color="secondary"
            colorType="500"
            margin="2rem 0 0 0"
            className="smooth"
          >
            {t("hunters.welcome")}
          </Typography>
          <img src={DataphoneAsset} alt="Datafono" width={80} />
        </header>
        <fieldset className="card__form" disabled={status === "pending"}>
          <div>
            <InputBase
              ref={inputRef}
              onChange={(e) => setButtonStatus(e.target.value)}
              autoFocus
              htmlFor="document"
              label={t("hunters.login.input.label")}
              placeholder={t("hunters.login.input.placeholder")}
              error={status === "rejected"}
              errorText={t("hunters.login.input.error")}
            />
          </div>
          <Button
            disabled={status === "pending" || disabled}
            label={t("hunters.login.button")}
            onClick={onLogin}
            color="primary"
            colorType="500"
            upper={false}
            rounded="xl"
            size="medium"
            fullWidth
            textColor="primary"
            textColorType="900"
            textVariant="Mediumbold"
            variant="primary"
          />
        </fieldset>
      </CardWrapper>
      <FloatContainer>
        <WhatsappButton overwriteZendesk />
      </FloatContainer>
    </Container>
  );
};
