import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { httpClientPayments } from "~/legacy/src/config/Api";
import { LeftImage } from "~/legacy/src/layouts";
import YourNewMPOS from "~/legacy/src/assets/mpos-background.png";
import { PurchaseSummaryLoad } from "~/legacy/src/modules";
import { WhatsappButton } from "~/legacy/src/commons/components";

export const loader = async () => {
  try {
    const response = await httpClientPayments().get("parameters");
    return json(response.data.data);
  } catch (e) {
    console.error(e);
  }

  return json([]);
};

export default function Index() {
  const data = useLoaderData();

  return (
    <LeftImage
      image={YourNewMPOS}
      form={<PurchaseSummaryLoad data={data} />}
      floatButton={<WhatsappButton />}
    />
  );
}
