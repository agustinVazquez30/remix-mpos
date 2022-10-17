import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { httpClientPayments } from "~/legacy/src/config/Api";
import { PurchaseOrder } from "~/legacy/src/pages";

export const loader = async () => {
  try {
    const response = await httpClientPayments().get("parameters");
    return json(response.data.data);
  } catch (e) {
    console.error(e);
  }

  return json({});
};

export default function Index() {
  const data = useLoaderData();
  return <PurchaseOrder data={data} />;
}
