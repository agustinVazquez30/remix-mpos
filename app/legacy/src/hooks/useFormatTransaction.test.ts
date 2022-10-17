import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";

import { PaymentTypes } from "~/legacy/src/constants";
import { getUUID } from "~/legacy/src/utils/generators";
import { renderHook } from "~/legacy/src/utils/tests";
import { useFormatTransaction } from "./useFormatTransaction";
import { waitFor } from "@testing-library/react";

jest.mock("~/legacy/src/utils/generators", () => ({
  getUUID: jest.fn(),
}));

describe("useLogout", () => {
  test("should return getFormattedTransction function", async () => {
    const { result } = renderHook(() => useFormatTransaction(), {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          isLogged: true,
        },
      },
    });

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        getFormattedTransaction: result.current.getFormattedTransaction,
      });
    });
  });

  test("should return formatted Transaction based on AppContext", async () => {
    const userId = "123abc";
    const storeId = "456def";
    const newTransactionId = "678ghi";
    const currentTime = new Date(2022, 3, 1);
    const paymentData =
      '{"loginType":null,"uid":"","isNewUser":false,"purchaseSummary":{"mposProduct":"","mposQuantity":1,"mposValue":0,"costOfShipping":0,"total":0,"isComplete":false},"basicInformation":{"userId":"123abc","firstName":"","lastName":"","phoneNumber":{"countryId":1,"countryCode":"+57","number":""},"email":"","isComplete":false},"businessInformation":{"storeId":"456def","storeName":"","category":-1,"subcategory":-1,"businessName":null,"document":"","documentType":-1,"nit":"","typePerson":1,"expeditionDate":"","isComplete":false,"storeDocumentTypeId":-1},"shipmentInformation":{"state":"","city":"","addressPrefix":"","address":"","addressDetail":"","neighborhood":"","anotherPerson":false,"anotherName":"","anotherPhone":"","isComplete":false},"depositInformation":{"bankId":-1,"bankDescription":"","accountType":1,"accountNumber":"","isHunterImmediatePayment":false,"methodsPaymentType":2,"methodsPayment":"","isComplete":false},"deliveryDate":"2022/08/29"}';

    (getUUID as jest.Mocked<any>).mockReturnValue(newTransactionId);
    jest.spyOn(Date, "now").mockReturnValue(currentTime.getTime());

    const { result } = renderHook(() => useFormatTransaction(), {
      contexts: {
        appContext: {
          ...defaultAppActions,
          ...defaultAppState,
          isLogged: true,
          basicInformation: {
            ...defaultAppState.basicInformation,
            userId,
          },
          businessInformation: {
            ...defaultAppState.businessInformation,
            storeId,
          },
          receptionInformation: {
            ...defaultAppState.receptionInformation,
            deliveryDate: new Date(2022, 7, 29),
          },
        },
      },
    });

    await waitFor(() => {
      expect(
        result.current.getFormattedTransaction({ isNewTransaction: true })
      ).toMatchObject({
        date: currentTime.getTime(),
        delivery_price: 0,
        description: "Compra Datáfono Treinta",
        id: newTransactionId,
        is_offline: false,
        origin_id: 12,
        payment_type_id: PaymentTypes.PAYMENT_LINK,
        payments_data: paymentData,
        store_id: storeId,
        transaction_status_id: 2,
        transaction_type_id: 7,
        user_id: userId,
        value: 0,
      });
    });
  });
});
