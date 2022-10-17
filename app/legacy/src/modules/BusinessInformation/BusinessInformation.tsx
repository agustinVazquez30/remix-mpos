import {
  BREAK_POINT_POP_UP,
  DESKTOP_POP_UP_WIDTH,
  DOCUMENT_TYPE_CC,
  DOCUMENT_TYPE_NIT,
  MOBILE_POP_UP_WIDTH,
} from "./constants";
import { BusinessInformationProps, BusinessInformationType } from "./models";
import {
  Button,
  InputBase,
  Popup,
  TreintaDropdownType,
  Typography,
} from "@30sas/web-ui-kit-core";
import { Container, Row, RowTypePerson } from "./styles";
import { CustomRadioButton, Spinner } from "~/legacy/src/commons/components";
import {
  defaultCategory,
  defaultStores,
  defaultSubcategory,
  isValidDocument,
} from "./utils";
import { memo, useEffect, useMemo, useState } from "react";
import { AlreadyExistsModal } from "~/legacy/src/modules/BasicInformation/components";
import { BankIcon } from "@30sas/web-ui-kit-icons";
import { CustomDropDown } from "~/legacy/src/commons/styles/CustomDropdown";
import { DocumentAlert } from "./components/DocumentAlert";
import { DocumentRow } from "./components/DocumentRow";
import { ErrorEmailVerifying } from "./components/ErrorEmailVerifying";
import { ForbiddenActivities } from "./components/ForbiddenActivities";
import { StoreNameRow } from "./components/StoreNameRow";
import { Theme } from "@30sas/web-ui-kit-theme";
import { TypePerson } from "~/legacy/src/constants";
import { TypeValidation } from "~/legacy/src/modules/BasicInformation/models";
import { depureText } from "~/legacy/src/commons/validations";
import { removeEmojis } from "~/legacy/src/utils/format";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

