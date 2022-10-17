import { COUNTRIES, getCountry } from "@30sas/web-ui-kit-utils";
import { fireEvent, screen } from "@testing-library/react";
import { PhoneInput } from "./PhoneInput";
import { PhoneInputProps } from "./types";
import { render } from "~/legacy/src/utils/tests";

const onChangePhoneFn = jest.fn();

const PROPS_DEFAULT: PhoneInputProps = {
  width: "100px",
  phone: "",
  placeholder: "3173132121",
  msgError: "Ocurrio un error",
  onChangePhone: onChangePhoneFn,
  defaultCountryId: COUNTRIES.COLOMBIA,
  onChangeCountry: jest.fn(),
};

describe("Phone Input component", () => {
  let rerender: any;

  beforeEach(() => {
    ({ rerender } = render(<PhoneInput {...PROPS_DEFAULT} />));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const { value } = screen.getByPlaceholderText(
      "3173132121"
    ) as HTMLInputElement;
    const selectCountry = screen.getByText("+57");

    expect(selectCountry).toBeDefined();
    expect(value).toBe("");
  });

  it("should change phone", async () => {
    const phoneNumber = "123456789";
    const inputPhone = screen.getByPlaceholderText(
      "3173132121"
    ) as HTMLInputElement;

    fireEvent.change(inputPhone, { target: { value: phoneNumber } });

    expect(inputPhone.value).toBe(phoneNumber);
    expect(onChangePhoneFn).toBeCalledTimes(1);
    expect(onChangePhoneFn).toBeCalledWith(phoneNumber, false);
  });
  it("should validate phone", async () => {
    const phoneNumber = "3173132100";
    const inputPhone = screen.getByPlaceholderText(
      "3173132121"
    ) as HTMLInputElement;
    fireEvent.change(inputPhone, { target: { value: phoneNumber } });

    expect(onChangePhoneFn).toBeCalledTimes(1);
    expect(onChangePhoneFn).toBeCalledWith(phoneNumber, true);
  });

  it("should change phone on prop update", async () => {
    const phoneNumber = "3212324334";

    const inputPhone = screen.getByPlaceholderText(
      "3173132121"
    ) as HTMLInputElement;

    rerender(<PhoneInput {...PROPS_DEFAULT} phone={phoneNumber} />);

    expect(inputPhone.value).toBe(phoneNumber);
    expect(onChangePhoneFn).toBeCalledTimes(0);
  });

  it("should change country on prop update", async () => {
    const country = getCountry(COUNTRIES.COLOMBIA);

    rerender(
      <PhoneInput {...PROPS_DEFAULT} defaultCountryId={COUNTRIES.COLOMBIA} />
    );

    const selectedCountry = screen.getByText(country.code) as HTMLInputElement;

    expect(selectedCountry).toBeDefined();
    expect(onChangePhoneFn).toBeCalledTimes(0);
  });
});
