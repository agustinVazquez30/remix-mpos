import {
  MethodPayment,
  Origins,
  PaymentTypes,
  TRANSACTION_DESCRIPTION,
  TransactionStatus,
  TransactionTypes,
  TypePerson,
} from "~/legacy/src/constants";

import { AppContext } from "~/legacy/src/contexts/AppContext";
import { getUUID } from "~/legacy/src/utils/generators";
import { useContext } from "react";

const getFormattedDate = (date: Date | null): string => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return year + "/" + month + "/" + day;
};

export const useFormatTransaction = () => {
  const {
    isLogged,
    loginType,
    uid,
    transactionId,
    purchaseSummary,
    basicInformation,
    businessInformation,
    shipmentInformation,
    depositInformation,
    temporalCredentials,
    receptionInformation,
  } = useContext(AppContext);

  const getFormattedTransaction = ({
    isNewTransaction,
    shipmentOrder,
  }: {
    isNewTransaction: boolean;
    shipmentOrder: string;
  }) => ({
    id: isNewTransaction ? getUUID() : transactionId,
    user_id: isLogged ? basicInformation.userId : temporalCredentials.userId,
    store_id: isLogged
      ? businessInformation.storeId
      : temporalCredentials.storeId,
    date: Date.now(),
    description: TRANSACTION_DESCRIPTION,
    payments_data: JSON.stringify({
      loginType,
      uid,
      isNewUser: !isLogged,
      purchaseSummary,
      basicInformation: {
        ...basicInformation,
        ...(!isLogged && { userId: temporalCredentials.userId }),
      },
      businessInformation: {
        ...businessInformation,
        ...(!isLogged && { storeId: temporalCredentials.storeId }),
        businessName:
          businessInformation.typePerson === TypePerson.LEGAL
            ? businessInformation.businessName
            : null,
        storeDocumentTypeId:
          businessInformation.typePerson === TypePerson.NATURAL
            ? businessInformation.documentType
            : null,
        document:
          businessInformation.typePerson === TypePerson.NATURAL
            ? businessInformation.document
            : null,
      },
      shipmentInformation,
      depositInformation,
      shipmentOrder,
      deliveryDate: getFormattedDate(receptionInformation.deliveryDate),
    }),
    origin_id: Origins.MPOS,
    delivery_price: purchaseSummary.costOfShipping,
    value: purchaseSummary.total,
    payment_type_id:
      depositInformation.methodsPaymentType === MethodPayment.CASH_PAYMENT
        ? PaymentTypes.PAYMENT_CONTRA_ENTREGA
        : PaymentTypes.PAYMENT_LINK,
    transaction_status_id:
      depositInformation.methodsPaymentType === MethodPayment.CASH_PAYMENT
        ? TransactionStatus.PAID
        : TransactionStatus.PENDING,
    transaction_type_id: TransactionTypes.MPOS_PURCHASE,
    is_offline: false,
  });

  return {
    getFormattedTransaction,
  };
};
