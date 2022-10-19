import type { LoaderFunction } from "@remix-run/node";
import { json } from "stream/consumers";
import { httpClientOrchestrator } from "~/legacy/src/config/Api";
import { ServiceTypes } from "~/legacy/src/constants";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const storeId = url.searchParams.get("store");
  const response = await httpClientOrchestrator().get(
    `/service?store_id=${storeId}&service_type_id=${ServiceTypes.PAYMENT_LINKS}`
  );

  return json();
};
