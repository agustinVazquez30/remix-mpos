import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LeftImage } from "~/legacy/src/layouts";
import YourNewMPOS from "~/legacy/src/assets/mpos-background.png";
import { PurchaseSummaryLoad } from "~/legacy/src/modules";
import { WhatsappButton } from "~/legacy/src/commons/components";
import { getParams } from "~/services/parameters";

export const loader = async () => {
  const params = await getParams();
  return json(params);
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
