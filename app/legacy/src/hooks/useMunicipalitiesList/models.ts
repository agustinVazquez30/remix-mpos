export type StateOption = {
  stateCode: string;
  stateName: string;
  countryCode: string;
  countryName: string;
};

export type MunicipalityOption = StateOption & {
  stateId?: string;
  cityCode: string;
  cityName: string;
  rateCode: string;
  rateIca?: number;
  createdAt: string;
  updatedAt: string;
};
