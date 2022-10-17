import { formatToCurrency } from "./format";

jest.mock("~/legacy/src/utils/remoteConfig", () => ({
  getValueCountry: () => ({
    locale: "es-CO",
    currency: "COP",
  }),
}));

describe("formatToCurrency", () => {
  test("format to currency", () => {
    expect(formatToCurrency(2000)).toBe("$ 2.000");
  });
});
