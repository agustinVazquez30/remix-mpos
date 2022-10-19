import { DOCUMENT_TYPE_NIT } from "./constants";
import type { BusinessInformationProps } from "./models";
import { Button, InputBase, TreintaDropdownType } from "@30sas/web-ui-kit-core";
import { Container, Row } from "./styles";
import { Spinner } from "~/legacy/src/commons/components";
import { defaultCategory, defaultSubcategory, isValidDocument } from "./utils";
import { useEffect, useMemo, useState } from "react";
import { AlreadyExistsModal } from "~/legacy/src/modules/BasicInformation/components";
import { CustomDropDown } from "~/legacy/src/commons/styles/CustomDropdown";
import { DocumentAlert } from "./components/DocumentAlert";
import { DocumentRow } from "./components/DocumentRow";
import { ErrorEmailVerifying } from "./components/ErrorEmailVerifying";
import { StoreNameRow } from "./components/StoreNameRow";
import { TypePerson } from "~/legacy/src/constants";
import { TypeValidation } from "~/legacy/src/modules/BasicInformation/models";
import { useTranslation } from "react-i18next";
import { useFetcher } from "@remix-run/react";

export const BusinessInformation = ({
  testId = "default-business-information",
  initValues: {
    nit: nitSaved,
    document: documentSaved,
    storeId: storeIdSaved,
    storeName: storeNameSaved,
    documentType: documentTypeSaved,
    expeditionDate: expeditionDateSaved,
    category: categorySaved,
    subcategory: subcategorySaved,
    businessName: businessNameSaved,
    typePerson: typePersonSaved,
  },
  showAlreadyExistsModal,
  isMailError,
  closeAlreadyExistsModal,
  onLogin,
  businessCategories,
  firstName,
  lastName,
  isPosMetamap,
  isPosMetamapLoading,
}: BusinessInformationProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher<{ errors?: { document?: string } }>();
  const [subcategoryList, setSubcategoryList] = useState<
    { id: number; label: string }[]
  >([]);
  const [typePerson, setTypePerson] = useState(
    typePersonSaved ?? TypePerson.NATURAL
  );
  const [nit, setNit] = useState(nitSaved);
  const [store, setStore] = useState({
    id: storeIdSaved,
    label: storeNameSaved,
  });
  const [category, setCategory] = useState(categorySaved);
  const [subcategory, setSubcategory] = useState(subcategorySaved);
  const isLegalPerson = typePerson === TypePerson.LEGAL;

  const handleSelectCategories = (newCategory: string) => {
    const categoryFounded = categories.find(
      (category: { label: string }) => category.label === newCategory
    );
    if (categoryFounded) {
      setCategory(categoryFounded.label);
      setSubcategory(defaultSubcategory[0].label);
      setSubcategoryList(categoryFounded.subcategories);
    }
  };

  const categories = useMemo(
    () =>
      businessCategories.map((item) => ({
        id: item.id,
        label: item.name,
        subcategories: item.subCategories.map((subItem) => ({
          id: subItem.subCategoryId,
          label: subItem.subCategoryName,
        })),
      })),
    [businessCategories]
  );

  useEffect(() => {
    setSubcategoryList(
      categories?.find((item) => item.label === categorySaved)?.subcategories ??
        []
    );
  }, [categories, categorySaved]);

  return (
    <Container data-testid={testId}>
      <fetcher.Form method="post" action="/business-information-handler">
        <input type="hidden" name="email" value="matigasgpruebas@gmail.com" />
        <input type="hidden" name="firstName" value="testname" />
        <input type="hidden" name="lastName" value="testlastName" />
        <input type="hidden" name="typePerson" value={typePerson} />

        {/* <Typography className="title-input" variant="Smallbold">
          {t("businessInformation.typePerson.label")}
        </Typography>
        <RowTypePerson>
          <CustomRadioButton
            name="radio1"
            label={t("businessInformation.typePerson.natural")}
            checked={TypePerson.NATURAL === typePerson}
            onChange={(value) => value && setTypePerson(TypePerson.NATURAL)}
          />
          <CustomRadioButton
            name="radio2"
            label={t("businessInformation.typePerson.legal")}
            checked={TypePerson.LEGAL === typePerson}
            onChange={(value) => value && setTypePerson(TypePerson.LEGAL)}
          />
        </RowTypePerson> */}

        {isLegalPerson && isPosMetamap && !isPosMetamapLoading && (
          <Row>
            <div className="custom-input">
              <InputBase
                name="firstNameLegal"
                dataTestId="legalRepresentativeName-input"
                label={t("basicInformation.nameInput.label")}
                placeholder={t("basicInformation.nameInput.placeholder")}
                rounded="md"
              />
            </div>
            <div className="custom-input">
              <InputBase
                name="lastNameLegal"
                dataTestId="legalRepresentativelastName-input"
                label={t("basicInformation.lastNameInput.label")}
                placeholder={t("basicInformation.lastNameInput.placeholder")}
                rounded="md"
              />
            </div>
          </Row>
        )}

        <DocumentRow
          error={fetcher.data?.errors?.document}
          show={
            (isPosMetamap && !isPosMetamapLoading) ||
            (!isLegalPerson && !isPosMetamap)
          }
        />

        <DocumentAlert
          backgroundColor="warning"
          textColor="warning"
          backgroundType="200"
          textType="700"
          withBorder={false}
          alertText={t("businessInformation.documentAlert")}
        />

        {isLegalPerson && (
          <Row>
            <div className="custom-input">
              <InputBase
                name="nit"
                label={t("businessInformation.nit.label")}
                type="number"
                helpText={t("businessInformation.nit.help")}
                placeholder={t("businessInformation.nit.placeholder")}
                errorText={t("businessInformation.documentError.nit")}
                error={!!nit && !isValidDocument(DOCUMENT_TYPE_NIT, nit)}
              />
            </div>
            <div className="custom-input business-name">
              <InputBase
                name="business"
                label={t("businessInformation.businessName.label")}
                placeholder={t("businessInformation.businessName.placeholder")}
              />
            </div>
            {isPosMetamap && !isPosMetamapLoading && (
              <div className="nit-document-alert">
                <DocumentAlert
                  backgroundColor="info"
                  backgroundType="100"
                  textColor="info"
                  textType="500"
                  withBorder={false}
                  alertText={t("businessInformation.nitDocumentAlert")}
                  textVariant="XSmall"
                  alertHeight="38px"
                />
              </div>
            )}
          </Row>
        )}

        <StoreNameRow store={store} setStore={setStore} />
        <Row>
          <CustomDropDown
            name="category"
            className="custom-input"
            label={t("businessInformation.storeCategory.label")}
            colorLabel="gray"
            colorLabelType="800"
            dropdownOptions={(defaultCategory as any).concat(categories ?? [])}
            typeRenderItem={TreintaDropdownType.OnlyLetter}
            onChange={(e) => handleSelectCategories(e.label as string)}
            maxWidth="336px"
            defaultValue={category}
            dataTestId="category-dropdown"
            value={[category]}
            disabled={false}
          />
          <CustomDropDown
            name="subcategory"
            className="custom-input"
            label={t("businessInformation.subCategory.label")}
            colorLabel="gray"
            colorLabelType="800"
            colorLabelTypeDisable="800"
            dropdownOptions={(defaultSubcategory as any).concat(
              subcategoryList ?? []
            )}
            typeRenderItem={TreintaDropdownType.OnlyLetter}
            maxWidth="336px"
            onChange={(e) => {
              setSubcategory(e.label as string);
            }}
            defaultValue={subcategory}
            dataTestId="subcategory-dropdown"
            value={[subcategory]}
            disabled={category === defaultCategory[0].label}
          />
        </Row>
        <p>
          <button type="submit" disabled={fetcher.state === "submitting"}>
            Continuar
          </button>
        </p>
        {/* <Button
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("commons.continue")}
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          className="next-button"
        /> */}
        <ErrorEmailVerifying show={isMailError} />
        <AlreadyExistsModal
          show={showAlreadyExistsModal}
          onClose={closeAlreadyExistsModal}
          type={TypeValidation.EMAIL}
          onLogin={onLogin}
        />
        {fetcher.state === "submitting" && <Spinner fullScreen={true} />}
      </fetcher.Form>
    </Container>
  );
};
