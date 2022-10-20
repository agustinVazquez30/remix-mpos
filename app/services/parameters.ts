import { httpClientPayments } from "~/legacy/src/config/Api";

export enum PARAMETERS {
  mposValue = "MPOS_ITEM_PRICE_CO",
  mposProduct = "MPOS_ITEM_NAME_CO",
  mposTax = "MPOS_ITEM_TAX_VALUE_CO",
  costOfShipping = "MPOS_ITEM_SHIPPING_COST_CO",
}

export const PARAMETERS_KEYS: Record<PARAMETERS, any> = {
  [PARAMETERS.mposTax]: "mposTax",
  [PARAMETERS.mposValue]: "mposValue",
  [PARAMETERS.mposProduct]: "mposProduct",
  [PARAMETERS.costOfShipping]: "costOfShipping",
};

export const parseApiData = (parameters: any[]): any | null => {
  const params = parameters
    .filter(
      (param) =>
        param.key &&
        Object.keys(PARAMETERS_KEYS).some((key) => key === param.key)
    )
    .map((param) => [(PARAMETERS_KEYS as any)[param.key as any], param.value]);

  if (!params.length) {
    return null;
  }

  const mappedData = Object.fromEntries(params);
  const { mposValue, costOfShipping, ...rest } = mappedData;

  return {
    ...rest,
    mposValue: Number(mposValue),
    costOfShipping: Number(costOfShipping),
  };
};

export const getParams = async () => {
  try {
    const response = await httpClientPayments().get("parameters");
    return parseApiData(response.data.data);
  } catch {
    return [];
  }
};
