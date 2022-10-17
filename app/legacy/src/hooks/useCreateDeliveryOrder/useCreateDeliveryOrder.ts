import { MethodPayment, Origins } from "~/legacy/src/constants";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import { DeliveryOrderServiceInput } from "./models";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export const useCreateDeliveryOrder = () => {
  const {
    isLogged,
    purchaseSummary,
    basicInformation,
    businessInformation,
    shipmentInformation,
    depositInformation,
    temporalCredentials,
  } = useContext(AppContext);

  const { methodsPaymentType } = depositInformation;
  const { mposQuantity, mposValue } = purchaseSummary;
  const { firstName, lastName, phoneNumber } = basicInformation;
  const {
    cityCode,
    address,
    addressDetail,
    addressPrefix,
    anotherPerson,
    anotherName,
    anotherPhone,
    neighborhood,
  } = shipmentInformation;

  const DEFAULT_PRICE = 0;

  const { t } = useTranslation();

  const getAddressDetails = () => {
    const detailsArray = [];
    if (addressDetail?.length > 0) detailsArray.push(addressDetail);
    if (neighborhood?.length > 0)
      detailsArray.push(
        `${t("deliveryOrder.neighborhoodName")}: ${neighborhood}`
      );
    return detailsArray.join(", ");
  };

  const getDeliveryOrderInput = (
    shipmentOrder: string
  ): { data: DeliveryOrderServiceInput } => {
    const storeId = isLogged
      ? businessInformation.storeId
      : temporalCredentials.storeId;

    const price =
      methodsPaymentType === MethodPayment.CASH_PAYMENT
        ? mposQuantity * mposValue
        : DEFAULT_PRICE;

    const userName = anotherPerson ? anotherName : firstName + " " + lastName;
    const userPhone = anotherPerson ? anotherPhone : phoneNumber.number;

    return {
      data: {
        address: addressPrefix + " " + address,
        cityCode: cityCode ?? "",
        details: getAddressDetails(),
        originId: `${Origins.MPOS}`,
        price,
        quantity: `${mposQuantity}`,
        shipmentOrder,
        storeId,
        userName,
        userPhone,
      },
    };
  };

  return {
    getDeliveryOrderInput,
  };
};
