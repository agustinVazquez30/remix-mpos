import {
  Button,
  Dropdown,
  InputBase,
  TreintaDropdownType,
  Typography,
} from "@30sas/web-ui-kit-core";
import { FC, useMemo, useState } from "react";
import { Container } from "./styles";
import { IVAOption } from "./models";
import ImgAdd from "~/legacy/src/assets/pos-landing/add.svg";
import ImgCalculator from "~/legacy/src/assets/pos-landing/commission_mpos.png";
import ImgDeduct from "~/legacy/src/assets/pos-landing/deduct.svg";
import ImgEqual from "~/legacy/src/assets/pos-landing/equal.svg";
import ImgFaq from "~/legacy/src/assets/pos-landing/faq.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PaymentCalculatorProps } from "./models";
import { useMunicipalitiesList } from "~/legacy/src/hooks";
import { useTranslation } from "react-i18next";
import { validateCommissionCity } from "~/legacy/src/utils/validations";

const leftInputSymbol = "$";
const round = (value: number) => Math.round(value * 1000000) / 10000;

export const PaymentCalculator: FC<PaymentCalculatorProps> = ({
  goToOrder,
  onChangeValue,
  onChangeIVA,
  onCalculate,
  onRestart,
  enableLocation,
  beforeTaxesValue,
  treintaCommisionValue,
  reteICAValue,
  reteIVAValue,
  reteFuenteValue,
  lawsTaxes,
  IVAValue,
  receivedValue,
  IVAOptions = [],
  defaultIVAOption,
}): JSX.Element => {
  const { t } = useTranslation();
  const [stringValue, setStringValue] = useState<string>(`${leftInputSymbol} `);
  const [selectedIVA, setSelectedIVA] = useState<IVAOption | undefined>(
    defaultIVAOption
  );
  const {
    isLoadingMunicipalities,
    municipalityOptions,
    selectedMunicipality,
    selectedState,
    setSelectedMunicipality,
    setSelectedState,
    stateOptions,
  } = useMunicipalitiesList();

  const extractNumber = (value: string): number => {
    const cleanedValue = value
      .replace(/\s/g, "")
      .replace(leftInputSymbol, "")
      .replace(/\./g, "");
    if (Number.isNaN(cleanedValue)) throw Error();
    return +cleanedValue;
  };

  const addDotsAndSymbol = (value: number): string =>
    `${leftInputSymbol} ${value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  const formatCurrencyNumber = (value: number): string => {
    const valueParts = `${value}`.split(".");
    if (valueParts.length > 1) {
      return `${addDotsAndSymbol(Number.parseInt(valueParts[0]))},${
        valueParts[1]
      }`;
    }
    return addDotsAndSymbol(value);
  };

  const handleOnChangeValue = (newValue: string): void => {
    if (newValue === `${leftInputSymbol} `) {
      onChangeValue(0);
      setStringValue(newValue);
    }
    try {
      const number = extractNumber(newValue);
      if (number > 0) {
        setStringValue(formatCurrencyNumber(number));
        onChangeValue(number);
      }
    } catch {}
  };

  const handleSelectOption = (label: string): void => {
    const newState = stateOptions.find((option) => option.stateName === label);
    setSelectedState(newState);
  };

  const handleSelectIVA = (label: string): void => {
    const selectedOption = IVAOptions.find(
      (IVAOption) => IVAOption.label === label
    )!;
    setSelectedIVA(selectedOption);
    onChangeIVA(selectedOption.value);
  };

  const handleSelectSubOption = (label: string): void => {
    const newOption = municipalityOptions.find(
      (option) => option.cityName === label
    );
    setSelectedMunicipality(newOption);
  };

  const renderInfoSection: JSX.Element = (
    <>
      <Typography className="commissionLabel" variant="Smallbold">
        {t("posLandingPage.saleCalculator.IVAOf")} {selectedIVA?.value ?? 0}%:
      </Typography>
      <div className="infoRowIVA">
        <LazyLoadImage alt="IVAIcon" className="imgValue" src={ImgAdd} />
        <Typography className="commissionValue" variant="Small">
          {formatCurrencyNumber(IVAValue ?? 0)}
        </Typography>
      </div>
      <Typography className="commissionLabel" variant="Smallbold">
        {t("posLandingPage.saleCalculator.treintasCommission")}:
      </Typography>
      <div className="infoRow">
        <LazyLoadImage
          alt="treintaCommissionIcon"
          className="imgValue"
          src={ImgDeduct}
        />
        <Typography className="commissionValue" variant="Small">
          {formatCurrencyNumber(treintaCommisionValue ?? 0)}
        </Typography>
      </div>
      <Typography className="beforeTaxesLabel" variant="Smallbold">
        {t("posLandingPage.saleCalculator.saleBeforeTaxes")}:
      </Typography>
      <div className="infoRow">
        <LazyLoadImage
          alt="beforeTaxesIcon1"
          className="imgValue"
          src={ImgEqual}
        />
        <Typography className="beforeTaxesValue" variant="Small">
          {formatCurrencyNumber(beforeTaxesValue ?? 0)}
        </Typography>
      </div>
      <Typography className="taxesTitle" variant="Mediumbold">
        {t("posLandingPage.saleCalculator.taxByLaw")}:
      </Typography>
      <div className="infoRow">
        <LazyLoadImage className="imgFaq" alt="faqIcon1" src={ImgFaq} />
        <Typography className="reteInfoLabel" variant="Smallbold">
          {t("posLandingPage.saleCalculator.reteICAWillBe")}:
        </Typography>
      </div>
      <Typography className="reteInfoValue" variant="Smallbold">
        {formatCurrencyNumber(reteICAValue ?? 0)}
      </Typography>
      <div className="infoRow">
        <LazyLoadImage className="imgFaq" alt="faqIcon2" src={ImgFaq} />
        <Typography className="reteInfoLabel" variant="Smallbold">
          {t("posLandingPage.saleCalculator.reteFuenteWillBe")}:
        </Typography>
      </div>
      <Typography className="reteInfoValue" variant="Smallbold">
        {formatCurrencyNumber(reteFuenteValue ?? 0)}
      </Typography>
      <div className="infoRow">
        <LazyLoadImage className="imgFaq" alt="faqIcon3" src={ImgFaq} />
        <Typography className="reteInfoLabel" variant="Smallbold">
          {t("posLandingPage.saleCalculator.reteIVAWillBe")}:
        </Typography>
      </div>
      <Typography className="reteInfoValue" variant="Smallbold">
        {formatCurrencyNumber(reteIVAValue ?? 0)}
      </Typography>
      <Typography className="lawTaxesLabel" variant="Smallbold">
        {t("posLandingPage.saleCalculator.lawsTaxes")}:
      </Typography>
      <div className="infoRow">
        <LazyLoadImage
          alt="beforeTaxesIcon2"
          className="imgValue"
          src={ImgDeduct}
        />
        <Typography className="beforeTaxesValue" variant="Small">
          {formatCurrencyNumber(lawsTaxes ?? 0)}
        </Typography>
      </div>
      <section className="alertSection">
        <div className="receiveContainer">
          <LazyLoadImage
            alt="receiveIcon"
            className="receiveIcon"
            src={ImgEqual}
          />
          <Typography className="receiveValue" variant="Small">
            {formatCurrencyNumber(receivedValue ?? 0)}
          </Typography>
        </div>
        <Typography variant="Smallbold" className="recieveLabel">
          {t("posLandingPage.saleCalculator.recieve")}
        </Typography>
      </section>
      <section className="buttonsSection">
        <Button
          label={`¡${t("posLandingPage.saleCalculator.order")}!`}
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={() => goToOrder()}
          fullWidth={true}
          disabled={false}
          className="buttonCalculate"
        />
        <Button
          label={t("posLandingPage.saleCalculator.recalculate")}
          color="neutrals"
          colorType="100"
          borderColor="gray"
          borderColorType="400"
          hoverColor="gray"
          hoverColorType="200"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="900"
          textVariant="Mediumbold"
          fullWidth={true}
          disabled={false}
          className="buttonRecalculate"
          onClick={onRestart}
        />
      </section>
    </>
  );

  const renderedStateOptions = useMemo(
    () =>
      stateOptions
        ?.filter((item) => {
          const response = validateCommissionCity(item.stateCode);
          return response === -1;
        })
        .map((option) => ({
          label: option.stateName,
          value: option.stateName,
        })) ?? [],
    [stateOptions]
  );

  const renderedMunicipalitiesOptions = useMemo(
    () =>
      municipalityOptions
        ?.filter((item) => item.rateIca !== null)
        .map((subOption) => ({
          label: subOption.cityName,
          value: subOption.cityName,
        })) ?? [],
    [municipalityOptions]
  );

  const renderConfigSection: JSX.Element = (
    <>
      <Typography className="locationLabel" variant="Smallbold">
        {t("posLandingPage.saleCalculator.stateAndCity")}:
      </Typography>
      <Typography className="infoReteICA" variant="Small">
        {t("posLandingPage.saleCalculator.infoReteICA")}:
      </Typography>
      <div className="rowOptions">
        <div id="optionWrapper">
          {stateOptions?.length && (
            <Dropdown
              dropdownOptions={renderedStateOptions}
              dataTestId="optionDropdown"
              defaultValue={selectedState?.stateName}
              onChange={({ label }) => handleSelectOption(label as string)}
              multiple={false}
              maxWidth="900px"
              value={[selectedState?.stateName as string]}
              typeRenderItem={TreintaDropdownType.OnlyLetter}
            />
          )}
        </div>
        {selectedState && (
          <div id="subOptionWrapper">
            <Dropdown
              dropdownOptions={renderedMunicipalitiesOptions}
              dataTestId="subOptionDropdown"
              onChange={({ label }) => handleSelectSubOption(label as string)}
              multiple={false}
              maxWidth="900px"
              defaultValue={selectedMunicipality?.cityName}
              value={[selectedMunicipality?.cityName as string]}
              typeRenderItem={TreintaDropdownType.OnlyLetter}
              disabled={isLoadingMunicipalities}
            />
          </div>
        )}
      </div>
      <section className="buttonsSection">
        <Button
          label={t("posLandingPage.saleCalculator.calculateMySale")}
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={() => onCalculate(round(selectedMunicipality!.rateIca!))}
          fullWidth={true}
          disabled={isLoadingMunicipalities}
          className="buttonCalculate"
        />
      </section>
    </>
  );

  return (
    <Container id={t("anchorTags.calculatorAnchor")}>
      <Typography forwardedAs="h2" className="title" variant="XXXLargebold">
        {t("posLandingPage.saleCalculator.title")}
      </Typography>
      <section className="calculatorContainer">
        <LazyLoadImage
          className="imgCalculator"
          alt="calculator"
          src={ImgCalculator}
        />
        <section className="dataSection">
          <div className="dataContainer">
            <Typography className="titleSection" variant="Mediumbold">
              {t("posLandingPage.saleCalculator.calculateFirstSale")}
            </Typography>
            <div className="rowData">
              <div className="valueContainer">
                <LazyLoadImage alt="add" className="imgAdd" src={ImgAdd} />
                <div className="inputWrapper">
                  <InputBase
                    label={t("posLandingPage.saleCalculator.saleValue")}
                    rounded="md"
                    dataTestId="valueInput"
                    value={stringValue}
                    onChange={({ target }) => handleOnChangeValue(target.value)}
                  />
                </div>
              </div>
              {IVAOptions.length && (
                <div id="IVAWrapper">
                  <Dropdown
                    dropdownOptions={IVAOptions.map((IVAOption) => ({
                      label: IVAOption.label,
                      value: IVAOption.id,
                    }))}
                    dataTestId="IVADropdown"
                    label="IVA"
                    defaultValue={selectedIVA?.label}
                    onChange={(e) => handleSelectIVA(e.label as string)}
                    multiple={false}
                    maxWidth="900px"
                    value={[selectedIVA?.label as string]}
                    typeRenderItem={TreintaDropdownType.OnlyLetter}
                  />
                </div>
              )}
            </div>
            {enableLocation ? renderConfigSection : renderInfoSection}
          </div>
        </section>
      </section>
    </Container>
  );
};
