import {
  Alert,
  Button,
  QuantityInput,
  Typography,
} from "@30sas/web-ui-kit-core";
import { AuthenticationModal, PurchaseDetail } from "./components";
import { Card } from "~/legacy/src/commons/components";
import {
  PurchaseSummaryPayload,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import { InfoIcon } from "@30sas/web-ui-kit-icons";
import MPOSImage from "~/legacy/src/assets/mpos-small.png";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useTranslation } from "react-i18next";

type PurchaseSummaryType = {
  isLoading: boolean;
  mposProduct: string;
  mposQuantity: number;
  mposValue: number;
  costOfShipping: number;
  onLogin: (purchaseSumaryInfo: PurchaseSummaryPayload) => void;
  onContinue: (
    purchaseSumaryInfo: PurchaseSummaryPayload,
    throwEvent: boolean
  ) => void;
  noShowLoginPos: boolean;
};

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 5;
const OLD_PRICE = 120000;

export const PurchaseSummary = ({
  isLoading,
  mposProduct,
  mposQuantity,
  mposValue,
  costOfShipping,
  onLogin,
  onContinue,
  noShowLoginPos,
}: PurchaseSummaryType) => {
  const { t } = useTranslation();
  const { hasAcceptedPurchasedOrder, isLogged, setHasAcceptedPurchasedOrder } =
    useAppContext();
  const generateEvent = useGenericEvent();
  const [mposQuantityLocal, setMposQuantity] = useState(mposQuantity);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const purchaseSummary = {
    mposProduct,
    mposQuantity: mposQuantityLocal,
    mposValue,
    costOfShipping,
    total,
  };

  useEffect(() => {
    const total = mposValue * mposQuantityLocal;
    setTotal(total);
  }, [mposQuantityLocal, mposValue]);

  const handleOnContinue = () => {
    if (!hasAcceptedPurchasedOrder) {
      setHasAcceptedPurchasedOrder(true);
      generateEvent({
        eventName: "WebPagosSummaryContinue",
        eventArgs: { no_log_in: noShowLoginPos },
      });
    }

    if (!isLogged && !noShowLoginPos) return setShowModal(true);

    onContinue(purchaseSummary, false);
  };

  return (
    <Container>
      <Typography className="title" variant="XXLargebold">
        {t("purchaseSummary.title")}
      </Typography>
      <div className="spacing">
        <Alert
          Icon={InfoIcon}
          textVariant="Small"
          children={
            <ul className="list">
              <li>
                {t("purchaseSummary.securityMessage")}
                <strong> {t("purchaseSummary.securityMessageBold")}</strong>
              </li>
              <li>
                {t("purchaseSummary.requestAccountNumber")}
                <strong>
                  {" "}
                  {t("purchaseSummary.requestAccountNumberBold")}
                </strong>
              </li>
            </ul>
          }
        />
      </div>
      <Card>
        <div className="product-selector">
          <div className="detail">
            <img loading="lazy" src={MPOSImage} alt="mpos" />
            <Typography variant="XLargebold" margin="0">
              {mposProduct}
            </Typography>
          </div>
          <div className="quantity-input">
            <QuantityInput
              dataTestId="mposQuantity"
              colors={{
                backgroundColor: "gray",
                backgroundGradient: "100",
                borderColor: "gray",
                borderGradient: "600",
                hoverColor: "gray",
                hoverGradient: "200",
                textColor: "secondary",
                textGradient: "700",
              }}
              name="amount-mpos"
              quantity={mposQuantityLocal}
              setQuantity={(e) => setMposQuantity(e.target.value)}
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
            />
          </div>
        </div>
      </Card>
      <PurchaseDetail
        mposValue={mposValue * mposQuantityLocal}
        mposQuantity={mposQuantityLocal}
        costOfShipping={costOfShipping}
        total={total}
        oldPrice={OLD_PRICE * mposQuantityLocal}
      />
      <Alert
        Icon={InfoIcon}
        textVariant="Small"
        text={<span>{t("purchaseSummary.requestData")}</span>}
      />
      <div className="spacing">
        <Button
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("commons.continue")}
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={handleOnContinue}
          fullWidth={true}
          disabled={mposQuantityLocal <= 0 || total <= 0}
        />
      </div>
      <AuthenticationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onLogin={() => onLogin(purchaseSummary)}
        onContinue={() => onContinue(purchaseSummary, true)}
      />
    </Container>
  );
};
