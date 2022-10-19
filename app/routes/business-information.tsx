import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { BusinessCategoryResponse } from "~/legacy/src/commons/types/business-category.type";
import { httpClientOrchestrator } from "~/legacy/src/config/Api";
import { TypePerson } from "~/legacy/src/constants";
import { StepByStep } from "~/legacy/src/layouts";
import { BusinessInformation } from "~/legacy/src/modules";

export async function loader() {
  const categories =
    await httpClientOrchestrator().get<BusinessCategoryResponse>(
      "/mpos/business_categories"
    );
  return json(categories.data);
}

export default function BusinessInformationScreen() {
  const { categories } = useLoaderData<BusinessCategoryResponse>();

  return (
    <StepByStep
      form={
        <BusinessInformation
          businessCategories={categories}
          firstName=""
          lastName=""
          isMailError={false}
          onLogin={() => {}}
          initValues={{
            businessName: "",
            category: "",
            document: "",
            documentType: "",
            expeditionDate: "",
            nit: "",
            storeId: "",
            storeName: "",
            subcategory: "",
            typePerson: TypePerson.NATURAL,
          }}
          closeAlreadyExistsModal={() => {}}
          isPosMetamap={false}
          isPosMetamapLoading={false}
          showAlreadyExistsModal={false}
        />
      }
      maxWidthForm="688px"
      floatButton={null}
    />
  );
}
