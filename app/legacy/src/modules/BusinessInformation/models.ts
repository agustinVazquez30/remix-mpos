import { ROUTES, ServiceStatus, TypePerson } from "~/legacy/src/constants";
import { BusinessCategory } from "../../commons/types/business-category.type";

export type BusinessInformationProps = {
  testId?: string;
  initValues: BusinessInformationType;
  isMailError: boolean;
  showAlreadyExistsModal: boolean;
  closeAlreadyExistsModal: () => void;
  onLogin: () => void;
  businessCategories: BusinessCategory[];
  firstName: string;
  lastName: string;
  isPosMetamap: boolean;
  isPosMetamapLoading: boolean;
};

export interface Store {
  id: string;
  label: string;
}

export interface BusinessInformationType {
  storeId: string;
  storeName: string;
  category: string;
  subcategory: string;
  nit: string;
  businessName: string;
  documentType: string;
  document: string;
  typePerson: TypePerson;
  expeditionDate: string;
}

export interface KYCProcess {
  storeId: string;
  userId: string;
  userFirebaseId: string;
  storeServiceId: string;
  serviceStatusId: ServiceStatus;
  redirectRoute: ROUTES;
}
