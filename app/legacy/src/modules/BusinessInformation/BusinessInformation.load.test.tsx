import * as useGetBusinessCategoriesHook from "~/legacy/src/hooks/useGetBusinessCategories";
import {
  DocumentTypes,
  Origins,
  ROUTES,
  ServiceStatus,
  ServiceTypes,
  TypePerson,
  UserStatus,
} from "~/legacy/src/constants";
import { ORCHESTRATOR_URL, TREINTA_API_URL, server } from "~/legacy/src/mocks";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import {
  defaultAppActions,
  defaultAppState,
} from "~/legacy/src/contexts/AppContext";
import {
  defaultSubcategory,
  getDocumentTypeNit,
  getDocumentTypesNaturalPerson,
} from "./utils";
import { render, t } from "~/legacy/src/utils/tests";

import { BusinessInformationLoad } from "./BusinessInformation.load";
import { KYC_STATUS_ID } from "./constants";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { defaultCategory } from "./utils";
import { newAmplitudeEvent } from "~/legacy/src/config/Amplitude";
import { rest } from "msw";
import { useSplitIO } from "~/legacy/src/config/SplitIo";

let mockedUsedNavigate = jest.fn();
const mockedRoute = ROUTES.BUSINESS_INFORMATION;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: mockedRoute,
  }),
}));

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: () => jest.fn(),
}));

jest.mock("~/legacy/src/config/SplitIo", () => ({
  useSplitIO: jest.fn(),
  SplitIOTreatmentNames: {
    ActivationPosmetamap: "activation_posmetamap",
  },
}));

const CATEGORY2 = "Belleza y cuidado personal";
const SUB_CATEGORY2 = "Centro de tatuajes";

const CURRENT_STORE = {
  id: "1",
  label: "Tienda uno",
};

const formData = {
  storeId: "123abc",
  storeName: "A Store",
  category: 1,
  subcategory: 1,
  businessName: "",
  document: "1234567890",
  documentType: DocumentTypes.CC,
  nit: "",
  typePerson: TypePerson.NATURAL,
  expeditionDate: "",
  isComplete: true,
};

const temporalCredentials = {
  storeId: "testStoreId",
  userId: "testUserId",
  userFirebaseId: "testFirebaseId",
  isComplete: true,
};

