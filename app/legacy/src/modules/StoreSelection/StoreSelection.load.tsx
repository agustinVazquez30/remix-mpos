import {
  AppContext,
  MposPurchaseInformationPayload,
} from "~/legacy/src/contexts/AppContext";
import {
  ROUTES,
  Store,
  TransactionStatus,
  TransactionTypes,
} from "~/legacy/src/constants";
import { useContext, useEffect, useState } from "react";

import { useQuery, useUserStores } from "~/legacy/src/hooks";
import { StoreSelection } from "./StoreSelection";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";

export const StoreSelectionLoad = (): JSX.Element => {
  const { navigate } = useAllowedNavigation();
  const {
    isLogged,
    setHasPreviousPurchase,
    setStoreInformation,
    setMPOSPaymentInformation,
  } = useContext(AppContext);
  const [stores, setStores] = useState<{ label: string; id: string }[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const onSelect = (selectedStore: Store): void => {
    setisLoading(true);
    setStoreInformation({
      storeId: selectedStore.id,
      storeName: selectedStore.label,
    });

    getLastMposPurchase({
      url: `/transaction/by-store/${selectedStore.id}?select=paymentsData&transactionTypeId=${TransactionTypes.MPOS_PURCHASE}&transactionStatusId=${TransactionStatus.PAID}`,
    });
  };

  const {
    isLoading: getUserStoresIsLoading,
    refetch: getUserStores,
    source: getUserStoresSource,
  } = useUserStores({
    onSuccess: (response) => {
      const fetchedStores = response;

      if (fetchedStores?.length) {
        const filteredStores = fetchedStores.map(({ id, name }) => ({
          id,
          label: name,
        }));

        setStores(filteredStores);
      }
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  const {
    isLoading: getLastMposPurchaseIsLoading,
    refetch: getLastMposPurchase,
    source: getLastMposPurchaseSource,
  } = useQuery<{
    transactions: {
      paymentsData: string;
    }[];
  }>({
    api: "orchestrator",
    requestData: {
      url: `/transaction/by-store/:storeId`,
      method: "GET",
    },
    onSuccess: ({ transactions }) => {
      const filteredTransactions = transactions.filter(
        (trx) => trx.paymentsData
      );

      if (filteredTransactions.length) {
        const [{ paymentsData }] = filteredTransactions;

        let mPosPaymentInformation: MposPurchaseInformationPayload;

        try {
          mPosPaymentInformation = JSON.parse(paymentsData);
        } catch (error) {
          mPosPaymentInformation = {} as MposPurchaseInformationPayload;
        }

        setMPOSPaymentInformation(mPosPaymentInformation);
        setHasPreviousPurchase();
      }

      setTimeout(() => {
        navigate(ROUTES.PURCHASE_ORDER, { replace: true });
        setisLoading(false);
      }, 300);
    },
    onError: () => {
      navigate(ROUTES.ERROR_VERIFYING);
    },
  });

  useEffect(() => {
    if (!isLogged) return navigate(ROUTES.HOME, { replace: true });
    getUserStores();
    return () => {
      getUserStoresSource.cancel();
      getLastMposPurchaseSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreSelection
      isLoading={
        isLoading || getUserStoresIsLoading || getLastMposPurchaseIsLoading
      }
      stores={stores}
      onSelect={onSelect}
    />
  );
};
