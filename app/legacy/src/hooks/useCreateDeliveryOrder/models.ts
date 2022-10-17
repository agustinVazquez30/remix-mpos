export interface DeliveryOrderServiceInput {
  address: string;
  details: string;
  cityCode: string;
  userName: string;
  userPhone: string;
  originId: string;
  storeId: string;
  quantity: string;
  shipmentOrder: string;
  collectionCenterCode?: string;
  price?: number;
}

export interface SuccessfullData {
  servicesCreated: number;
  storeId: string;
  createAt: string;
  address: string;
  details: string;
  cityCode: string;
  originId: string;
}

export interface FailedData {
  message?: string;
}

export interface DeliveryOrderServiceResponse {
  isCreated: boolean;
  data?: SuccessfullData | FailedData;
}
