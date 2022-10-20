import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LandingLayout } from "~/legacy/src/layouts";
import { PosLandingPage } from "~/legacy/src/modules";
import { getParams } from "~/services/parameters";

export const loader = async () => {
  const params = await getParams();
  return json(params);
};

export default function Index() {
  const data = useLoaderData();

  return (
    <LandingLayout>
      <PosLandingPage data={data} />
    </LandingLayout>
  );
}
