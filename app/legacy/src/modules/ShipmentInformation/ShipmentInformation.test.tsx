import { defaultCity, getCitiesFromStateName, states } from "./utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { RoadTypes } from "~/legacy/src/constants";
import { ShipmentInformation } from "./ShipmentInformation";

const DATA_TEST = {
  state: states[1].label,
  city: getCitiesFromStateName(states[1].label)[1].label,
  addressPrefix: RoadTypes[0].label,
  address: "test_address",
  addressDetail: "test_address_detail",
  neighborhood: "test_neighborhood",
  anotherPerson: true,
  anotherName: "test_name",
  anotherPhone: "3000000000",
};

const DATA_EMPTY = {
  state: "",
  city: "",
  addressPrefix: "",
  address: "",
  addressDetail: "",
  neighborhood: "",
  anotherPerson: false,
  anotherName: "",
  anotherPhone: "",
  cityCodes: "",
  isComplete: false,
};

const NOOP = () => {
  // no operation
};

describe("<ShipmentInformation />", () => {
  test("should render correctly", () => {
    const { getByText, getByPlaceholderText, getByTestId, getByRole, debug } =
      render(
        <ShipmentInformation
          initValues={DATA_EMPTY}
          onNextStep={() => {}}
          states={[{ label: "Selecciona el departamento", value: "" }]}
          cities={[{ label: "Selecciona la ciudad", value: "" }]}
          isLoading={false}
          isLoadingCities={false}
          refetchCities={() => {}}
        />
      );

    const title = getByText(t("shipmentInformation.description"));
    const dropdownState = getByTestId("dropdown-state");
    const dropdownCity = getByTestId("dropdown-city");
    const dropdownPrefix = getByTestId("dropdown-prefix");
    const address = getByPlaceholderText(
      t("shipmentInformation.address.placeholder")
    );
    const addressDetail = getByPlaceholderText(
      t("shipmentInformation.detailAddress.placeholder")
    );
    const neighborhood = getByPlaceholderText(
      t("shipmentInformation.neighborhood.placeholder")
    );
    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });

    expect(title).toBeInTheDocument();
    expect(dropdownCity).toBeInTheDocument();
    expect(dropdownPrefix).toBeInTheDocument();
    expect(dropdownState).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(addressDetail).toBeInTheDocument();
    expect(neighborhood).toBeInTheDocument();
    expect(another).toBeInTheDocument();

    const dropdownCityInput = screen.getByDisplayValue("Selecciona la ciudad");
    const dropdownStateInput = screen.getByDisplayValue(
      "Selecciona el departamento"
    );
    const dropdownPrefixInput = screen.getByDisplayValue("Seleccionar");

    expect(dropdownCityInput.getAttribute("value")).toBe(
      getCitiesFromStateName(states[0].label)[0].label
    );
    expect(dropdownStateInput.getAttribute("value")).toBe(states[0].label);

    expect(dropdownPrefixInput.getAttribute("value")).toBe(
      t("shipmentInformation.addressPrefix.placeholder")
    );
    expect(address.getAttribute("value")).toBe("");
    expect(addressDetail.getAttribute("value")).toBe("");
    expect(neighborhood.getAttribute("value")).toBe("");
    expect(another.getAttribute("checked")).toBe(null);
  });

  test("should render correctly with saved data", () => {
    const { getByText, getByPlaceholderText, getByTestId, getByRole } = render(
      <ShipmentInformation
        initValues={{ ...DATA_TEST, isComplete: false }}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const title = getByText(t("shipmentInformation.description"));
    const dropdownState = getByTestId("dropdown-state");
    const dropdownCity = getByTestId("dropdown-city");
    const dropdownPrefix = getByTestId("dropdown-prefix");
    const dropdownStateInput = screen.getByDisplayValue(DATA_TEST.state);
    const dropdownCityInput = screen.getByDisplayValue(DATA_TEST.city);
    const dropdownPrefixInput = screen.getByDisplayValue(
      DATA_TEST.addressPrefix
    );
    const address = getByPlaceholderText(
      t("shipmentInformation.address.placeholder")
    );
    const addressDetail = getByPlaceholderText(
      t("shipmentInformation.detailAddress.placeholder")
    );
    const neighborhood = getByPlaceholderText(
      t("shipmentInformation.neighborhood.placeholder")
    );
    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });

    expect(title).toBeInTheDocument();
    expect(dropdownCity).toBeInTheDocument();
    expect(dropdownPrefix).toBeInTheDocument();
    expect(dropdownState).toBeInTheDocument();
    expect(address).toBeInTheDocument();
    expect(addressDetail).toBeInTheDocument();
    expect(neighborhood).toBeInTheDocument();
    expect(another).toBeInTheDocument();

    expect(dropdownCityInput.getAttribute("value")).toBe(DATA_TEST.city);
    expect(dropdownStateInput.getAttribute("value")).toBe(DATA_TEST.state);
    expect(dropdownPrefixInput.getAttribute("value")).toBe(
      DATA_TEST.addressPrefix
    );
    expect(address.getAttribute("value")).toBe(DATA_TEST.address);
    expect(addressDetail.getAttribute("value")).toBe(DATA_TEST.addressDetail);
    expect(neighborhood.getAttribute("value")).toBe(DATA_TEST.neighborhood);
    expect(another.getAttribute("checked")).toBe("");
  });

  test("should onNextStep works correctly", () => {
    const mockOnNextStep = jest.fn();
    const { getByRole } = render(
      <ShipmentInformation
        initValues={{ ...DATA_TEST, isComplete: false }}
        onNextStep={mockOnNextStep}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const button = getByRole("button", { name: t("commons.continue") });

    fireEvent.click(button);

    expect(mockOnNextStep).toBeCalledWith({
      ...DATA_TEST,
      anotherName: "testname", // depureNonLetterCharacters()
    });
  });

  test("should inputs works correctly", () => {
    const { getByPlaceholderText } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );
    const address = getByPlaceholderText(
      t("shipmentInformation.address.placeholder")
    );
    const addressDetail = getByPlaceholderText(
      t("shipmentInformation.detailAddress.placeholder")
    );
    const neighborhood = getByPlaceholderText(
      t("shipmentInformation.neighborhood.placeholder")
    );

    const dropdownStateInput = screen.getByDisplayValue(
      "Selecciona el departamento"
    );
    const dropdownPrefixInput = screen.getByDisplayValue("Seleccionar");

    fireEvent.change(dropdownStateInput, {
      target: {
        value: states[22].label,
      },
    });

    fireEvent.change(dropdownPrefixInput, {
      target: {
        value: RoadTypes[2].label,
      },
    });

    fireEvent.change(address, {
      target: {
        value: "test_address",
      },
    });

    fireEvent.change(addressDetail, {
      target: {
        value: "test_address_detail",
      },
    });

    fireEvent.change(neighborhood, {
      target: {
        value: "test_neighborhood",
      },
    });

    expect(dropdownStateInput.getAttribute("value")).toBe(states[22].label);
    expect(dropdownPrefixInput.getAttribute("value")).toBe(RoadTypes[2].label);
    expect(address.getAttribute("value")).toBe("test_address");
    expect(addressDetail.getAttribute("value")).toBe("test_address_detail");
    expect(neighborhood.getAttribute("value")).toBe("test_neighborhood");
  });

  test("should set city and set another person works correctly", () => {
    const { getByRole } = render(
      <ShipmentInformation
        initValues={{ ...DATA_EMPTY, state: states[2].label }}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const city = getCitiesFromStateName(states[2].label)[1].label;
    const dropdownCityInput = screen.getByDisplayValue("Selecciona la ciudad");

    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });

    fireEvent.change(dropdownCityInput, {
      target: {
        value: city,
      },
    });

    fireEvent.click(another);

    expect(dropdownCityInput.getAttribute("value")).toBe(city);

    expect(another).toBeChecked();
  });

  test("should getCitiesFromStateName return empty array with not state name", () => {
    const cities = getCitiesFromStateName("test");
    expect(cities).toStrictEqual(defaultCity);
  });

  test("should inputs works correctly when another persona is checked", async () => {
    const { getByPlaceholderText, getByTestId, getByRole } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const dropdownStateInput = screen.getByDisplayValue(
      "Selecciona el departamento"
    );
    const dropdownPrefixInput = screen.getByDisplayValue("Seleccionar");

    const address = getByPlaceholderText(
      t("shipmentInformation.address.placeholder")
    );
    const addressDetail = getByPlaceholderText(
      t("shipmentInformation.detailAddress.placeholder")
    );
    const neighborhood = getByPlaceholderText(
      t("shipmentInformation.neighborhood.placeholder")
    );

    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });

    fireEvent.click(another);

    fireEvent.change(dropdownStateInput, {
      target: {
        value: states[22].label,
      },
    });

    fireEvent.change(dropdownPrefixInput, {
      target: {
        value: RoadTypes[2].label,
      },
    });

    fireEvent.change(address, {
      target: {
        value: "test_address",
      },
    });

    fireEvent.change(addressDetail, {
      target: {
        value: "test_address_detail",
      },
    });

    fireEvent.change(neighborhood, {
      target: {
        value: "test_neighborhood",
      },
    });

    await waitFor(() => {
      expect(
        getByPlaceholderText(t("shipmentInformation.anotherName.placeholder"))
      ).toBeInTheDocument();
    });

    const anotherName = getByPlaceholderText(
      t("shipmentInformation.anotherName.placeholder")
    );
    const anotherPhone = getByPlaceholderText(
      t("shipmentInformation.anotherPhone.placeholder")
    );

    fireEvent.change(anotherName, {
      target: {
        value: "test_name aéioÚ",
      },
    });

    fireEvent.change(anotherPhone, {
      target: {
        value: "3000000000",
      },
    });

    expect(dropdownStateInput.getAttribute("value")).toBe(states[22].label);
    expect(dropdownPrefixInput.getAttribute("value")).toBe(RoadTypes[2].label);
    expect(address.getAttribute("value")).toBe("test_address");
    expect(addressDetail.getAttribute("value")).toBe("test_address_detail");
    expect(neighborhood.getAttribute("value")).toBe("test_neighborhood");
    expect(anotherName.getAttribute("value")).toBe("testname aéioÚ");
    expect(anotherPhone.getAttribute("value")).toBe("3000000000");
  });

  test("should button continue disabled when another person is checked but personName is empty", async () => {
    const { getByRole, getByPlaceholderText } = render(
      <ShipmentInformation
        initValues={{
          ...DATA_TEST,
          anotherPerson: false,
          anotherName: "",
          isComplete: false,
        }}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });

    fireEvent.click(another);

    await waitFor(() => {
      expect(
        getByPlaceholderText(t("shipmentInformation.anotherName.placeholder"))
      ).toBeInTheDocument();
    });

    const button = getByRole("button", { name: t("commons.continue") });

    expect(button).toBeDisabled();
  });

  test("should not disable continue button when address is less than 5 characteres", () => {
    const mockOnNextStep = jest.fn();
    const address = "hol";
    const { getByRole } = render(
      <ShipmentInformation
        initValues={{ ...DATA_TEST, isComplete: false, address }}
        onNextStep={mockOnNextStep}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const button = getByRole("button", { name: t("commons.continue") });
    expect(button).toBeDisabled();
  });

  test('should "Seleccionar el departamento" must be render if not initial data was pre-filled', () => {
    const { getByText } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={NOOP}
        states={[]}
        cities={[]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={NOOP}
      />
    );

    expect(getByText("Selecciona el departamento")).toBeInTheDocument();
  });
  test('should "Cargando ciudades..." must be render if cities is loading', () => {
    const { getByText } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={NOOP}
        states={[]}
        cities={[]}
        isLoading={false}
        isLoadingCities={true}
        refetchCities={NOOP}
      />
    );

    expect(getByText("Cargando ciudades...")).toBeInTheDocument();
  });
  test('should "Seleccionar la ciudad" must be render if not initial data was pre-filled', () => {
    const { getByText } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={NOOP}
        states={[]}
        cities={[]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={NOOP}
      />
    );

    expect(getByText("Selecciona la ciudad")).toBeInTheDocument();
  });
  test("should Continue button be disabled if city/state were not filled and address was filled", () => {
    const { getByRole } = render(
      <ShipmentInformation
        initValues={{
          ...DATA_EMPTY,
          address: "12345",
        }}
        onNextStep={NOOP}
        states={[]}
        cities={[]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={NOOP}
      />
    );

    const button = getByRole("button", { name: t("commons.continue") });
    expect(button).toBeDisabled();
  });

  test("should Continue button be disabled if neighborhood were filled with invalid characters", async () => {
    const { getByRole, getByPlaceholderText } = render(
      <ShipmentInformation
        initValues={{ ...DATA_TEST, isComplete: true }}
        onNextStep={NOOP}
        states={[]}
        cities={[]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={NOOP}
      />
    );

    const neighborhood = getByPlaceholderText(
      t("shipmentInformation.neighborhood.placeholder")
    );

    fireEvent.change(neighborhood, {
      target: {
        value: "My neighborhood! #15",
      },
    });

    const button = getByRole("button", { name: t("commons.continue") });

    expect(button).toBeDisabled();
  });

  test("should another name field ignore non letter characters", () => {
    const testData: Record<string, string> = {
      "Juanito Alimaña": "Juanito Alimaña",
      " ÁÉÍÓÚ áéíóú ´´": "ÁÉÍÓÚ áéíóú ",
      "**@-_12w": "w",
    };

    const { getByPlaceholderText, getByRole } = render(
      <ShipmentInformation
        initValues={DATA_EMPTY}
        onNextStep={() => {}}
        states={[{ label: "Norte de Santander", value: "05" }]}
        cities={[{ label: "Abejorral", value: "05001" }]}
        isLoading={false}
        isLoadingCities={false}
        refetchCities={() => {}}
      />
    );

    const another = getByRole("checkbox", {
      name: t("shipmentInformation.anotherPerson.label"),
    });
    fireEvent.click(another);

    const anotherName = getByPlaceholderText(
      t("shipmentInformation.anotherName.placeholder")
    );

    Object.entries(testData).forEach(([key, value]) => {
      fireEvent.change(anotherName, {
        target: {
          value: key,
        },
      });
      expect(anotherName.getAttribute("value")).toBe(value);
    });
  });
});
