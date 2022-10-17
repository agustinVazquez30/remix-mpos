import {Box} from './styles';
import {Typography} from '@30sas/web-ui-kit-core';
import {useTranslation} from 'react-i18next';

export type TransactionInfoType = {
  authorizationCode: string;
  transactionDate: string;
  paymentMethod: string;
  cardType: string;
  creditCardNumber: string;
  signatureURL: string;
  status: string;
  intallments: number;
  acqRrn: string;
};

export const TransactionInfo = ({
  authorizationCode,
  transactionDate,
  paymentMethod,
  cardType,
  creditCardNumber,
  signatureURL,
  status,
  intallments,
  acqRrn,
}: TransactionInfoType) => {
  const {t} = useTranslation();

  return (
    <Box>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium">
            {t('vouchers.authorizationCode')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {authorizationCode}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('vouchers.transactionDate')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {transactionDate}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('vouchers.paymentMethod')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {paymentMethod}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('vouchers.cardType')}
          </Typography>
        </div>
        <div className="value">
          {cardType !== '' ? (
            <img
              loading="lazy"
              src={cardType}
              alt="credit-card-type"
              className="credit-card-icon"
            />
          ) : null}

          <Typography className="value-text" variant="Mediumbold" margin="0">
            {creditCardNumber}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('commons.state')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {status}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('commons.rrn')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {acqRrn}
          </Typography>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <Typography className="label-text" variant="Medium" margin="0">
            {t('commons.intallments')}
          </Typography>
        </div>
        <div className="value">
          <Typography className="value-text" variant="Mediumbold" margin="0">
            {intallments}
          </Typography>
        </div>
      </div>
      {signatureURL && signatureURL !== '' ? (
        <div className="row">
          <div className="label">
            <Typography className="label-text" variant="Medium" margin="0">
              {t('commons.signature')}
            </Typography>
          </div>
          <div className="value">
            <div className="signature">
              <img loading="lazy" src={signatureURL} alt="signature" />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Box>
  );
};
