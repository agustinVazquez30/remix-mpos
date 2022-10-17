import { AddressRow, Container, Row, RowButton } from "./styles";
import {
  Alert,
  Button,
  CheckBox,
  Dropdown,
  InputBase,
  TreintaDropdownType,
  Typography,
} from "@30sas/web-ui-kit-core";
import {
  ShipmentInformationPayload,
  ShipmentInformationState,
} from "~/legacy/src/contexts/AppContext";
import { isValidAddress, isValidLengthAddress } from "./utils";
import { useEffect, useState } from "react";

import { RoadTypes } from "~/legacy/src/constants";
import { ShippingCarIcon } from "@30sas/web-ui-kit-icons";
import { Spinner } from "~/legacy/src/commons/components";
import { depureNonLetterCharacters } from "~/legacy/src/commons/validations";
import { isAlphabetic } from "~/legacy/src/utils/validations";
import { isColombianCellPhone } from "~/legacy/src/utils/typeValidations";
import { useTranslation } from "react-i18next";

type ShipmentInformationProps = {
  initValues: ShipmentInformationState;
  isLoading: boolean;
  onNextStep: (data: ShipmentInformationPayload) => void;
  states: { label: string; value: string }[];
  cities: { label: string; value: string }[];
  refetchCities: (stateName: string) => void;
  isLoadingCities: boolean;
};

