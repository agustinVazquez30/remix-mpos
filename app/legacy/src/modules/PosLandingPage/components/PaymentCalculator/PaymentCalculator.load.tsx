import {
  DefaultIVAOption,
  IVAOptions,
  ReteFuentePercentage,
  ReteIVA,
  TreintaPercentage,
} from "./constants";
import { FC, useEffect, useState } from "react";
import { PaymentCalculator } from "./PaymentCalculator";
import { ROUTES } from "~/legacy/src/constants";
import { getBasicInfoProperties } from "~/legacy/src/utils/getEventProperties";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const ONE_HUNDRED = 100;

export const PaymentCalculatorLoad: FC = (): JSX.Element => {
  const [value, setValue] = useState<number>(0);
  const [beforeTaxes, setBeforeTaxes] = useState<number>(0);
  const [received, setReceived] = useState<number>(0);
  const [treinta, setTreinta] = useState<number>(0);
  const [reteICA, setReteICA] = useState<number>(0);
  const [lawsTaxes, setLawsTaxes] = useState<number>(0);
  const [reteFuente, setReteFuente] = useState<number>(0);
  const [reteIVA, setReteIVA] = useState<number>(0);
  const [IVA, setIVA] = useState<number>(0);
  const [IVAPercentage, setIVAPercentage] = useState<number>(
    DefaultIVAOption.value
  );
  const [selectedReteICAPercentage, setSelectedReteICAPercentage] =
    useState<number>(0);
  const [isEnabledLocation, setIsEnabledLocation] = useState<boolean>(true);
  const navigate = useNavigate();
  const { basicInformation, utmParameters } = useAppContext();

  useEffect(() => {
    if (value && selectedReteICAPercentage) {
      calculate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, selectedReteICAPercentage, IVAPercentage]);

  const goToOrder = (): void => {
    navigate(ROUTES.PURCHASE_ORDER);
  };

  const handleOnChangeValue = (value: number): void => {
    setValue(value);
  };

  const handleOnCalculate = (reteICAPercentage: number): void => {
    setSelectedReteICAPercentage(reteICAPercentage);
    setIsEnabledLocation(false);
  };

  const calculate = (): void => {
    const IVAValue = calculatePercentage(value, IVAPercentage);
    setIVA(IVAValue);

    const treintaValue = calculatePercentage(value, TreintaPercentage);
    setTreinta(treintaValue);
    setBeforeTaxes(value - treintaValue);

    const valueWithoutIVA = value - IVAValue;
    const reteICAValue = calculatePercentage(
      valueWithoutIVA,
      selectedReteICAPercentage
    );
    setReteICA(reteICAValue);

    const reteFuenteValue = calculatePercentage(
      valueWithoutIVA,
      ReteFuentePercentage
    );
    setReteFuente(reteFuenteValue);

    const reteIVAValue = calculatePercentage(IVAValue, ReteIVA);
    setReteIVA(reteIVAValue);

    const lawsTaxesValue = round(reteICAValue + reteIVAValue + reteFuenteValue);
    setLawsTaxes(lawsTaxesValue);

    const receivedValue = round(value - lawsTaxesValue - treintaValue);
    setReceived(receivedValue);
    setIsEnabledLocation(false);
    newAmplitudeEvent("WebPagosCalculador", {
      ...getBasicInfoProperties(basicInformation),
      utmParameters,
    });
  };

  const round = (value: number): number =>
    Math.round(value * ONE_HUNDRED) / ONE_HUNDRED;

  const calculatePercentage = (value: number, percentage: number): number => {
    const result = (value * percentage) / ONE_HUNDRED;
    return result % 1 ? round(result) : result;
  };

  const handleOnRestart = (): void => {
    setTreinta(0);
    setBeforeTaxes(0);
    setReteICA(0);
    setReteFuente(0);
    setLawsTaxes(0);
    setReceived(0);
    setSelectedReteICAPercentage(0);
    setIsEnabledLocation(true);
  };

  return (
    <PaymentCalculator
      goToOrder={goToOrder}
      onChangeValue={handleOnChangeValue}
      onChangeIVA={setIVAPercentage}
      onCalculate={handleOnCalculate}
      onRestart={handleOnRestart}
      enableLocation={isEnabledLocation}
      treintaCommisionValue={treinta}
      reteICAValue={reteICA}
      reteIVAValue={reteIVA}
      reteFuenteValue={reteFuente}
      receivedValue={received}
      lawsTaxes={lawsTaxes}
      IVAValue={IVA}
      beforeTaxesValue={beforeTaxes}
      IVAOptions={IVAOptions}
      defaultIVAOption={DefaultIVAOption}
    />
  );
};
