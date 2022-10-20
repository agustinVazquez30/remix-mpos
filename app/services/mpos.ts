import { httpClientOrchestrator } from "~/legacy/src/config/Api";

export const isPOSAvailable = async ({ quantity, phone }: any) => {
  try {
    const response = await httpClientOrchestrator().get(
      `/mpos/enrollment/check-availability/${phone}?quantity=${quantity}`
    );

    return response.data || false;
  } catch {
    return false;
  }
};
