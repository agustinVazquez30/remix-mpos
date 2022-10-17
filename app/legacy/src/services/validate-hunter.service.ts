import { httpClientOrchestrator } from "~/legacy/src/config/Api";

export async function validateHunterService(
  hunterId: string,
  spreadsheetId = process.env.REACT_APP_HUNTERS_SPREADSHEET_ID
) {
  const orquestator = httpClientOrchestrator();
  const { data } = await orquestator.get<string[][]>(
    `/users/hunters/${spreadsheetId}`,
    {
      headers: {
        "service-account-id": process.env.REACT_APP_SERVICE_ACCOUNT_ID ?? "",
      },
    }
  );
  const existsUserInSpreadsheet = data.flat().some((id) => id === hunterId);

  if (!existsUserInSpreadsheet) {
    throw new Error(`Usuario hunter ${hunterId} no encontrado`);
  }
  return Promise.resolve(existsUserInSpreadsheet);
}
