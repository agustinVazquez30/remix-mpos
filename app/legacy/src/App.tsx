import {
  AppContext,
  AppContextKeys,
  defaultAppContext,
  defaultAppState,
  getAppActions,
} from "~/legacy/src/contexts/AppContext";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { fetchAndActivate, getRemoteConfig } from "firebase/remote-config";
import { useEffect, useState } from "react";

import { AppContextType } from "~/legacy/src/contexts/AppContext/models";
import { Routes } from "./router";
import { Spinner } from "~/legacy/src/commons/components";
import { SplitIOTreatmentNamesLoading } from "~/legacy/src/config/SplitIo/models";
import TagManager from "react-gtm-module";
import { addHeaders } from "~/legacy/src/config/Api";
import { getItemFromStorage } from "~/legacy/src/contexts/AppContext/utils";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useSetupZendesk } from "~/legacy/src/utils/zendesk";
import { PosLadingPage, PurchaseOrder } from "./pages";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { Theme } from "./config/Theme";

export const App = () => {
  const [isReady, setIsReady] = useState(true);
  const [appState, setAppState] = useState<AppContextType>();
  const { isAllowedNavigation } = useAllowedNavigation();

  const { State: showZendeskChat, loading: loadingZendesk } = useSplitIO(
    SplitIOTreatmentNames.ActivationPOSCXZendesk
  );

  const {
    State: showNewPOSValuesLanding,
    loading: loadingNewPOSValuesLanding,
  } = useSplitIO(SplitIOTreatmentNames.ActivationPOSValuesLanding);

  const setPersistedAppInfo = async () => {
    const persistedAppInfo = getItemFromStorage(AppContextKeys.APP);
    const authActions = getAppActions(setAppState);

    let appState = defaultAppState;

    if (persistedAppInfo) {
      appState = JSON.parse(persistedAppInfo);
    }

    await addHeaders({
      idToken: appState.tokens.idToken,
      uid: appState.uid,
    });

    setAppState({
      ...appState,
      ...authActions,
      splitIOKeyValue: {
        [SplitIOTreatmentNames.ActivationPOSCXZendesk]: showZendeskChat,
        [SplitIOTreatmentNamesLoading.ActivationPOSCXZendeskLoading]:
          loadingZendesk,
        [SplitIOTreatmentNames.ActivationPOSValuesLanding]:
          showNewPOSValuesLanding,
        [SplitIOTreatmentNamesLoading.ActivationPOSValuesLandingLoading]:
          loadingNewPOSValuesLanding,
      },
      persisted: true,
    });
  };

  const activateRemoteConfig = async () => {
    const remoteConfig = getRemoteConfig();

    try {
      await fetchAndActivate(remoteConfig);
    } catch (error) {
      console.warn("failed to get remote configuration");
    }
  };

  const activateAndGetRemoteConfig = async () => {
    await activateRemoteConfig();
    setIsReady(true);
  };

  useSetupZendesk();

  return isReady ? (

        {/* <PosLadingPage /> */}
        <PurchaseOrder />

  ) : (
    <Spinner data-testId="spinner" />
  );
};
