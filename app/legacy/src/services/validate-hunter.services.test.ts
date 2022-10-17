import { validateHunterService } from "~/legacy/src/services/validate-hunter.service";

jest.mock("~/legacy/src/config/Api", () => ({
  httpClientOrchestrator: () => ({
    get: jest.fn().mockResolvedValue({ data: ["1", "44", "0"] }),
  }),
}));

describe("validate-hunter-service", () => {
  test("should resolve with true if user exists", async () => {
    expect.assertions(1);
    const isValid = await validateHunterService("1");
    expect(isValid).toBe(true);
  });
  test("should throw error if user not exists", async () => {
    expect.assertions(1);
    return expect(
      async () => await validateHunterService("33")
    ).rejects.toEqual(new Error(`Usuario hunter 33 no encontrado`));
  });
});
