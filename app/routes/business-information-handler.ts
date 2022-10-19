import { ActionFunction, json, redirect } from "@remix-run/node";
import {
  httpClientOrchestrator,
  httpClientTreintaApi,
} from "~/legacy/src/config/Api";
import { getUUID } from "~/legacy/src/utils/generators";
import {
  DOCUMENT_PEP_COL,
  Origins,
  ServiceStatus,
  ServiceTypes,
  TypePerson,
  UserStatus,
  UserTypes,
} from "~/legacy/src/constants";
import {
  Countries,
  StoreDocumentTypes,
} from "~/legacy/src/commons/enums/enums";
import { getStoreTypeByMCCSubcategoryId } from "~/legacy/src/commons/mccSubcategories";
import type { KYC_STATUS_ID } from "~/legacy/src/modules/BusinessInformation/constants";
import {
  isValidDocument,
  mappedKYCValidationStatus,
} from "~/legacy/src/modules/BusinessInformation/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let userId = getUUID();
  let storeId = getUUID();
  let storeServiceId = getUUID();
  const errors: { document?: string } = {};

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const store = formData.get("store");
  const document = formData.get("document");
  const documentTypeDescription = formData.get("documentTypeDescription");
  const nit = formData.get("nit");
  const documentType = Number(formData.get("documentType"));
  const typePerson = Number(formData.get("typePerson"));
  const subcategory = formData.get("subcategory");
  const expeditionDate = formData.get("expeditionDate") ?? "";

  if (!isValidDocument(documentTypeDescription as string, document as string)) {
    errors.document =
      "Confirma que la cantidad de dígitos/caracteres esté bien.";
  }

  if (Object.keys(errors).length) {
    return json({ errors }, { status: 422 });
  }

  const relatedStoreType = getStoreTypeByMCCSubcategoryId(Number(subcategory));

  try {
    const { data: user } = await httpClientOrchestrator().get(
      `/users/user/zendesk?email=${email}`
    );

    if (
      user.originId === Origins.MPOS &&
      user.userStatusId === UserStatus.Inactive
    ) {
      userId = user.id;
      storeId = user.stores?.[0];
    } else {
      await httpClientOrchestrator().post<{
        id: string;
        userStatusId: UserStatus;
        originId: Origins;
        stores: string[];
      }>("/mpos/accounts", {
        userInfo: {
          id: userId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          country_id: Countries.COLOMBIA,
          user_status_id: UserStatus.Inactive,
          origin_id: Origins.MPOS,
          is_offline: false,
        },
        storeInfo: {
          id: storeId,
          name: store,
          store_type_id: relatedStoreType,
          origin_id: Origins.MPOS,
          country_id: Countries.COLOMBIA,
          store_document_type_id: StoreDocumentTypes.NIT,
        },
        employeeRegister: {
          user_id: userId,
          store_id: storeId,
          user_type_id: UserTypes.OWNER,
          restrictions: "1",
        },
      });

      const { data: storeInfo } = await httpClientOrchestrator().post<any>(
        "/service/create-by-key",
        {
          id: storeServiceId,
          config: "",
          store_id: storeId,
          user_id: userId,
          service_status_id: ServiceStatus.INACTIVE,
          service_type_id: ServiceTypes.PAYMENT_LINKS,
        }
      );

      storeServiceId = storeInfo.id;
    }

    await httpClientOrchestrator().post("/validations/id", {
      validationType: "raw",
      userId,
      storeId,
      documentType,
      documentId: typePerson === TypePerson.NATURAL ? document : nit,
      issueDate: expeditionDate,
      firstName: documentType === DOCUMENT_PEP_COL ? firstName : "",
      lastName: documentType === DOCUMENT_PEP_COL ? lastName : "",
      countryCode: process.env.REACT_APP_COUNTRY,
    });

    const {
      data: { reviewStatus, score },
    } = await httpClientOrchestrator().get<{
      reviewStatus: KYC_STATUS_ID;
      score: number;
    }>(`/validations/${storeId}`);

    if (score === -1) {
      return redirect("/discarded");
    }

    const actions = mappedKYCValidationStatus[reviewStatus];

    if (actions) {
      const { data: res } = await httpClientTreintaApi().get<any>(
        `/service?store_id=${storeId}&service_type_id=${ServiceTypes.PAYMENT_LINKS}`
      );
      if (res.length) {
        storeServiceId = res[0].id;
      }

      await httpClientOrchestrator().put("/service/update-by-key", {
        id: storeServiceId,
        store_id: storeId,
        service_status_id: actions.serviceStatusId,
        service_type_id: ServiceTypes.PAYMENT_LINKS,
      });
      return redirect(`/${actions.redirectRoute}`);
    } else {
      return redirect("/discarded");
    }
  } catch (error) {
    console.log({ error });
    return json({ error });
  }
};
