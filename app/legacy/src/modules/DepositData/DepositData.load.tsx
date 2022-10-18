import {
  AccountTypes,
  MethodPayment,
  ROUTES,
  ServiceTypes,
} from "~/legacy/src/constants";
import {
  BusinessInformationState,
  DepositInformationPayload,
  DepositInformationState,
  PurchaseSummaryState,
  UtmParameters,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import {
  DeliveryOrderServiceResponse,
  useCreateDeliveryOrder,
  useFormatTransaction,
  useQuery,
  useShipmentOrder,
} from "~/legacy/src/hooks";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { useEffect, useRef, useState } from "react";

import { DepositData } from "./DepositData";
import { TestDirectionsRegex } from "./constants";
import { WebPagosPaymentsUponDelivery } from "~/legacy/src/hooks/useGenericEvent/models";
import { newBrazeRevenueEvent } from "~/legacy/src/config/Braze/utils";
import { newDatadogLog } from "~/legacy/src/config/Datadog";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";

export const DepositDataLoad = () => {
  const {
    isLogged,
    transactionId,
    basicInformation,
    purchaseSummary = {} as PurchaseSummaryState,
    businessInformation = {} as BusinessInformationState,
    depositInformation = {} as DepositInformationState,
    utmParameters = {} as UtmParameters,
    receptionInformation,
    shipmentInformation,
    temporalCredentials,
    isHunters,
    setDepositInformation,
    setReceptionInformation,
    setTransactionId,
  } = useAppContext();
  const generateEvent = useGenericEvent();

  const { navigate } = useAllowedNavigation();
  const { getDeliveryOrderInput } = useCreateDeliveryOrder();
  const { getFormattedTransaction } = useFormatTransaction();
  const [isUpdatingTransaction, setIsUpdatingTransaction] = useState(false);
  const { setShipmentOrder } = useShipmentOrder();
  const successTransactionRedirectRef = useRef<string>();
  const currentShipmentOrderRef = useRef<string>(setShipmentOrder());

  const { email, phoneNumber, userId } = basicInformation;
  const {
    businessName,
    category,
    document,
    documentType,
    expeditionDate,
    nit,
    storeId,
    storeName,
    subcategory,
    typePerson,
    isComplete,
  } = businessInformation;
  const {
    address,
    addressDetail,
    addressPrefix,
    anotherName,
    anotherPerson,
    anotherPhone,
    city,
    cityCode,
    neighborhood,
    state,
  } = shipmentInformation;
  const {
    bankId,
    bankDescription,
    accountType,
    methodsPaymentType,
    accountNumber,
    isHunterImmediatePayment,
  } = depositInformation;

  const { mposQuantity, mposValue } = purchaseSummary;

  const { deliveryDate } = receptionInformation;

  const { loading, State: showMethodsPayments } = useSplitIO(
    SplitIOTreatmentNames.ActivationHunterCode
  );

  const isFakeTransaction =
    address.search(TestDirectionsRegex) !== -1 ||
    addressDetail.search(TestDirectionsRegex) !== -1;
  const isCashPayment =
    !loading && showMethodsPayments
      ? methodsPaymentType === MethodPayment.CASH_PAYMENT
      : false;

  const utmCheckoutQueryParams = `utm_source=${utmParameters.utmSource}&utm_medium=${utmParameters.utmMedium}&utm_campaign=${utmParameters.utmCampaign}`;

  useEffect(() => {
    if (!isComplete) {
      navigate(ROUTES.PURCHASE_ORDER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    refetch: getStoreService,
    isLoading: isLoadingGetStoreService,
    source: sourceGetStoreService,
  } = useQuery<
    {
      id: string;
    }[]
  >({
    api: "treinta-api",
    requestData: {
      method: "GET",
      url: `/service?store_id=${businessInformation.storeId}&service_type_id=${ServiceTypes.PAYMENT_LINKS}`,
    },
    onSuccess: ([{ id: storeServiceId, ...storeService }]) => {
      updateStoreService({
        url: isLogged ? "service/update" : "service/update-by-key",
        data: {
          ...storeService,
          id: storeServiceId,
          config: JSON.stringify(depositInformation),
        },
      });
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    refetch: updateStoreService,
    isLoading: isLoadingUpdateStoreService,
    source: sourceUpdateStoreService,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "PUT",
      url: "service/update",
    },
    onSuccess: () => {
      currentShipmentOrderRef.current = setShipmentOrder();
      const formattedTransaction = getFormattedTransaction({
        isNewTransaction: !transactionId,
        shipmentOrder: currentShipmentOrderRef.current,
      });

      if (isCashPayment) {
        newDatadogLog("webPagosEnrollmentTransaction", formattedTransaction);
      }

      if (isLogged) {
        upsertTransaction({
          data: [formattedTransaction],
        });
      } else {
        createTempTransaction({
          data: formattedTransaction,
        });
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    isLoading: upsertTransactionIsLoading,
    refetch: upsertTransaction,
    source: upsertTransactionSource,
  } = useQuery<{ id: string }[]>({
    api: "orchestrator",
    requestData: {
      url: transactionId
        ? "/transaction/update-multiple"
        : "/transaction/create-multiple",
      method: transactionId ? "PUT" : "POST",
    },
    onSuccess: ([transaction]) => {
      setTransactionId(transaction.id);
      successTransactionRedirectRef.current = `${window.ENV?.REACT_APP_TREINTA_CHECKOUT_URL}/${transaction.id}?${utmCheckoutQueryParams}`;

      if (isCashPayment) {
        createEnrollmentTransaccion({
          data: { transactionId: transaction.id },
        });
        handleLogisticsFlow();
      } else {
        window.location.href = successTransactionRedirectRef.current;
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    isLoading: createTempTransactionIsloading,
    refetch: createTempTransaction,
    source: createTempTransactionSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/mpos/tmp-transactions",
      method: "POST",
    },
    onSuccess: (id) => {
      setTransactionId(id);
      successTransactionRedirectRef.current = `${window.ENV?.REACT_APP_TREINTA_CHECKOUT_URL}/${id}?is_temp=true&${utmCheckoutQueryParams}`;

      if (isCashPayment) {
        createEnrollmentTransaccion({ data: { transactionId: id } });
        handleLogisticsFlow();
      } else {
        window.location.href = successTransactionRedirectRef.current;
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    isLoading: isLoadingCreateEnrollmentTransaccion,
    refetch: createEnrollmentTransaccion,
    source: createEnrollmentTransaccionSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/mpos/enrollment/webhook-by-transaction",
      method: "POST",
    },
  });

  const {
    isLoading: createDeliveryOrderLogystoIsloading,
    refetch: createDeliveryOrderLogysto,
    source: createDeliveryOrderLogystoSource,
  } = useQuery<DeliveryOrderServiceResponse>({
    api: "orchestrator",
    requestData: {
      url: "/logystics/create-delivery-order-logysto",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": window.ENV?.REACT_APP_LOGISTICS_SECRET_KEY || "",
      },
    },
    onSuccess: (data) => {
      if (!data.isCreated) {
        navigate(ROUTES.DELIVERY_ORDER_ERROR);
        return;
      }

      if (
        successTransactionRedirectRef.current &&
        methodsPaymentType === MethodPayment.ONLINE_PAYMENT
      ) {
        window.location.href = successTransactionRedirectRef.current;
      } else {
        navigate(ROUTES.PAYMENT_CONFIRMATION_CASH);
      }
    },
    onError: () => {
      navigate(ROUTES.DELIVERY_ORDER_ERROR);
    },
  });

  const {
    isLoading: scheduleDeliveryOrderLogystoIsloading,
    refetch: scheduleDeliveryOrderLogysto,
    source: scheduleDeliveryOrderLogystoSource,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      url: "/logistics-scheduler/save-order",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    onSuccess: () => {
      if (
        successTransactionRedirectRef.current &&
        methodsPaymentType === MethodPayment.ONLINE_PAYMENT
      ) {
        window.location.href = successTransactionRedirectRef.current;
      } else {
        navigate(ROUTES.PAYMENT_CONFIRMATION_CASH);
      }
    },
    onError: () => {
      navigate(ROUTES.DELIVERY_ORDER_ERROR);
    },
  });

  const createEvents = (depositData: DepositInformationPayload): void => {
    const { bankDescription: bank_name, accountType } = depositData;
    const account_type = AccountTypes[accountType];
    const isOnline =
      depositData.methodsPaymentType === MethodPayment.ONLINE_PAYMENT;

    generateEvent({
      eventName: "WebPagosDepositInfoConfirmed",
      eventArgs: {
        bank_name,
        account_type,
      },
    });
    generateEvent({
      eventName: "WebPagosFinishes",
      eventArgs: {
        payment_method: isOnline ? "online" : "cash",
      },
      platforms: {
        amplitude: true,
      },
    });
  };

  const handleLogisticsFlow = () => {
    if (!isHunterImmediatePayment && !isFakeTransaction) {
      const order = getDeliveryOrderInput(currentShipmentOrderRef.current);
      if (deliveryDate) {
        const scheduledOrder = {
          data: {
            ...order.data,
            deliveryDate: deliveryDate
              .toISOString()
              .split("T")[0]
              .replace(/-/g, "/"),
          },
        };
        scheduleDeliveryOrderLogysto(scheduledOrder);
      } else {
        createDeliveryOrderLogysto(order);
      }
    } else {
      navigate(ROUTES.PAYMENT_CONFIRMATION_CASH);
    }
  };

  const saveDeliveryDate = (dateStr: string | null) => {
    const value = dateStr === null ? null : new Date(dateStr);
    setReceptionInformation({
      deliveryDate: value,
    });
  };

  const onGoToPay = (formInfo: DepositInformationPayload) => {
    setDepositInformation(formInfo);
    createEvents(formInfo);
    setIsUpdatingTransaction(true);
    newDatadogLog("WebPagosInformation", {
      userId,
      email,
      phoneNumber,
      ...formInfo,
      step: 4,
    });

    if (
      formInfo.methodsPaymentType === MethodPayment.CASH_PAYMENT &&
      !formInfo.isHunterImmediatePayment
    ) {
      generateEvent({
        eventName: "WebPagosUponDeliveryCash",
      });

      newBrazeRevenueEvent(
        purchaseSummary.mposValue,
        "COP",
        purchaseSummary.mposQuantity,
        {
          userId: isLogged
            ? basicInformation.userId
            : temporalCredentials.userId,
          celular: basicInformation.phoneNumber.number,
          eventName: WebPagosPaymentsUponDelivery,
        }
      );
      generateEvent({
        eventName: "WebPagosPaymentsUponDelivery",
        eventArgs: {
          businessName,
          category,
          document,
          documentType,
          expeditionDate,
          nit,
          storeId,
          storeName,
          subcategory,
          typePerson,
          accountNumber: formInfo.accountNumber,
          accountType: formInfo.accountType,
          bankDescription: formInfo.bankDescription,
          bankId: formInfo.bankId,
          methodsPayment: formInfo.methodsPayment,
          methodsPaymentType: formInfo.methodsPaymentType,
          address,
          addressDetail,
          addressPrefix,
          anotherName,
          anotherPerson,
          anotherPhone,
          city,
          cityCode,
          neighborhood,
          state,
          mposQuantity,
          mposValue,
        },
      });
    }
  };

  useEffect(() => {
    if (!depositInformation.isComplete || !isUpdatingTransaction) return;

    getStoreService({
      url: `/service?store_id=${
        isLogged ? businessInformation.storeId : temporalCredentials.storeId
      }&service_type_id=${ServiceTypes.PAYMENT_LINKS}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositInformation, isUpdatingTransaction]);

  useEffect(() => {
    return () => {
      sourceGetStoreService.cancel();
      upsertTransactionSource.cancel();
      sourceUpdateStoreService.cancel();
      createTempTransactionSource.cancel();
      createDeliveryOrderLogystoSource.cancel();
      createEnrollmentTransaccionSource.cancel();
      scheduleDeliveryOrderLogystoSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DepositData
      isLoading={
        isLoadingGetStoreService ||
        isLoadingUpdateStoreService ||
        upsertTransactionIsLoading ||
        createTempTransactionIsloading ||
        createDeliveryOrderLogystoIsloading ||
        isLoadingCreateEnrollmentTransaccion ||
        scheduleDeliveryOrderLogystoIsloading
      }
      document={document || nit}
      documentType={documentType}
      bankId={bankId}
      bankDescription={bankDescription}
      accountNumber={accountNumber}
      methodsPaymentType={methodsPaymentType}
      accountType={accountType}
      saveDeliveryDate={saveDeliveryDate}
      onGoToPay={(formInfo) => onGoToPay(formInfo)}
      isHunter={isHunters}
    />
  );
};
