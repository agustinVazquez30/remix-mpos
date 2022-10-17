export type LocationSubOption = {
  id: number | string;
  label: string;
  taxValue: number;
};

export type LocationOption = {
  id: number | string;
  label: string;
  subOptions: LocationSubOption[];
};

export type IVAOption = {
  id: number | string;
  label: string;
  value: number;
};

export type PaymentCalculatorProps = {
  goToOrder: () => void;
  onChangeValue: (value: number) => void;
  onChangeIVA: (value: number) => void;
  onCalculate: (reteICAPercentage: number) => void;
  onRestart: () => void;
  options?: LocationOption[];
  enableLocation: boolean;
  treintaCommisionValue?: number;
  beforeTaxesValue?: number;
  reteICAValue?: number;
  reteIVAValue?: number;
  reteFuenteValue?: number;
  lawsTaxes?: number;
  IVAValue?: number;
  receivedValue?: number;
  IVAOptions?: IVAOption[];
  defaultIVAOption?: IVAOption;
};
