import { AppActions, AppContextKeys, defaultAppState } from ".";

import { AppContextType } from "./models";
import { setItemToStorage } from "./utils";

export const getAppActions = (
  setAuthState: (value: React.SetStateAction<AppContextType>) => void
): AppActions => {
  const authActions: AppActions = {
    logIn: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...defaultAppState,
          ...state,
          isLogged: true,
          loginType: payload.loginType,
          uid: payload.uid,
          tokens: {
            ...state.tokens,
            idToken: payload.idToken,
          },
          basicInformation: {
            ...state.basicInformation,
            userId: payload.userId,
            email: payload.email || state.basicInformation.email,
            phoneNumber:
              payload.phoneNumber || state.basicInformation.phoneNumber,
            firstName: payload.firstName || state.basicInformation.firstName,
            lastName: payload.lastName || state.basicInformation.lastName,
          },
          businessInformation: {
            ...state.businessInformation,
            storeId: payload.storeId || state.businessInformation.storeId,
          },
        };
        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    logOut: () => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          ...defaultAppState,
          persisted: true,
        };
        setItemToStorage(AppContextKeys.APP, "");

        return newState;
      });
    },
    setIsWebView: () => {
      setAuthState((state) => {
        const newState = {
          ...state,
          isWebView: true,
        };
        localStorage.setItem(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setTransactionId: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          transactionId: payload,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setPurchaseSummary: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          purchaseSummary: {
            ...state.purchaseSummary,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setBasicInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          basicInformation: {
            ...state.basicInformation,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setBusinessInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          businessInformation: {
            ...state.businessInformation,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setShipmentInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          shipmentInformation: {
            ...state.shipmentInformation,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setDepositInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          depositInformation: {
            ...state.depositInformation,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setReceptionInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          receptionInformation: {
            ...state.receptionInformation,
            ...payload,
            isComplete: true,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setStoreInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          businessInformation: {
            ...state.businessInformation,
            storeName: payload.storeName,
            storeId: payload.storeId,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setTemporalCredentials: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          temporalCredentials: {
            ...state.temporalCredentials,
            isComplete: true,
            storeId: payload.storeId,
            userId: payload.userId,
            userFirebaseId: payload.userFirebaseId,
            loginType: payload.loginType,
          },
        };
        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setMPOSPaymentInformation: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          purchaseSummary: payload.purchaseSummary,
          basicInformation: {
            ...state.basicInformation,
            ...payload.basicInformation,
            userId: state.basicInformation.userId,
          },
          businessInformation: {
            ...state.businessInformation,
            ...payload.businessInformation,
            storeId: state.businessInformation.storeId,
          },
          shipmentInformation: payload.shipmentInformation,
          depositInformation: payload.depositInformation,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setHasPreviousPurchase: () => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          hasPreviousPurchase: true,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setHasAcceptedPurchasedOrder: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          hasAcceptedPurchasedOrder: payload,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setUtmParameters: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          utmParameters: payload,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setIsHunters: (payload) => {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          isHunters: payload,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setHuntersData(payload) {
      setAuthState((state) => {
        const newState: AppContextType = {
          ...state,
          hunter: {
            ...state.hunter,
            ...payload,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setSplitIOKeyValue: (payload) => {
      setAuthState((state) => {
        const newState = {
          ...state,
          splitIOKeyValue: {
            ...state.splitIOKeyValue,
            ...payload,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    setIdToken: (payload) => {
      setAuthState((state) => {
        const newState = {
          ...state,
          tokens: {
            idToken: payload,
          },
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
    resetContext: () => {
      setAuthState((state) => {
        const newState = {
          ...state,
          ...defaultAppState,
        };

        setItemToStorage(AppContextKeys.APP, JSON.stringify(newState));

        return newState;
      });
    },
  };

  return authActions;
};
