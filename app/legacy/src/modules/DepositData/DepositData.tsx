import {
  AccountTypes,
  DocumentFullNameType,
  MethodPayment,
  ROUTES,
  banksMap,
} from "~/legacy/src/constants";
import {
  Alert,
  Button,
  InputBase,
  TreintaDropdownType,
  Typography,
} from "@30sas/web-ui-kit-core";
import {
  AppContext,
  DepositInformationPayload,
} from "~/legacy/src/contexts/AppContext";
import { CITIES_RECEIPT_DATE_LIST, OnlyNumbersRegex } from "./constants";
import { ConfirmationModal, SelectionDateModal } from "./components";
import { CustomRadioButton, Spinner } from "~/legacy/src/commons/components";
import { PencilIcon, RightSmIcon, WarningIcon } from "@30sas/web-ui-kit-icons";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Container } from "./styles";
import { CustomDropDown } from "~/legacy/src/commons/styles/CustomDropdown";
import { InfoIcon } from "@30sas/web-ui-kit-icons";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

export type DepositDataType = {
  isLoading: boolean;
  document: string;
  bankId: number;
  bankDescription: string;
  accountNumber: string;
  methodsPaymentType: MethodPayment;
  accountType: AccountTypes;
  documentType: number;
  isHunter: boolean;
  onGoToPay: (formInfo: DepositInformationPayload) => void;
  saveDeliveryDate: (dateStr: string | null) => void;
};

