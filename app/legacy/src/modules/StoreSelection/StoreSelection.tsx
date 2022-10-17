import { Dropdown, TreintaDropdownType } from "@30sas/web-ui-kit-core";
import { Spinner, TreintaCard } from "~/legacy/src/commons/components";

import { Container } from "./styles";
import { Store } from "~/legacy/src/constants";
import { placeholderStore } from "./constants";
import { useTranslation } from "react-i18next";

type StoreSelectionType = {
  isLoading: boolean;
  stores: Store[];
  onSelect: (store: Store) => void;
};

export const StoreSelection = ({
  isLoading,
  stores,
  onSelect,
}: StoreSelectionType): JSX.Element => {
  const { t } = useTranslation();

  const handleOnSelect = (value: string): void => {
    const selectedStore = stores.find((store) => store.label === value);

    if (selectedStore) {
      onSelect(selectedStore);
    }
  };

  return (
    <TreintaCard
      testId={"store-selection-card"}
      title={t("storeSelection.title")}
    >
      <Container>
        <Dropdown
          dataTestId="store-dropdown"
          label={t("storeSelection.inputLabel")}
          helpText={t("storeSelection.inputHelp")}
          dropdownOptions={[placeholderStore, ...stores]}
          maxWidth={"100%"}
          typeRenderItem={TreintaDropdownType.OnlyLetter}
          onChange={({ label }) => handleOnSelect(label as string)}
          defaultValue={placeholderStore.label}
        />
      </Container>
      {isLoading && (
        <Spinner fullScreen={true} testId="store-selection-spinner" />
      )}
    </TreintaCard>
  );
};
