import { BuyButtonProps, BuyButtonVariants } from "./types";
import { Button } from "@30sas/web-ui-kit-core";
import { FC } from "react";
import { useGoToBuy } from "~/legacy/src/hooks/useGoToBuy";
import { useTranslation } from "react-i18next";

export const BuyButton: FC<BuyButtonProps> = ({
  label,
  className,
  variant = BuyButtonVariants.main,
}) => {
  const { t } = useTranslation();
  const handlePress = useGoToBuy();

  const handleBuy = () => handlePress({ button: variant });

  return (
    <Button
      upper={false}
      size="medium"
      onClick={handleBuy}
      className={className}
      textVariant="Mediumbold"
      label={label || t("posLandingPage.buyButton")}
    />
  );
};