describe("<BusinessInformationLoad />", () => {
  jest.setTimeout(20000);

  beforeEach(() => {
    jest
      .spyOn(useGetBusinessCategoriesHook, "useGetBusinessCategories")
      .mockReturnValue({
        isLoadingBusinessCategories: false,
        businessCategories: [
          {
            id: 1,
            name: "Alimentos y Bebidas",
            subCategories: [
              {
                categoryId: 1,
                categoryName: "Alimentos y Bebidas",
                subCategoryId: 1,
                subCategoryName: "Abarrotes / mercado",
                mcc: "5411",
              },
            ],
          },
          {
            id: 2,
            name: "Belleza y cuidado personal",
            subCategories: [
              {
                categoryId: 2,
                categoryName: "Belleza y cuidado personal",
                subCategoryId: 11,
                subCategoryName: "Centro de tatuajes",
                mcc: "5977",
              },
            ],
          },
        ],
      });
    mockedUsedNavigate = jest.fn();

    (useSplitIO as jest.Mock).mockImplementation(() => ({
      State: false,
      loading: false,
    }));
  });

  test("should show error when nit is not valid", async () => {
    const { getByText, getByPlaceholderText } = render(
      <BusinessInformationLoad />,
      {
        contexts: {
          appContext: {
            ...defaultAppState,
            ...defaultAppActions,
          },
        },
      }
    );

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    const nit = getByPlaceholderText(t("businessInformation.nit.placeholder"));

    act(() => {
      fireEvent.change(nit, { target: { value: "12345678" } });
      fireEvent.blur(nit);
    });

    expect(getByText("NIT invalido: Verifica el número")).toBeInTheDocument();
  });

  test("should execute onContinue when form is filled", async () => {
    const mockSetBusinessInfo = jest.fn();
    const { getByPlaceholderText, getByTestId, getByRole, queryByTestId } =
      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              storeId: CURRENT_STORE.id,
              storeName: CURRENT_STORE.label,
            },
            setBusinessInformation: mockSetBusinessInfo,
          },
        },
      });

    const document = getByPlaceholderText(
      t("businessInformation.document.placeholder")
    );

    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(document, { target: { value: "12345678" } });
    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    fireEvent.click(getByRole("button", { name: t("commons.continue") }));

    await waitFor(() => {
      expect(getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const confirmButton = getByRole("button", {
      name: t("commons.confirm"),
    });
    fireEvent.click(confirmButton);

    expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetBusinessInfo).toBeCalledWith({
        nit: "",
        storeId: "1",
        storeName: "Tienda uno",
        businessName: "",
        category: 2,
        subcategory: 11,
        expeditionDate: "",
        document: "12345678",
        documentType: getDocumentTypesNaturalPerson()[0].id,
        typePerson: TypePerson.NATURAL,
      });
    });
  });

  test("should execute onContinue when form is filled by natural person without CC", async () => {
    jest.useFakeTimers("modern").setSystemTime(new Date());

    server.use(
      rest.get(`${ORCHESTRATOR_URL}/service`, (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            serviceStatusId: ServiceStatus.ACTIVE,
            serviceTypeId: ServiceTypes.PAYMENT_LINKS,
          })
        )
      )
    );

    const mockSetBusinessInfo = jest.fn();

    const { getByPlaceholderText, getByTestId, getByRole, queryByTestId } =
      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              storeId: CURRENT_STORE.id,
              storeName: CURRENT_STORE.label,
            },
            setBusinessInformation: mockSetBusinessInfo,
          },
        },
      });

    const now = new Date();

    now.setMonth(now.getMonth());
    now.setDate(1);
    now.setMilliseconds(0);

    const newValue = `1 ${now.toLocaleDateString("es", {
      month: "short",
    })} ${now.getFullYear()}`;

    const document = getByPlaceholderText(
      t("businessInformation.document.placeholder")
    );
    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");
    const documentType = screen.getByDisplayValue("CC");

    fireEvent.change(document, { target: { value: "12345678" } });
    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    fireEvent.change(documentType, {
      target: { value: "CE" },
    });

    await waitFor(() => {
      expect(getByTestId("calendar-id")).toBeInTheDocument();
    });

    const calendar = getByTestId("calendar-id");

    fireEvent.click(calendar);
    await waitFor(() => {
      expect(getByRole("grid")).toBeInTheDocument();
    });

    const arrow = getByTestId("ArrowLeftIcon");
    fireEvent.click(arrow);

    const dateOne = getByRole("button", { name: newValue });

    fireEvent.click(dateOne);
    const continueBtn = getByRole("button", { name: t("commons.continue") });

    expect(continueBtn).toBeEnabled();
    fireEvent.click(continueBtn);

    await waitFor(() =>
      expect(getByTestId("popupForbiddActivities")).toBeInTheDocument()
    );

    const confirmButton = getByRole("button", {
      name: t("commons.confirm"),
    });
    fireEvent.click(confirmButton);

    expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetBusinessInfo).toBeCalledWith({
        nit: "",
        storeId: "1",
        storeName: "Tienda uno",
        businessName: "",
        category: 2,
        subcategory: 11,
        expeditionDate: now.toISOString(),
        document: "12345678",
        documentType: DocumentTypes.CE,
        typePerson: TypePerson.NATURAL,
      });
    });

    jest.useRealTimers();
  });

  test("should execute onContinue when form is filled by legal person", async () => {
    const mockSetBusinessInfo = jest.fn();

    const {
      getByPlaceholderText,
      getByTestId,
      getByRole,
      queryByTestId,
      getByText,
    } = render(<BusinessInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          isLogged: true,
          ...defaultAppActions,
          businessInformation: {
            ...defaultAppState.businessInformation,
            storeId: CURRENT_STORE.id,
            storeName: CURRENT_STORE.label,
            typePerson: TypePerson.LEGAL,
            isComplete: true,
          },
          setBusinessInformation: mockSetBusinessInfo,
        },
      },
    });

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    const document = getByPlaceholderText(
      t("businessInformation.nit.placeholder")
    );

    const businessName = getByPlaceholderText(
      t("businessInformation.businessName.placeholder")
    );

    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(document, { target: { value: "123456789" } });
    fireEvent.change(businessName, { target: { value: "test_business_name" } });
    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    fireEvent.click(getByRole("button", { name: t("commons.continue") }));

    await waitFor(() => {
      expect(getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const confirmButton = getByRole("button", {
      name: t("commons.confirm"),
    });

    fireEvent.click(confirmButton);

    expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockSetBusinessInfo).toBeCalledWith({
        nit: "123456789",
        storeId: "1",
        storeName: "Tienda uno",
        businessName: "test_business_name",
        category: 2,
        subcategory: 11,
        expeditionDate: "",
        document: "",
        documentType: getDocumentTypeNit().id,
        typePerson: TypePerson.LEGAL,
      });

      expect(mockedUsedNavigate).toBeCalledWith(
        `/${ROUTES.SHIPMENT_INFORMATION}`,
        {
          state: { origin: ROUTES.BUSINESS_INFORMATION },
        }
      );
    });
  });

  test("should redirect to Discarded view if user selects forbidden activities", async () => {
    render(<BusinessInformationLoad />, {
      contexts: {
        appContext: {
          ...defaultAppState,
          isLogged: false,
          ...defaultAppActions,
          businessInformation: {
            ...defaultAppState.businessInformation,
            ...formData,
          },
          splitIOKeyValue: {
            [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
          },
        },
      },
    });

    fireEvent.click(
      screen.getByRole("button", { name: t("commons.continue") })
    );

    act(() => {
      fireEvent.click(
        screen.getByRole("button", {
          name: t("businessInformation.forbiddenActivities.yes"),
        })
      );
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: t("commons.confirm"),
      })
    );

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith(`/${ROUTES.DISCARDED}`, {
        state: { origin: ROUTES.BUSINESS_INFORMATION },
      })
    );
  });

  test("should map default data when data from context is empty", async () => {
    const mockSetBusinessInfo = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <BusinessInformationLoad />,
      {
        contexts: {
          appContext: {
            ...defaultAppState,
            ...defaultAppActions,
            setBusinessInformation: mockSetBusinessInfo,
          },
        },
      }
    );

    const document = getByPlaceholderText(
      t("businessInformation.document.placeholder")
    );
    const category = getByText(defaultCategory[0].label);
    const subcategory = getByText(defaultSubcategory[0].label);
    const documentType = getByText(getDocumentTypesNaturalPerson()[0].label);

    expect(document.getAttribute("value")).toBe("");
    expect(subcategory).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(documentType).toBeInTheDocument();
  });

  describe("Logged In", () => {
    test("should redirect to Shipment Information if KYC Validation is approved", async () => {
      server.use(
        rest.get(`${ORCHESTRATOR_URL}/service`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              serviceStatusId: ServiceStatus.ACTIVE,
              serviceTypeId: ServiceTypes.PAYMENT_LINKS,
            })
          )
        ),
        rest.get(`${TREINTA_API_URL}/validations`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              score: 1,
              reviewStatus: KYC_STATUS_ID.ACCEPTED,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      expect(
        screen.getByRole("button", { name: t("commons.continue") })
      ).toBeEnabled();
      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      expect(
        screen.getByRole("button", { name: t("commons.confirm") })
      ).toBeEnabled();
      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.SHIPMENT_INFORMATION}`,
          { state: { origin: ROUTES.BUSINESS_INFORMATION } }
        )
      );
    });

    test("should redirect to Error Verifying view if get Store service request fails", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      const USER_ID_MATCH = "1";
      const COUNTRY_CODE_MATCH = "+54";
      const NUMBER_MATCH = "1234567890";
      const EMAIL_MATCH = "email@treinta.co";
      const fakeContexts = {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            basicInformation: {
              ...defaultAppState.basicInformation,
              userId: USER_ID_MATCH,
              phoneNumber: {
                countryId: 3,
                countryCode: COUNTRY_CODE_MATCH,
                number: NUMBER_MATCH,
              },
              email: EMAIL_MATCH,
            },
          },
        },
      };

      render(<BusinessInformationLoad />, fakeContexts);

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      await waitFor(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() => {
        expect(newAmplitudeEvent).toHaveBeenCalledWith(
          "WebPagosVerificationError",
          expect.objectContaining({
            userId: USER_ID_MATCH,
            phoneNumber: COUNTRY_CODE_MATCH + NUMBER_MATCH,
            email: EMAIL_MATCH,
          })
        );
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        );
      });
    });

    test("should redirect to Discarded view if Payment Link service is deactivated for the store", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json([
              {
                service_status_id: ServiceStatus.INACTIVE,
                service_type_id: ServiceTypes.PAYMENT_LINKS,
              },
            ])
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.DISCARDED}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Error Verifying view if KYC Create Validation request fails", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json([]))
        ),
        rest.post(`${ORCHESTRATOR_URL}/validations/id`, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      await waitFor(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Discarded view if KYC Validation is rejected", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json([]))
        ),
        rest.get(`${ORCHESTRATOR_URL}/validations/:storeId`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              score: 1,
              reviewStatus: KYC_STATUS_ID.REJECTED,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      await waitFor(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.DISCARDED}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Error Verifying view if KYC Validation is in review", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json([]))
        ),
        rest.get(`${ORCHESTRATOR_URL}/validations/:storeId`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              score: 1,
              reviewStatus: KYC_STATUS_ID.REVIEW,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.MANUAL_ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Error Verifying view if KYC Check Validation request fails", async () => {
      server.use(
        rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json([]))
        ),
        rest.get(`${ORCHESTRATOR_URL}/validations/:storeId`, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: true,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      await waitFor(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });
  });

  describe("Not Logged In", () => {
    test("should redirect to Shipment Information if user does not exists and KYC Validation is approved", async () => {
      server.use(
        rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(null))
        ),
        rest.post(`${ORCHESTRATOR_URL}/mpos/accounts`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(null))
        ),
        rest.post(
          `${ORCHESTRATOR_URL}/service/create-by-key`,
          (req, res, ctx) => res(ctx.status(200), ctx.json({ id: "123" }))
        ),
        rest.post(`${ORCHESTRATOR_URL}/validations/id`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(null))
        ),
        rest.get(`${ORCHESTRATOR_URL}/validations`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              score: 1,
              reviewStatus: KYC_STATUS_ID.ACCEPTED,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.SHIPMENT_INFORMATION}`,
          { state: { origin: ROUTES.BUSINESS_INFORMATION } }
        )
      );
    });

    test("should redirect to Shipment Information if user already created but with Mpos origin and inactive, and KYC validation is approved", async () => {
      server.use(
        rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              userStatusId: UserStatus.Inactive,
              originId: Origins.MPOS,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            temporalCredentials: {
              ...defaultAppState.temporalCredentials,
              ...temporalCredentials,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.SHIPMENT_INFORMATION}`,
          { state: { origin: ROUTES.BUSINESS_INFORMATION } }
        )
      );
    });

    test("should Already registered modal if user already active", async () => {
      server.use(
        rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              userStatusId: UserStatus.Active,
              originId: Origins.MPOS,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            temporalCredentials: {
              ...defaultAppState.temporalCredentials,
              ...temporalCredentials,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(
          screen.getByText(t("basicInformation.alreadyExists.email"))
        ).toBeInTheDocument()
      );
    });

    test("should redirect to Error Verifying if email check fails", async () => {
      server.use(
        rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            temporalCredentials: {
              ...defaultAppState.temporalCredentials,
              ...temporalCredentials,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Error Verifying view if Store Creation fails", async () => {
      server.use(
        rest.post(`${ORCHESTRATOR_URL}/mpos/accounts`, (req, res, ctx) =>
          res(ctx.status(500))
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            temporalCredentials: {
              ...defaultAppState.temporalCredentials,
              ...temporalCredentials,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      await waitFor(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should redirect to Error Verifying view if create Store service request fails", async () => {
      jest
        .spyOn(useGetBusinessCategoriesHook, "useGetBusinessCategories")
        .mockReturnValue({
          isLoadingBusinessCategories: false,
          businessCategories: [
            {
              id: 1,
              name: "Alimentos y Bebidas",
              subCategories: [
                {
                  categoryId: 1,
                  categoryName: "Alimentos y Bebidas",
                  subCategoryId: 1,
                  subCategoryName: "Abarrotes / mercado",
                  mcc: "5411",
                },
              ],
            },
            {
              id: 2,
              name: "Belleza y cuidado personal",
              subCategories: [
                {
                  categoryId: 2,
                  categoryName: "Belleza y cuidado personal",
                  subCategoryId: 11,
                  subCategoryName: "Centro de tatuajes",
                  mcc: "5977",
                },
              ],
            },
          ],
        });
      server.use(
        rest.post(
          `${ORCHESTRATOR_URL}/service/create-by-key`,
          (req, res, ctx) => res(ctx.status(500))
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            temporalCredentials: {
              ...defaultAppState.temporalCredentials,
              ...temporalCredentials,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      act(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("businessInformation.forbiddenActivities.yes"),
          })
        );
      });

      act(() => {
        fireEvent.click(
          screen.getByRole("button", {
            name: t("commons.confirm"),
          })
        );
      });

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.ERROR_VERIFYING}`,
          {
            state: { origin: ROUTES.BUSINESS_INFORMATION },
          }
        )
      );
    });

    test("should call /mpos/accounts/store endpoint when split ActivationNoLoginPOS is true", async () => {
      let flagCreateStoreWithoutUser = false;
      let flagCreateStore = false;

      server.use(
        rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(null))
        ),
        rest.post(`${ORCHESTRATOR_URL}/mpos/accounts`, (req, res, ctx) => {
          flagCreateStore = true;
          return res(ctx.status(200), ctx.json(null));
        }),
        rest.post(
          `${ORCHESTRATOR_URL}/mpos/accounts/store`,
          (req, res, ctx) => {
            flagCreateStoreWithoutUser = true;
            return res(ctx.status(200), ctx.json(null));
          }
        ),
        rest.post(
          `${ORCHESTRATOR_URL}/service/create-by-key`,
          (req, res, ctx) => res(ctx.status(200), ctx.json({ id: "123" }))
        ),
        rest.post(`${ORCHESTRATOR_URL}/validations/id`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(null))
        ),
        rest.get(`${ORCHESTRATOR_URL}/validations`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json({
              score: 1,
              reviewStatus: KYC_STATUS_ID.ACCEPTED,
            })
          )
        )
      );

      render(<BusinessInformationLoad />, {
        contexts: {
          appContext: {
            ...defaultAppState,
            isLogged: false,
            ...defaultAppActions,
            businessInformation: {
              ...defaultAppState.businessInformation,
              ...formData,
            },
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: true,
            },
          },
        },
      });

      fireEvent.click(
        screen.getByRole("button", { name: t("commons.continue") })
      );

      fireEvent.click(
        screen.getByRole("button", {
          name: t("commons.confirm"),
        })
      );

      await waitFor(() =>
        expect(mockedUsedNavigate).toHaveBeenCalledWith(
          `/${ROUTES.SHIPMENT_INFORMATION}`,
          { state: { origin: ROUTES.BUSINESS_INFORMATION } }
        )
      );

      expect(flagCreateStore).toBeFalsy();
      expect(flagCreateStoreWithoutUser).toBeTruthy();
    });
  });
});
