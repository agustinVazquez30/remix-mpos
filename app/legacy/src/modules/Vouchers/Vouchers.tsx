import { BottomSection, Box, BoxLogo, Content, Footer, Header } from "./styles";
import { Button, Typography } from "@30sas/web-ui-kit-core";
import { StoreInfo, TransactionInfo, TransactionValues } from "./components";

import { DownloadFileIcon } from "@30sas/web-ui-kit-icons";
import TreintaLogo from "~/legacy/src/assets/treinta-icon.png";
import { useTranslation } from "react-i18next";

export type VouchersType = {
  storeName: string;
  storeAddress: string;
  storeEmail: string;
  authorizationCode: string;
  transactionDate: string;
  paymentMethod: string;
  cardType: string;
  creditCardNumber: string;
  total: number;
  signatureURL: string;
  logoStore: string;
  status: string;
  taxAmount: number;
  extraTaxAmount: number;
  acqRrn: string;
  intallments: number;
  subTotal: number;
  onGeneratePDF: () => void;
};

export const Vouchers = ({
  storeName,
  storeAddress,
  storeEmail,
  authorizationCode,
  transactionDate,
  paymentMethod,
  cardType,
  creditCardNumber,
  total,
  status,
  signatureURL,
  onGeneratePDF,
  intallments,
  acqRrn,
  extraTaxAmount,
  taxAmount,
  subTotal,
}: VouchersType) => {
  const { t } = useTranslation();

  return (
    <>
      <Header>
        <Button
          StartIcon={() => <DownloadFileIcon />}
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("vouchers.dowloadPdf")}
          upper={false}
          rounded="xl"
          size="small"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={() => onGeneratePDF()}
        />
      </Header>
      <BoxLogo>
        <img loading="lazy" src={TreintaLogo} alt="store-logo" />
      </BoxLogo>
      <div style={{ height: "auto" }}>
        <Content id="htmlToPDF">
          <Box>
            <StoreInfo
              storeName={storeName}
              storeAddress={storeAddress}
              storeEmail={storeEmail}
            />
            <TransactionInfo
              acqRrn={acqRrn}
              intallments={intallments}
              authorizationCode={authorizationCode}
              transactionDate={transactionDate}
              paymentMethod={paymentMethod}
              cardType={cardType}
              status={status}
              creditCardNumber={creditCardNumber}
              signatureURL={signatureURL}
            />
          </Box>
          <BottomSection>
            <Box>
              <TransactionValues
                total={total}
                taxAmount={taxAmount}
                subTotal={subTotal}
                extraTaxAmount={extraTaxAmount}
              />
            </Box>
          </BottomSection>
          <Footer>
            <div className="created-by">
              <Typography className="created-text" variant="Smallbold">
                {t("commons.createdBy")}
              </Typography>
              <img loading="lazy" src={TreintaLogo} alt="treinta-logo" />
              <Typography className="created-text" variant="Smallbold">
                {t("commons.company")}
              </Typography>
            </div>
          </Footer>
        </Content>
      </div>
    </>
  );
};