export const BusinessInformation = ({
  isLoading,
  onContinue,
  onCustomEvent,
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
  const windowSize = useWindowSize();
  const [isOpenedPopup, setIsOpenedPopup] = useState<boolean>(false);
  const [continueActive, setContinueActive] = useState(false);
  const [subcategoryList, setSubcategoryList] = useState<
    { id: number; label: string }[]
  >([]);
  const [typePerson, setTypePerson] = useState(
    typePersonSaved ?? TypePerson.NATURAL
  );
  const [document, setDocument] = useState<{ type: string; value: string }>({
    type: documentTypeSaved,
    value: documentSaved,
  });
  const [expeditionDate, setExpeditionDate] =
    useState<string>(expeditionDateSaved);
  const [nit, setNit] = useState(nitSaved);
  const [businessName, setBusinessName] = useState(businessNameSaved);
  const [store, setStore] = useState({
    id: storeIdSaved,
    label: storeNameSaved,
  });
  const [category, setCategory] = useState(categorySaved);
  const [subcategory, setSubcategory] = useState(subcategorySaved);
  const [completeData, setCompleteData] = useState<BusinessInformationType>(
    {} as BusinessInformationType
  );
  const [legalRepresentativeName, setLegalRepresentativeName] =
    useState<string>(firstName);
  const [legalRepresentativelastName, setLegalRepresentativelastName] =
    useState<string>(lastName);
  const isLegalPerson = typePerson === TypePerson.LEGAL;
  const theme = useTheme() as Theme;

  // load info
  useEffect(() => {
    if (categorySaved) setCategory(categorySaved);
    if (subcategorySaved) setSubcategory(subcategorySaved);
  }, [categorySaved, subcategorySaved]);

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

  const handleClosePopup = (hasForbiddenActivities: boolean) => {
    setIsOpenedPopup(false);
    onContinue(completeData, hasForbiddenActivities);
  };

  const handleClickNextButton = () => {
    const data: BusinessInformationType = {
      nit,
      storeId: store.id,
      storeName: store.label,
      businessName,
      category,
      subcategory,
      expeditionDate,
      document: document.value,
      documentType:
        typePerson === TypePerson.NATURAL
          ? document.type
          : t("businessInformation.nit.label"),
      typePerson,
    };

    setCompleteData(data);
    onCustomEvent(data);
    setIsOpenedPopup(true);
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
    if (
      (!!store.id || !!store.label) &&
      store.label !== defaultStores[0].label &&
      subcategory !== defaultSubcategory[0].label &&
      category !== defaultCategory[0].label
    ) {
      if (typePerson === TypePerson.NATURAL) {
        if (document.type !== DOCUMENT_TYPE_CC) {
          setContinueActive(
            !!document.value &&
              isValidDocument(document.type, document.value) &&
              !!expeditionDate
          );
        } else {
          setContinueActive(
            !!document.value && isValidDocument(document.type, document.value)
          );
        }
      } else {
        setContinueActive(
          !!nit && !!businessName && isValidDocument(DOCUMENT_TYPE_NIT, nit)
        );
      }
    } else setContinueActive(false);
  }, [
    document,
    nit,
    businessName,
    expeditionDate,
    typePerson,
    store.id,
    store.label,
    category,
    subcategory,
  ]);

  useEffect(() => {
    setStore({
      id: storeIdSaved,
      label: storeNameSaved,
    });
  }, [storeIdSaved, storeNameSaved]);

  useEffect(() => {
    setSubcategoryList(
      categories?.find((item) => item.label === categorySaved)?.subcategories ??
        []
    );
  }, [categories, categorySaved]);

  return (
    <Container data-testid={testId}>
      <Typography className="title-input" variant="Smallbold">
        {t("businessInformation.typePerson.label")}
      </Typography>
      <RowTypePerson>
        <CustomRadioButton
          name="typePerson"
          label={t("businessInformation.typePerson.natural")}
          checked={TypePerson.NATURAL === typePerson}
          onChange={(value) => value && setTypePerson(TypePerson.NATURAL)}
        />
        <CustomRadioButton
          name="typePerson"
          label={t("businessInformation.typePerson.legal")}
          checked={TypePerson.LEGAL === typePerson}
          onChange={(value) => value && setTypePerson(TypePerson.LEGAL)}
        />
      </RowTypePerson>

      {isLegalPerson && isPosMetamap && !isPosMetamapLoading && (
        <Row>
          <div className="custom-input">
            <InputBase
              dataTestId="legalRepresentativeName-input"
              label={t("basicInformation.nameInput.label")}
              placeholder={t("basicInformation.nameInput.placeholder")}
              value={legalRepresentativeName}
              onChange={(e) =>
                setLegalRepresentativeName(depureText(e.target.value))
              }
              rounded="md"
            />
          </div>
          <div className="custom-input">
            <InputBase
              dataTestId="legalRepresentativelastName-input"
              label={t("basicInformation.lastNameInput.label")}
              placeholder={t("basicInformation.lastNameInput.placeholder")}
              value={legalRepresentativelastName}
              onChange={(e) =>
                setLegalRepresentativelastName(depureText(e.target.value))
              }
              rounded="md"
            />
          </div>
        </Row>
      )}

      <DocumentRow
        document={document}
        setDocument={setDocument}
        setExpeditionDate={setExpeditionDate}
        expeditionDate={expeditionDate}
        show={
          (isPosMetamap && !isPosMetamapLoading) ||
          (!isLegalPerson && !isPosMetamap)
        }
      />

      <DocumentAlert
        icon={memo(() => (
          <>p</>
        ))}
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
              label={t("businessInformation.nit.label")}
              type="number"
              value={nit}
              helpText={t("businessInformation.nit.help")}
              onChange={(e) => setNit(e.target.value)}
              placeholder={t("businessInformation.nit.placeholder")}
              errorText={t("businessInformation.documentError.nit")}
              error={!!nit && !isValidDocument(DOCUMENT_TYPE_NIT, nit)}
            />
          </div>
          <div className="custom-input business-name">
            <InputBase
              label={t("businessInformation.businessName.label")}
              value={businessName}
              onChange={(e) => setBusinessName(removeEmojis(e.target.value))}
              placeholder={t("businessInformation.businessName.placeholder")}
            />
          </div>
          {isPosMetamap && !isPosMetamapLoading && (
            <div className="nit-document-alert">
              <DocumentAlert
                icon={memo(() => (
                  <BankIcon
                    fill={theme.colors.info[500]}
                    fontSize="22px"
                    className="bank-icon"
                  />
                ))}
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
      <Button
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
        onClick={handleClickNextButton}
        disabled={!continueActive}
      />
      <Popup
        padding="20px"
        dataTestId="popupForbiddActivities"
        width={
          windowSize.width > BREAK_POINT_POP_UP
            ? DESKTOP_POP_UP_WIDTH
            : MOBILE_POP_UP_WIDTH
        }
        onClose={() => setIsOpenedPopup(false)}
        open={isOpenedPopup}
      >
        <ForbiddenActivities onSelect={handleClosePopup} />
      </Popup>
      <ErrorEmailVerifying show={isMailError} />
      <AlreadyExistsModal
        show={showAlreadyExistsModal}
        onClose={closeAlreadyExistsModal}
        type={TypeValidation.EMAIL}
        onLogin={onLogin}
      />
      {isLoading && <Spinner fullScreen={true} />}
    </Container>
  );
};
