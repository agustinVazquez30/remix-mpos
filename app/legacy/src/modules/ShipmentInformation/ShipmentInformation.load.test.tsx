import * as useGetCountryStatesHook from "~/legacy/src/hooks/useGetCountryStates";
import * as useGetMunicipalitiesHook from "~/legacy/src/hooks/useGetMunicipalities";
import { ROUTES, RoadTypes } from "~/legacy/src/constants";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, waitFor } from "@testing-library/react";
import { getCitiesFromStateName, states } from "./utils";
import { render, t } from "~/legacy/src/utils/tests";

import { ShipmentInformationLoad } from "./ShipmentInformation.load";

const mockedRoute = ROUTES.SHIPMENT_INFORMATION;
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: jest.fn(),
}));

const shipmentInformation = {
  state: states[2].label,
  city: getCitiesFromStateName(states[2].label)[1].label,
  addressPrefix: RoadTypes[1].label,
  address: "test_address",
  addressDetail: "test_address_detail",
  neighborhood: "test_neighborhood",
  anotherPerson: false,
  anotherName: "test_name",
  anotherPhone: "",
};

describe("<ShipmentInformationLoad />", () => {
  test("should call set context correctly", async () => {
    jest.spyOn(useGetCountryStatesHook, "useGetCountryStates").mockReturnValue({
      states: [
        {
          stateCode: "estado test",
          stateName: "estado test",
          countryCode: "57",
          countryName: "Pais test",
        },
      ],
    });

    jest
      .spyOn(useGetMunicipalitiesHook, "useGetMunicipalities")
      .mockReturnValue({
        municipalities: [
          {
            cityCode: "ciudad test",
            cityName: "ciudad test",
            stateCode: "001",
            stateName: "Estado test",
            countryCode: "57",
            countryName: "Pais test",
            rateCode: "rate code",
            rateIca: 0,
            createdAt: "now",
            updatedAt: "now",
          },
        ],
        isLoadingCities: false,
        refetchGetMunicipalities: () => {},
      });

    const mockSetShipmentInfo = jest.fn();
    const { getByRole } = render(<ShipmentInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          shipmentInformation: {
            ...shipmentInformation,
            anotherPerson: false,
            isComplete: true,
          },
          setShipmentInformation: mockSetShipmentInfo,
        },
      },
    });

    const button = getByRole("button", { name: t("commons.continue") });

    await waitFor(() => expect(button).not.toBeDisabled(), { timeout: 5000 });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetShipmentInfo).toBeCalledWith({
        ...shipmentInformation,
        anotherName: "testname", // depureNonLetterCharacters
      });
      expect(mockedUsedNavigate).toBeCalledWith(
        `/${ROUTES.DEPOSIT_INFORMATION}`,
        {
          state: { origin: ROUTES.SHIPMENT_INFORMATION },
        }
      );
    });
  });

  test("should redirect to Deposit Information", async () => {
    jest.spyOn(useGetCountryStatesHook, "useGetCountryStates").mockReturnValue({
      states: [],
    });
    jest
      .spyOn(useGetMunicipalitiesHook, "useGetMunicipalities")
      .mockReturnValue({
        municipalities: [],
        isLoadingCities: false,
        refetchGetMunicipalities: () => {},
      });

    const { getByRole } = render(<ShipmentInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          ...defaultAppActions,
          isLogged: true,
          shipmentInformation: {
            ...shipmentInformation,
            isComplete: true,
          },
        },
      },
    });

    const button = getByRole("button", { name: t("commons.continue") });

    fireEvent.click(button);

    await waitFor(() =>
      expect(mockedUsedNavigate).toBeCalledWith(
        `/${ROUTES.DEPOSIT_INFORMATION}`,
        {
          state: { origin: ROUTES.SHIPMENT_INFORMATION },
        }
      )
    );
  });
});
