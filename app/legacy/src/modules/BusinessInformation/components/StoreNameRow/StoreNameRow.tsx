import {
  InputBase,
  TreintaDropdownOptions,
  TreintaDropdownType,
} from "@30sas/web-ui-kit-core";
import React, { useEffect } from "react";
import { CustomDropDown } from "~/legacy/src/commons/styles/CustomDropdown";
import { Row } from "~/legacy/src/modules/BusinessInformation/styles";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { defaultStores } from "~/legacy/src/modules/BusinessInformation/utils";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useTranslation } from "react-i18next";
import { useUserStores } from "~/legacy/src/hooks";

export const StoreNameRow = ({ store, setStore }: any) => {
  const { t } = useTranslation();
  const { isLogged, splitIOKeyValue, basicInformation } = useAppContext();

  const isTestingDropdown =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationNoLoginPOS] && isLogged;

  const rowLabel = t(
    isTestingDropdown
      ? "businessInformation.storeInTreinta.dropdownLabel"
      : isLogged
      ? "businessInformation.storeInTreinta.label"
      : "businessInformation.storeName.label"
  );

  const {
    data: userStores,
    refetch: getUserStores,
    isLoading: getUserStoresIsLoading,
    source: getUserStoresSource,
  } = useUserStores({
    onSuccess: (stores) => {
      if (stores?.length && store.id && !store.label) {
        const selectedStore = stores.find(({ id }) => id === store.id);

        if (selectedStore) {
          setStore({
            id: selectedStore.id,
            label: selectedStore.name,
          });
        }
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStore({
      ...store,
      label: e.target.value,
    });

  const handleChangeDropdown = (e: TreintaDropdownOptions) => {
    setStore({
      ...store,
      label: e.label,
    });
  };

  useEffect(() => {
    if (basicInformation.userId && (isTestingDropdown || !store.label)) {
      getUserStores();
    }

    return () => {
      getUserStoresSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropdownData = userStores
    ? defaultStores.concat(
        userStores.map(({ id, name }) => ({
          id,
          label: name,
        }))
      )
    : [];

  return (
    <Row style={isTestingDropdown ? { gridArea: "firstRow" } : {}}>
      {isTestingDropdown && dropdownData.length ? (
        <CustomDropDown
          label={rowLabel}
          maxWidth="336px"
          value={store.label}
          onChange={handleChangeDropdown}
          className="custom-input"
          dropdownOptions={dropdownData}
          disabled={getUserStoresIsLoading}
          typeRenderItem={TreintaDropdownType.OnlyLetter}
          defaultValue={store.label || defaultStores[0].label}
        />
      ) : (
        <div className="custom-input">
          <InputBase
            name="store"
            label={rowLabel}
            value={store.label}
            onChange={handleChange}
            disabled={isLogged || getUserStoresIsLoading}
            placeholder={t("businessInformation.storeName.placeholder")}
          />
        </div>
      )}
    </Row>
  );
};
