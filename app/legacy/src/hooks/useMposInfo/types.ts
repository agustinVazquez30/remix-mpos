import { IUseQueryOptions } from "~/legacy/src/hooks/useQuery";

export enum PARAMETERS {
  MposValue = "MPOS_ITEM_PRICE_CO",
  MposProduct = "MPOS_ITEM_NAME_CO",
  MposTax = "MPOS_ITEM_TAX_VALUE_CO",
  MposCostShipping = "MPOS_ITEM_SHIPPING_COST_CO",
}

type MposDataKeys =
  | "mPosTax"
  | "mPosValue"
  | "mPosProduct"
  | "mPosCostShipping";

export const PARAMETERS_KEYS: Record<PARAMETERS, MposDataKeys> = {
  [PARAMETERS.MposTax]: "mPosTax",
  [PARAMETERS.MposValue]: "mPosValue",
  [PARAMETERS.MposProduct]: "mPosProduct",
  [PARAMETERS.MposCostShipping]: "mPosCostShipping",
};

export type ParametersResponse = {
  data: { key: PARAMETERS; value: any }[];
};

export type MPosData = Record<MposDataKeys, string>;

export type UseMposInfo = (
  config: Partial<IUseQueryOptions<ParametersResponse>>
) => MPosData & { isLoading: boolean };
