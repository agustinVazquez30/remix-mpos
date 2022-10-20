import { httpClientOrchestrator } from "~/legacy/src/config/Api";

export const existsByPhone = async ({ phone }: any) => {
  try {
    const response = await httpClientOrchestrator().get(
      `/users/user/zendesk?phone=${phone}`
    );

    return response.data || null;
  } catch {
    return null;
  }
};