export const ShipmentInformation = ({
  initValues: {
    state: stateSaved,
    city: citySaved,
    addressPrefix: addressPrefixSaved,
    address: addressSaved,
    addressDetail: addressDetailSaved,
    anotherPerson: anotherPersonSaved,
    neighborhood: neighborhoodSaved,
    anotherName: anotherNameSaved,
    anotherPhone: anotherPhoneSaved,
  },
  isLoading,
  onNextStep,
  states,
  cities,
  refetchCities,
  isLoadingCities,
}: ShipmentInformationProps) => {
  const { t } = useTranslation();
  const [continueActive, setContinueActive] = useState(false);
  const [state, setState] = useState(!!stateSaved ? stateSaved : "");
  const [city, setCity] = useState(!!citySaved ? citySaved : "");
  const [addressPrefix, setAddressPrefix] = useState(
    !!addressPrefixSaved ? addressPrefixSaved : ""
  );
  const [address, setAddress] = useState(addressSaved);
  const [addressDetail, setAddressDetail] = useState(addressDetailSaved);
  const [neighborhood, setNeighborhood] = useState(neighborhoodSaved);
  const [anotherPerson, setAnotherPerson] = useState(anotherPersonSaved);
  const [anotherName, setAnotherName] = useState(anotherNameSaved);
  const [anotherPhone, setAnotherPhone] = useState(anotherPhoneSaved);

  const handleChangeState = (stateName: string) => {
    setState(stateName);
    refetchCities(stateName);
    setCity("");
  };

  useEffect(() => {
    setContinueActive(
      isValidAddress(address) &&
        !!state &&
        !!city &&
        !!addressPrefix &&
        !!address &&
        (addressDetail ? isValidLengthAddress(addressDetail) : true) &&
        (neighborhood
          ? isAlphabetic(neighborhood) && isValidLengthAddress(neighborhood)
          : true) &&
        ((anotherPerson && !!anotherName) || !anotherPerson) &&
        ((anotherPerson &&
          !!anotherPhone &&
          isColombianCellPhone(anotherPhone)) ||
          !anotherPerson)
    );
  }, [
    state,
    city,
    addressPrefix,
    address,
    cities,
    anotherPerson,
    anotherName,
    anotherPhone,
    neighborhood,
    addressDetail,
  ]);

  const alertText = (
    <span>
      {t("shipmentInformation.alertText.init")}
      <strong>{t("shipmentInformation.alertText.end")}</strong>
    </span>
  );

  return (
    <Container>
      <Typography className="description" variant="XSmall">
        {t("shipmentInformation.description")}
      </Typography>
      <div className="alert">
        <Alert text={alertText} Icon={ShippingCarIcon} />
      </div>
      <Row>
        <Dropdown
          dropdownOptions={states}
          label={t("shipmentInformation.state.label")}
          placeholder={t("shipmentInformation.state.placeholder")}
          className="custom-input"
          maxWidth="336px"
          typeRenderItem={TreintaDropdownType.OnlyLetter}
          onChange={(e) => handleChangeState(e.label as string)}
          defaultValue={state || t("shipmentInformation.state.placeholder")}
          dataTestId="dropdown-state"
        />
        <Dropdown
          dropdownOptions={cities}
          label={t("shipmentInformation.city.label")}
          placeholder={t("shipmentInformation.city.placeholder")}
          className="custom-input"
          maxWidth="336px"
          typeRenderItem={TreintaDropdownType.OnlyLetter}
          defaultValue={
            isLoadingCities
              ? t("shipmentInformation.city.loadingPlaceholder")
              : city || t("shipmentInformation.city.placeholder")
          }
          onChange={(e) => setCity(e.label as string)}
          dataTestId="dropdown-city"
          disabled={isLoadingCities || !states || !states?.length}
        />
      </Row>
      <Row>
        <div>
          <Typography className="title-input" variant="Smallbold">
            {t("shipmentInformation.address.label")}
          </Typography>
          <AddressRow>
            <Dropdown
              dropdownOptions={RoadTypes}
              defaultValue={
                addressPrefix ||
                t("shipmentInformation.addressPrefix.placeholder")
              }
              onChange={(e) => setAddressPrefix(e.label as string)}
              typeRenderItem={TreintaDropdownType.OnlyLetter}
              dataTestId="dropdown-prefix"
              maxWidth="100px"
            />
            <div>
              <InputBase
                placeholder={t("shipmentInformation.address.placeholder")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!isValidAddress(address)}
                errorText={t("shipmentInformation.address.errorLengthChar")}
                type="text"
              />
            </div>
          </AddressRow>
        </div>
        <div className="custom-input">
          <InputBase
            placeholder={t("shipmentInformation.detailAddress.placeholder")}
            label={t("shipmentInformation.detailAddress.label")}
            onChange={(e) => setAddressDetail(e.target.value)}
            value={addressDetail}
            error={!isValidLengthAddress(addressDetail)}
            errorText={t("shipmentInformation.detailAddress.errorText")}
          />
        </div>
      </Row>

      <Row>
        <div className="custom-input">
          <InputBase
            placeholder={t("shipmentInformation.neighborhood.placeholder")}
            label={t("shipmentInformation.neighborhood.label")}
            value={neighborhood}
            error={
              neighborhood
                ? !isAlphabetic(neighborhood) ||
                  !isValidLengthAddress(neighborhood)
                : false
            }
            errorText={t("shipmentInformation.neighborhood.errorText")}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </div>
      </Row>

      <div className="input-checkbox">
        <CheckBox
          margin="0 0 0 -9px !important"
          checked={anotherPerson}
          name="another-person"
          onChange={(e) => setAnotherPerson(e.target.checked)}
        >
          {`${t("shipmentInformation.anotherPerson.label")}`}
        </CheckBox>
      </div>
      {anotherPerson && (
        <Row>
          <div className="custom-input">
            <InputBase
              placeholder={t("shipmentInformation.anotherName.placeholder")}
              label={t("shipmentInformation.anotherName.label")}
              value={anotherName}
              onChange={(e) =>
                setAnotherName(depureNonLetterCharacters(e.target.value))
              }
            />
          </div>
          <div className="custom-input">
            <InputBase
              placeholder={t("shipmentInformation.anotherPhone.placeholder")}
              label={t("shipmentInformation.anotherPhone.label")}
              value={anotherPhone}
              onChange={(e) => setAnotherPhone(e.target.value)}
              error={
                anotherPerson && !!anotherPhone
                  ? !isColombianCellPhone(anotherPhone)
                  : false
              }
              errorText={t("basicInformation.phoneInput.msgError")}
              type="number"
            />
          </div>
        </Row>
      )}
      <RowButton>
        <Button
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("commons.continue")}
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          className="next-button"
          disabled={!continueActive}
          onClick={() =>
            onNextStep({
              city,
              state,
              addressPrefix,
              address,
              addressDetail,
              neighborhood,
              anotherPerson,
              anotherName: depureNonLetterCharacters(anotherName, true),
              anotherPhone,
            })
          }
        />
      </RowButton>
      {isLoading && <Spinner fullScreen={true} />}
    </Container>
  );
};
