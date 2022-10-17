import { BusinessInformationProps, BusinessInformationType } from "./models";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { BusinessInformation } from "./BusinessInformation";
import { TypePerson } from "~/legacy/src/constants";
import { defaultAppContext } from "~/legacy/src/contexts/AppContext";
import { getDocumentTypesNaturalPerson } from "./utils";

const CURRENT_STORE = { id: "1", label: "My First Store" };
const CATEGORY2 = "Belleza y cuidado personal";
const SUB_CATEGORY2 = "Centro de tatuajes";

const DATA_EMPTY = {
  nit: "",
  document: "",
  storeId: CURRENT_STORE.id,
  storeName: CURRENT_STORE.label,
  documentType: getDocumentTypesNaturalPerson()[0].label,
  expeditionDate: "",
  category: CATEGORY2,
  subcategory: SUB_CATEGORY2,
  businessName: "",
  typePerson: 1,
};

const PROPS: BusinessInformationProps = {
  onContinue: jest.fn(),
  onCustomEvent: jest.fn(),
  isLoading: false,
  showAlreadyExistsModal: false,
  onLogin: () => {},
  closeAlreadyExistsModal: () => {},
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
  isMailError: false,
  initValues: {
    ...DATA_EMPTY,
    category: "Selecciona la categoría",
    subcategory: "Selecciona la subcategoría",
    documentType: "CC",
  } as any,
  firstName: "fulanito",
  lastName: "test case",
  isPosMetamap: false,
  isPosMetamapLoading: false,
};

const DATA_NATURAL = {
  nit: "",
  document: "12345678",
  storeId: CURRENT_STORE.id,
  storeName: CURRENT_STORE.label,
  documentType: "CE",
  category: CATEGORY2,
  subcategory: SUB_CATEGORY2,
  businessName: "",
  typePerson: 1,
};

const DATA_LEGAL = {
  nit: "123456789",
  document: "",
  storeId: CURRENT_STORE.id,
  storeName: CURRENT_STORE.label,
  documentType: "",
  expeditionDate: "",
  category: CATEGORY2,
  subcategory: SUB_CATEGORY2,
  businessName: "test_business_name",
  typePerson: 2,
};

jest.mock("~/legacy/src/config/Braze", () => ({
  newBrazeEvent: () => jest.fn(),
}));

jest.mock("~/legacy/src/hooks", () => ({
  ...jest.requireActual("~/legacy/src/hooks"),
  useUserStores: () => ({
    data: [],
    refetch: jest.fn(),
    isLoading: false,
    source: {
      cancel: jest.fn(),
    },
  }),
}));

