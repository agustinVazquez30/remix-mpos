import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { httpClientOrchestrator } from "~/legacy/src/config/Api";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  try {
    const { data } = await httpClientOrchestrator().get(
      `/users/user/zendesk?email=${email}`
    );
    return json({ data });
  } catch (error) {
    return json({ data: null });
  }
};