export const DepositData = ({
  isLoading,
  document,
  bankId,
  bankDescription,
  accountNumber = "",
  methodsPaymentType,
  accountType,
  onGoToPay,
  saveDeliveryDate,
  documentType,
  isHunter,
}: DepositDataType) => {
  const { t } = useTranslation();
  const {
    shipmentInformation: { cityCode },
  } = useContext(AppContext);
  const { colors } = useTheme();
  const { navigate } = useAllowedNavigation();
  const [bankSelected, setBankSelected] = useState<{
    label: string;
    id: number;
  }>({
    id: bankId,
    label: bankDescription,
  });
  const [accountNumberLocal, setAccountNumber] = useState(accountNumber);
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountTypeLocal, setAccountType] = useState<AccountTypes>(
    accountType || AccountTypes.SAVINGS_ACCOUNT
  );
  const [accountMethodPayment, setAccountMethodPayment] =
    useState<MethodPayment>(methodsPaymentType || MethodPayment.PAYMENT);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSelectionDate, setShowSelectionDate] = useState(false);
  const [isImmediatePayment, setIsImmediatePayment] = useState(false);

  const banks: { id: number; name: string }[] =
    banksMap.get(Number(process.env.REACT_APP_COUNTRY || -1)) || [];
  const bankOptions = banks.map((bank: { id: number; name: string }) => ({
    id: bank.id,
    label: bank.name,
  }));

  const { State: showMethodsPayments } = useSplitIO(
    SplitIOTreatmentNames.ActivationHunterCode
  );

  const {
    loading: toMustSelectDeliveryDateSplitLoading,
    State: toMustSelectDeliveryDateSplit,
  } = useSplitIO(SplitIOTreatmentNames.ActivationDeliveryDate);

  const askDeliveryDate = useMemo(
    () =>
      toMustSelectDeliveryDateSplitLoading ||
      (toMustSelectDeliveryDateSplit &&
        CITIES_RECEIPT_DATE_LIST.includes(cityCode ?? "") &&
        MethodPayment.CASH_PAYMENT === accountMethodPayment &&
        !isImmediatePayment),
    [
      toMustSelectDeliveryDateSplit,
      toMustSelectDeliveryDateSplitLoading,
      accountMethodPayment,
      cityCode,
      isImmediatePayment,
    ]
  );

  bankOptions.unshift({
    id: -1,
    label: t("depositData.bankInput.placeholder"),
  });

  const fullNameTypeDocument = (id: number): string => {
    const document = DocumentFullNameType.find(
      (document) => document.id === id
    );
    return document ? document.document : "NIT";
  };

  const handleOnContinueButton = useCallback(() => {
    askDeliveryDate
      ? setShowSelectionDate(true)
      : setShowConfirmationModal(true);
  }, [askDeliveryDate]);

  const handleOnCloseSelectionDateModal = () => {
    setShowSelectionDate(false);
  };

  const handleOnSaveSelectionDateModal = (date: string | null) => {
    saveDeliveryDate(date);
    setShowConfirmationModal(true);
  };

  const handleRadioButtonChange = (
    methodPayment: MethodPayment,
    isHunterImmediatePayment: boolean
  ) => {
    if (isHunter) {
      setIsImmediatePayment(isHunterImmediatePayment);
    }

    setAccountMethodPayment(methodPayment);
  };

  const onChangeAccountNumber = (accountNumber: string) => {
    OnlyNumbersRegex.lastIndex = 0;
    if (accountNumber.length === 0 || OnlyNumbersRegex.test(accountNumber)) {
      setAccountNumber(accountNumber);
      accountNumberError && setAccountNumberError(false);
    } else {
      setAccountNumberError(true);
    }
  };

  useEffect(() => {
    if (!askDeliveryDate) {
      saveDeliveryDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askDeliveryDate]);

  return (
    <Container>
      <Alert
        textColor="warning"
        backgroundColor="warning"
        backgroundType="200"
        withBorder={false}
        Icon={WarningIcon}
        textVariant="Small"
        text={
          <span>
            <span>{`${t("depositData.alertText.firstPart")} `}</span>
            <br />
            <span>
              <strong>
                {fullNameTypeDocument(documentType)} {document}.
              </strong>
            </span>
            <br />

            {`${t("depositData.alertText.secondPart")}`}
          </span>
        }
      />
      <div
        className="link"
        onClick={() => navigate(ROUTES.BUSINESS_INFORMATION)}
      >
        <PencilIcon fill={colors.info[500]} />
        <p className="text-link">{`${t("depositData.editID")}`}</p>
        <RightSmIcon fill={colors.info[500]} />
      </div>
      <div className="row">
        <div className="field">
          <CustomDropDown
            defaultValue={bankSelected.label}
            dataTestId="bankInput"
            label={t("depositData.bankInput.label")}
            dropdownOptions={bankOptions}
            typeRenderItem={TreintaDropdownType.OnlyLetter}
            maxWidth="100%"
            onChange={(e) =>
              setBankSelected({
                id:
                  bankOptions.find((bank) => bank.label === e.label)?.id || -1,
                label: e.label as string,
              })
            }
            disabled={false}
          />
        </div>
        <div className="field">
          <InputBase
            dataTestId="accountNumberInput"
            label={t("depositData.accountNumberInput.label")}
            placeholder={t("depositData.accountNumberInput.placeholder")}
            value={accountNumberLocal}
            onChange={(e) => onChangeAccountNumber(e.target.value)}
            rounded="md"
            error={accountNumberError}
            errorText={t("depositData.accountNumberInput.error")}
          />
        </div>
      </div>
      <Typography className="account-type-label" variant="Smallbold" margin="0">
        {t("depositData.accountTypeLabel")}
      </Typography>
      <div className="special-row">
        <div className="field">
          <CustomRadioButton
            name="accountTypeSavings"
            label={t("commons.accountTypes.savings")}
            checked={AccountTypes.SAVINGS_ACCOUNT === accountTypeLocal}
            onChange={(value) =>
              value && setAccountType(AccountTypes.SAVINGS_ACCOUNT)
            }
          />
        </div>
        <div className="field">
          <CustomRadioButton
            name="accountTypeCurrent"
            label={t("commons.accountTypes.current")}
            checked={AccountTypes.CURRENT_ACCOUNT === accountTypeLocal}
            onChange={(value) =>
              value && setAccountType(AccountTypes.CURRENT_ACCOUNT)
            }
          />
        </div>
      </div>
      {showMethodsPayments && (
        <>
          <Typography
            className="account-type-label"
            variant="XLargebold"
            margin="0"
          >
            {t("depositData.methodsPayment")}
          </Typography>
          <Typography className="account-type-label" variant="Small" margin="0">
            {t("depositData.electionPayment")}
          </Typography>
          <Typography
            className="account-type-label"
            variant="Smallbold"
            margin="0"
          >
            {t("depositData.selectTypePayment")}
          </Typography>
          <div className="paymentContent">
            <div className="field">
              <CustomRadioButton
                name="cashPayment"
                label={t("depositData.cashPayment")}
                onChange={() =>
                  handleRadioButtonChange(MethodPayment.CASH_PAYMENT, false)
                }
                checked={
                  MethodPayment.CASH_PAYMENT === accountMethodPayment &&
                  !isImmediatePayment
                }
              />
            </div>
            <div className="field">
              <CustomRadioButton
                name="onlinePayment"
                label={t("depositData.onlinePayment")}
                onChange={() =>
                  handleRadioButtonChange(MethodPayment.ONLINE_PAYMENT, false)
                }
                checked={
                  MethodPayment.ONLINE_PAYMENT === accountMethodPayment &&
                  !isImmediatePayment
                }
              />
            </div>
            {isHunter && (
              <div className="field second-column">
                <CustomRadioButton
                  name="immediateDeliveryPayment"
                  label={t("depositData.immediatePayment")}
                  onChange={() =>
                    handleRadioButtonChange(MethodPayment.CASH_PAYMENT, true)
                  }
                  checked={isImmediatePayment}
                  icon={<InfoIcon className="info-icon" />}
                  popoverText={t("depositData.popoverInfo")}
                />
              </div>
            )}
          </div>
        </>
      )}
      <div className="container-button">
        <Button
          label={t("depositData.goToPay")}
          className="action-button"
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Smallbold"
          variant="primary"
          onClick={handleOnContinueButton}
          disabled={
            bankSelected.id === -1 ||
            !accountNumberLocal ||
            !accountMethodPayment ||
            toMustSelectDeliveryDateSplitLoading
          }
        />
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          show={showConfirmationModal}
          formInfo={{
            document,
            bank: bankSelected.label,
            accountNumber: accountNumberLocal,
            bankId: bankSelected.id,
            accountType:
              accountTypeLocal === AccountTypes.SAVINGS_ACCOUNT
                ? t("commons.accountTypes.savings")
                : t("commons.accountTypes.current"),
            methodsPayment:
              accountMethodPayment === MethodPayment.CASH_PAYMENT
                ? t("commons.methodsPayment.cash")
                : t("commons.methodsPayment.online"),
          }}
          onConfirmData={() =>
            onGoToPay({
              isHunterImmediatePayment: isImmediatePayment,
              bankId: bankSelected.id,
              bankDescription: bankSelected.label,
              accountType: accountTypeLocal,
              accountNumber: accountNumberLocal,
              methodsPaymentType: accountMethodPayment,
              methodsPayment:
                accountMethodPayment === MethodPayment.CASH_PAYMENT
                  ? t("commons.methodsPayment.cash")
                  : t("commons.methodsPayment.online"),
            })
          }
          onClose={() => setShowConfirmationModal(false)}
        />
      )}
      {showSelectionDate && (
        <SelectionDateModal
          show={showSelectionDate}
          onClose={handleOnCloseSelectionDateModal}
          onSaveDate={handleOnSaveSelectionDateModal}
        />
      )}
      {isLoading && <Spinner fullScreen={true} />}
    </Container>
  );
};