describe("<BusinessInformation/>", () => {
  test("should render correctly when type person is natural", () => {
    const { getByText, getByRole } = render(
      <BusinessInformation {...PROPS} initValues={DATA_EMPTY} />
    );

    const typePersonLabel = getByText(
      t("businessInformation.typePerson.label")
    );
    const naturalPerson = getByText(
      t("businessInformation.typePerson.natural")
    );
    const legalPerson = getByText(t("businessInformation.typePerson.legal"));
    const documentLabel = getByText(t("businessInformation.document.label"));
    const storeLabel = getByText(t("businessInformation.storeName.label"));
    const categoryLabel = getByText(
      t("businessInformation.storeCategory.label")
    );
    const subCategorieLabel = getByText(
      t("businessInformation.subCategory.label")
    );
    const button = getByRole("button", { name: t("commons.continue") });

    expect(typePersonLabel).toBeInTheDocument();
    expect(naturalPerson).toBeInTheDocument();
    expect(legalPerson).toBeInTheDocument();
    expect(documentLabel).toBeInTheDocument();
    expect(storeLabel).toBeInTheDocument();
    expect(categoryLabel).toBeInTheDocument();
    expect(subCategorieLabel).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test("should render correctly when type person is legal", async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} initValues={DATA_EMPTY} />
    );

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    await waitFor(() => {
      const typePersonLabel = getByText(
        t("businessInformation.typePerson.label")
      );
      const naturalPerson = getByText(
        t("businessInformation.typePerson.natural")
      );
      const legalPerson = getByText(t("businessInformation.typePerson.legal"));
      const nit = getByText(t("businessInformation.nit.label"));
      const nitPlaceholder = getByPlaceholderText(
        t("businessInformation.businessName.placeholder")
      );
      const businessName = getByText(
        t("businessInformation.businessName.label")
      );
      const storeLabel = getByText(t("businessInformation.storeName.label"));
      const categoryLabel = getByText(
        t("businessInformation.storeCategory.label")
      );
      const subCategorieLabel = getByText(
        t("businessInformation.subCategory.label")
      );
      const button = getByRole("button", { name: t("commons.continue") });

      expect(typePersonLabel).toBeInTheDocument();
      expect(naturalPerson).toBeInTheDocument();
      expect(legalPerson).toBeInTheDocument();
      expect(nit).toBeInTheDocument();
      expect(nitPlaceholder).toBeInTheDocument();
      expect(storeLabel).toBeInTheDocument();
      expect(categoryLabel).toBeInTheDocument();
      expect(subCategorieLabel).toBeInTheDocument();
      expect(businessName).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  test("should render correctly when type person is natural before select legal person", async () => {
    const { getByText, getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} initValues={DATA_EMPTY} />
    );

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    const typePersonNaturalRadio = getByText(
      t("businessInformation.typePerson.natural")
    );

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    await waitFor(() => {
      expect(
        getByPlaceholderText(t("businessInformation.nit.placeholder"))
      ).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(typePersonNaturalRadio);
    });

    await waitFor(() => {
      expect(
        getByPlaceholderText(t("businessInformation.document.placeholder"))
      ).toBeInTheDocument();
    });
  });

  test("should enable next button when type person is legal and on the form are filled", async () => {
    const { getByText, getByRole, getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} />
    );

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    await waitFor(() => {
      fireEvent.change(
        getByPlaceholderText(t("businessInformation.nit.placeholder")),
        {
          target: { value: "123456789" },
        }
      );

      fireEvent.change(
        getByPlaceholderText(t("businessInformation.businessName.placeholder")),
        {
          target: { value: "razon_social_test" },
        }
      );
    });

    const button = getByRole("button", { name: t("commons.continue") });

    await waitFor(() => {
      expect(button).toBeEnabled();
    });
  });

  test("should enable expedition document date input when type document is not CC", async () => {
    const { getByTestId } = render(<BusinessInformation {...PROPS} />);

    const dropdown = getByTestId("document-input-dropdown");
    const select = screen.getByDisplayValue("CC");

    fireEvent.change(select, { target: { value: "CE" } });

    await waitFor(() => {
      expect(getByTestId("calendar-id")).toBeInTheDocument();
    });
  });

  test("should render store name input enabled when user is not logged", async () => {
    const { getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} initValues={DATA_EMPTY} />
    );

    const storeName = getByPlaceholderText(
      t("businessInformation.storeName.placeholder")
    );

    expect(storeName).toBeInTheDocument();
    expect(storeName).toBeEnabled();
  });

  test("should execute onContinue when form is filled with new date", async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <BusinessInformation
        {...PROPS}
        initValues={{
          ...DATA_NATURAL,
          storeName: "test_store_name",
          documentType: "CE",
          expeditionDate: "",
        }}
      />
    );

    const now = new Date();
    now.setMonth(now.getMonth());
    now.setDate(1);
    now.setMilliseconds(0);

    const newValue = `1 ${now.toLocaleDateString("es", {
      month: "short",
    })} ${now.getFullYear()}`;

    const calendar = getByTestId("calendar-id");

    fireEvent.click(calendar);
    await waitFor(() => {
      expect(getByRole("grid")).toBeInTheDocument();
    });

    const arrow = getByTestId("ArrowLeftIcon");
    fireEvent.click(arrow);

    const dateOne = getByRole("button", { name: newValue });

    act(() => {
      fireEvent.click(dateOne);
    });

    const button = getByRole("button", { name: t("commons.continue") });

    await waitFor(() => expect(button).toBeEnabled());

    fireEvent.click(button);

    await waitFor(() => {
      expect(getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const confirmButton = getByRole("button", {
      name: t("commons.confirm"),
    });
    fireEvent.click(confirmButton);

    expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();

    const dataResult = {
      ...DATA_NATURAL,
      storeName: "test_store_name",
      documentType: "CE",
    };

    await waitFor(() => {
      expect(PROPS.onCustomEvent).toBeCalledWith(
        expect.objectContaining(dataResult)
      );
      expect(PROPS.onContinue).toBeCalledWith(
        expect.objectContaining(dataResult),
        false
      );
    });
  });

  test("should execute onContinue when form is filled by legal person", async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <BusinessInformation {...PROPS} initValues={DATA_LEGAL} />
    );

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
      expect(PROPS.onContinue).toBeCalledWith(
        { ...DATA_LEGAL, documentType: "NIT" },
        false
      );
    });
  });

  test("should render popup", async () => {
    const { getByRole, getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} />
    );

    const inputDocument = getByPlaceholderText(
      t("businessInformation.document.placeholder")
    );
    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });
    act(() => {
      fireEvent.change(inputDocument, { target: { value: "1234543" } });
    });
    act(() => {
      fireEvent.click(getByRole("button", { name: t("commons.continue") }));
    });

    await waitFor(() => {
      expect(screen.getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });
  });

  test("should close popup with close button", async () => {
    const { getByRole, getByTestId, queryByTestId } = render(
      <BusinessInformation
        {...PROPS}
        initValues={
          DATA_NATURAL as BusinessInformationType as BusinessInformationType
        }
      />
    );

    const button = getByRole("button", { name: t("commons.continue") });
    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(queryByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const popup = getByTestId("popupForbiddActivities");

    const closeButton = popup.children[2].children[0];

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();
    });
  });

  test("should close popup", async () => {
    const { getByRole, getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} />
    );

    const inputDocument = getByPlaceholderText(
      t("businessInformation.document.placeholder")
    );
    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    act(() => {
      fireEvent.change(inputDocument, { target: { value: "1234543" } });
    });
    act(() => {
      fireEvent.click(getByRole("button", { name: t("commons.continue") }));
    });

    await waitFor(() => {
      expect(screen.getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole("button", {
      name: t("commons.confirm"),
    });
    fireEvent.click(confirmButton);

    expect(
      screen.queryByTestId("popupForbiddActivities")
    ).not.toBeInTheDocument();
  });

  test("should inputs works correctly when change values", async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      getByRole,
      queryByTestId,
      getByText,
    } = render(<BusinessInformation {...PROPS} />);

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

    const storeName = getByPlaceholderText(
      t("businessInformation.storeName.placeholder")
    );

    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(category, {
      target: { value: CATEGORY2 },
    });
    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });
    fireEvent.change(document, { target: { value: "123456789" } });
    fireEvent.change(businessName, { target: { value: "test_business_name" } });

    fireEvent.change(storeName, {
      target: { value: CURRENT_STORE.label },
    });

    act(() => {
      fireEvent.click(getByRole("button", { name: t("commons.continue") }));
    });

    await waitFor(() => {
      expect(getByTestId("popupForbiddActivities")).toBeInTheDocument();
    });

    const confirmButton = getByRole("button", {
      name: t("commons.confirm"),
    });

    act(() => {
      fireEvent.click(confirmButton);
    });

    expect(queryByTestId("popupForbiddActivities")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(PROPS.onContinue).toBeCalledWith(
        {
          nit: "123456789",
          storeId: CURRENT_STORE.id,
          storeName: CURRENT_STORE.label,
          businessName: "test_business_name",
          category: CATEGORY2,
          subcategory: SUB_CATEGORY2,
          expeditionDate: "",
          document: "",
          documentType: "NIT",
          typePerson: TypePerson.LEGAL,
        },
        false
      );
    });
  });

  test("should inputs works correctly when change values in store name and subcategory", async () => {
    const {
      getByPlaceholderText,
      getByTestId,
      getByRole,
      queryByTestId,
      getByText,
    } = render(<BusinessInformation {...PROPS} />);

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

    const storeName = getByPlaceholderText(
      t("businessInformation.storeName.placeholder")
    );

    const category = screen.getByDisplayValue("Selecciona la categoría");
    const subcategory = screen.getByDisplayValue("Selecciona la subcategoría");

    fireEvent.change(category, { target: { value: CATEGORY2 } });

    fireEvent.change(subcategory, {
      target: { value: SUB_CATEGORY2 },
    });

    fireEvent.change(document, { target: { value: "123456789" } });
    fireEvent.change(businessName, { target: { value: "test_business_name" } });

    fireEvent.change(storeName, {
      target: { value: "test_store_name" },
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
      expect(PROPS.onContinue).toBeCalledWith(
        {
          nit: "123456789",
          storeId: DATA_EMPTY.storeId,
          storeName: "test_store_name",
          businessName: "test_business_name",
          category: CATEGORY2,
          subcategory: SUB_CATEGORY2,
          expeditionDate: "",
          document: "",
          documentType: "NIT",
          typePerson: TypePerson.LEGAL,
        },
        false
      );
    });
  });

  test("should not disable inputs if natural user already has purchased Mpos", async () => {
    const { getByPlaceholderText } = render(
      <BusinessInformation
        {...PROPS}
        initValues={DATA_NATURAL as BusinessInformationType}
      />,
      {
        contexts: {
          appContext: {
            ...defaultAppContext,
            isLogged: true,
            hasPreviousPurchase: true,
          },
        },
      }
    );

    expect(
      getByPlaceholderText(t("businessInformation.document.placeholder"))
    ).not.toBeDisabled();
  });

  test("should not be disable inputs if legal user already has purchased Mpos", async () => {
    const { getByPlaceholderText } = render(
      <BusinessInformation {...PROPS} initValues={DATA_LEGAL} />,
      {
        contexts: {
          appContext: {
            ...defaultAppContext,
            isLogged: true,
            hasPreviousPurchase: true,
          },
        },
      }
    );

    expect(
      getByPlaceholderText(t("businessInformation.nit.placeholder"))
    ).not.toBeDisabled();
    expect(
      getByPlaceholderText(t("businessInformation.businessName.placeholder"))
    ).not.toBeDisabled();
  });

  test("should prompt document alert", async () => {
    render(<BusinessInformation {...PROPS} />);

    expect(
      screen.getByText(
        "Este número de documento debe ser el mismo con el que esté registrada la cuenta bancaria que asociarás para recibir tus pagos."
      )
    ).toBeVisible();
  });

  test("should show the name and lastname input when isPosMetamap split io key is true", () => {
    const { getByTestId, getByText } = render(
      <BusinessInformation
        {...PROPS}
        isPosMetamap
        isPosMetamapLoading={false}
      />
    );

    const typePersonLegalRadio = getByText(
      t("businessInformation.typePerson.legal")
    );

    act(() => {
      fireEvent.click(typePersonLegalRadio);
    });

    expect(getByTestId("legalRepresentativeName-input")).toBeInTheDocument();
    expect(
      getByTestId("legalRepresentativelastName-input")
    ).toBeInTheDocument();
    expect(
      getByText("No es necesario agregar -1 en el campo NIT")
    ).toBeInTheDocument();
  });
});
