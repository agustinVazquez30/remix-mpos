import {
  BusinessInformationPayload,
  BusinessInformationState,
  useAppContext,
} from "~/legacy/src/contexts/AppContext";
import { BusinessInformationType, KYCProcess } from "./models";
import {
  Countries,
  StoreDocumentTypes,
} from "~/legacy/src/commons/enums/enums";
import {
  DOCUMENT_PEP_COL,
  LoginTypes,
  Origins,
  ROUTES,
  ServiceStatus,
  ServiceTypes,
  TypePerson,
  UserStatus,
  UserTypes,
  verifyingErrorType,
} from "~/legacy/src/constants";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import {
  defaultCategory,
  defaultSubcategory,
  getDocumentTypeNit,
  getDocumentTypesNaturalPerson,
  isFirebaseError,
  mappedKYCValidationStatus,
} from "./utils";

import { useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { BusinessInformation } from "./BusinessInformation";
import { BusinessSubCategory } from "../../commons/types/business-category.type";
import { COUNTRIES } from "@30sas/web-ui-kit-utils";
import { KYC_STATUS_ID } from "./constants";
import { getStoreTypeByMCCSubcategoryId } from "~/legacy/src/commons/mccSubcategories";
import { getUUID } from "~/legacy/src/utils/generators";
import { newDatadogLog } from "~/legacy/src/config/Datadog";
import { useAllowedNavigation } from "~/legacy/src/hooks/useAllowedNavigation";
import { useGenericEvent } from "~/legacy/src/hooks/useGenericEvent";
import { useGetBusinessCategories } from "~/legacy/src/hooks/useGetBusinessCategories";
import { useGetStoreService } from "~/legacy/src/hooks/useGetStoreService";
import { useQuery } from "~/legacy/src/hooks";

export const BusinessInformationLoad = () => {
  const {
    isLogged,
    basicInformation,
    businessInformation,
    splitIOKeyValue,
    temporalCredentials,
    utmParameters,
    setBusinessInformation,
    setTemporalCredentials,
  } = useAppContext();
  const KYCRetryAttempts = useRef(0);
  const KYCProcessInfo = useRef<KYCProcess>({
    storeId: temporalCredentials.storeId,
    userId: temporalCredentials.userId,
    userFirebaseId: temporalCredentials.userFirebaseId,
    storeServiceId: getUUID(),
    serviceStatusId: ServiceStatus.INACTIVE,
    redirectRoute: ROUTES.ERROR_VERIFYING,
  });
  const [isGettingStoreService, setIsGettingStoreService] = useState(false);
  const [isRetryingKYC, setIsKYCRetrying] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [showAlreadyExistsModal, setShowAlreadyExistsModal] = useState(false);
  const [isMailError, setIsMailError] = useState(false);
  const { navigate } = useAllowedNavigation();
  const { businessCategories } = useGetBusinessCategories();
  const { email, phoneNumber, userId, firstName, lastName } = basicInformation;
  const generateEvent = useGenericEvent();

  const splitActivationNoLoginPOS =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationNoLoginPOS];

  const { State: posmetamap, metamapSplitLoading } = useSplitIO(
    SplitIOTreatmentNames.ActivationPosmetamap
  );

  const createKycErrorEvents = () => {
    generateEvent({
      eventName: "WebPagosErrorKyc",
      eventArgs: { businessInformation },
    });
  };

  const redirectVerificationErrorPage = () => {
    generateEvent({
      eventName: "WebPagosVerificationError",
      eventArgs: {
        businessInformation,
      },
      platforms: {
        amplitude: true,
      },
    });
    navigate(ROUTES.ERROR_VERIFYING);
  };

  const returnStoreId = () => {
    if (isLogged) {
      return businessInformation.storeId;
    } else {
      return KYCProcessInfo.current.storeId;
    }
  };

  const {
    refetch: createKYCValidation,
    isLoading: isLoadingCreateKYCValidation,
    source: sourceCreateKYCValidation,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "POST",
      url: "validations/id",
      headers: {
        "Content-Type": "application/json",
      },
      transformRequest: (data, headers) => {
        delete headers?.["x-api-key"];
        return JSON.stringify(data);
      },
    },
    onSuccess: () => {
      //user tried once when step 2 reached, avoid empty fields
      if (!isLogged && !splitActivationNoLoginPOS) {
        setTemporalCredentials({
          storeId: KYCProcessInfo.current.storeId,
          userId: KYCProcessInfo.current.userId,
          userFirebaseId: "",
          loginType: LoginTypes.EMAIL,
        });
      }
      validateKYC({
        url: `validations/${returnStoreId()}`,
      });
    },
    onError: () => {
      createKycErrorEvents();
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: validateKYC,
    isLoading: isLoadingValidateKYC,
    source: sourceValidateKYC,
  } = useQuery<{
    reviewStatus: KYC_STATUS_ID;
    score: number;
  }>({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: "validations/:storeId",
    },
    onSuccess: async ({ score, reviewStatus }) => {
      if (score === -1) {
        const MAX_RETRIES = 24;
        const INTERVAL = 5000;
        setIsKYCRetrying(true);
        setTimeout(() => {
          KYCRetryAttempts.current = KYCRetryAttempts.current + 1;
          if (KYCRetryAttempts.current > MAX_RETRIES) {
            redirectVerificationErrorPage();
          } else {
            validateKYC({
              url: `validations/${returnStoreId()}`,
            });
          }
        }, INTERVAL);
      } else {
        const KYCActions = mappedKYCValidationStatus[reviewStatus];

        if (KYCActions) {
          KYCProcessInfo.current = {
            ...KYCProcessInfo.current,
            ...KYCActions,
          };

          if (KYCActions.redirectRoute === ROUTES.MANUAL_ERROR_VERIFYING) {
            generateEvent({
              eventName: "WebPagosVerificationError",
              eventArgs: {
                errorType: verifyingErrorType.MANUAL_ERROR_VERIFYING,
                serviceStatusId: KYCActions.serviceStatusId,
                businessInformation,
              },
              platforms: {
                amplitude: true,
              },
            });
          }

          await updateStoreServiceWithValidation({
            url: `/service?store_id=${
              isLogged
                ? businessInformation.storeId
                : KYCProcessInfo.current.storeId
            }&service_type_id=${ServiceTypes.PAYMENT_LINKS}`,
          });
        } else {
          redirectVerificationErrorPage();
        }
      }
    },
    onError: () => {
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: getStoreService,
    isLoading: isLoadingGetStoreService,
    source: sourceGetStoreService,
  } = useGetStoreService({
    storeId: businessInformation.storeId,
    onSuccess: (response) => {
      if (!response.length) {
        return createStoreService({
          data: {
            id: KYCProcessInfo.current.storeServiceId,
            config: "",
            store_id: businessInformation.storeId,
            service_status_id: ServiceStatus.ONBOARDING,
            service_type_id: ServiceTypes.PAYMENT_LINKS,
          },
        });
      }

      const [
        {
          id,
          service_type_id: serviceTypeId,
          service_status_id: serviceStatusId,
        },
      ] = response;
      if (serviceTypeId === ServiceTypes.PAYMENT_LINKS) {
        KYCProcessInfo.current = {
          ...KYCProcessInfo.current,
          storeServiceId: id,
        };
        if (
          [ServiceStatus.ACTIVE, ServiceStatus.ONBOARDING].includes(
            serviceStatusId
          )
        ) {
          createKYCValidation({
            data: {
              validationType: "raw",
              userId: isLogged
                ? basicInformation.userId
                : KYCProcessInfo.current.userId,
              documentType: businessInformation.documentType,
              documentId:
                businessInformation.typePerson === TypePerson.NATURAL
                  ? businessInformation.document
                  : businessInformation.nit,
              issueDate: businessInformation.expeditionDate,
              firstName:
                businessInformation.documentType === DOCUMENT_PEP_COL
                  ? basicInformation.firstName
                  : "",
              lastName:
                businessInformation.documentType === DOCUMENT_PEP_COL
                  ? basicInformation.lastName
                  : "",
              countryCode: window.ENV?.REACT_APP_COUNTRY,
              storeId: returnStoreId(),
            },
          });
        } else if (serviceStatusId === ServiceStatus.PENDING) {
          validateKYC({
            url: `validations/${returnStoreId()}`,
          });
        } else if (serviceStatusId === ServiceStatus.INACTIVE) {
          navigate(ROUTES.DISCARDED);
        }
      }
    },
    onError: () => {
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: createStoreService,
    isLoading: isLoadingCreateStoreService,
    source: sourceCreateStoreService,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "POST",
      url: "service/create",
    },
    onSuccess: (data) => {
      KYCProcessInfo.current = {
        ...KYCProcessInfo.current,
        storeServiceId: data.id,
      };
      createKYCValidation({
        data: {
          validationType: "raw",
          userId: isLogged
            ? basicInformation.userId
            : KYCProcessInfo.current.userId,
          documentType: businessInformation.documentType,
          documentId:
            businessInformation.typePerson === TypePerson.NATURAL
              ? businessInformation.document
              : businessInformation.nit,
          issueDate: businessInformation.expeditionDate,
          firstName:
            businessInformation.documentType === DOCUMENT_PEP_COL
              ? basicInformation.firstName
              : "",
          lastName:
            businessInformation.documentType === DOCUMENT_PEP_COL
              ? basicInformation.lastName
              : "",
          countryCode: window.ENV?.REACT_APP_COUNTRY,
          storeId: returnStoreId(),
        },
      });
    },
    onError: () => {
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: createStore,
    isLoading: isLoadingCreateStore,
    source: sourceCreateStore,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "POST",
      url: "/mpos/accounts",
    },
    onSuccess: () => {
      createStoreService({
        url: "service/create-by-key",
        data: {
          id: KYCProcessInfo.current.storeServiceId,
          config: "",
          store_id: KYCProcessInfo.current.storeId,
          user_id: KYCProcessInfo.current.userId,
          service_status_id: ServiceStatus.INACTIVE,
          service_type_id: ServiceTypes.PAYMENT_LINKS,
        },
      });
    },
    onError: (error) => {
      if (isFirebaseError(error as AxiosError)) {
        setIsMailError(true);
        return;
      }
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: createStoreWithoutUser,
    isLoading: isLoadingCreateStoreWithoutUser,
    source: sourceCreateStoreWithoutUser,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "POST",
      url: "/mpos/accounts/store",
    },
    onSuccess: () => {
      createStoreService({
        url: "service/create-by-key",
        data: {
          id: KYCProcessInfo.current.storeServiceId,
          config: "",
          store_id: KYCProcessInfo.current.storeId,
          user_id: KYCProcessInfo.current.userId,
          service_status_id: ServiceStatus.INACTIVE,
          service_type_id: ServiceTypes.PAYMENT_LINKS,
        },
      });
    },
    onError: () => {
      redirectVerificationErrorPage();
    },
  });

  const {
    refetch: updateStoreService,
    isLoading: isLoadingUpdateStoreService,
    source: sourceUpdateStoreService,
  } = useQuery({
    api: "orchestrator",
    requestData: {
      method: "PUT",
      url: "service/update",
    },
    onSuccess: () => {
      if (KYCProcessInfo.current.redirectRoute === ROUTES.ERROR_VERIFYING) {
        redirectVerificationErrorPage();
      } else {
        navigate(KYCProcessInfo.current.redirectRoute);
      }
    },
  });

  const {
    refetch: updateStoreServiceWithValidation,
    source: sourceUpdateStoreServiceWithValidation,
    isLoading: loadingUpdateStoreServiceWithValidation,
  } = useGetStoreService({
    storeId: returnStoreId(),
    onSuccess: async (response) => {
      if (response.length) {
        KYCProcessInfo.current.storeServiceId = response[0].id;
      }

      await updateStoreService({
        url: isLogged ? "service/update" : "service/update-by-key",
        data: {
          id: KYCProcessInfo.current.storeServiceId,
          store_id: returnStoreId(),
          service_status_id: KYCProcessInfo.current.serviceStatusId,
          service_type_id: ServiceTypes.PAYMENT_LINKS,
        },
      });
    },
  });

  const {
    refetch: checkEmailAvailability,
    isLoading: isLoadingCheckEmailAvailability,
    source: sourceCheckEmailAvailability,
  } = useQuery<{
    id: string;
    userStatusId: UserStatus;
    originId: Origins;
    stores: string[];
  }>({
    api: "orchestrator",
    requestData: {
      method: "GET",
      url: "/users/user/zendesk?email=",
    },
    onSuccess: (userInfo) => {
      const relatedStoreType = getStoreTypeByMCCSubcategoryId(
        businessInformation.subcategory
      );

      if (splitActivationNoLoginPOS && !isLogged) {
        createStoreWithoutUser({
          data: {
            uid: KYCProcessInfo.current.userFirebaseId,
            storeInfo: {
              id: KYCProcessInfo.current.storeId,
              name: businessInformation.storeName,
              origin_id: Origins.MPOS,
              country_id: Countries.COLOMBIA,
              store_type_id: relatedStoreType,
              store_document_type_id: StoreDocumentTypes.NIT,
            },
            employeeRegister: {
              user_id: KYCProcessInfo.current.userId,
              store_id: KYCProcessInfo.current.storeId,
              user_type_id: UserTypes.OWNER,
              restrictions: "1",
            },
          },
        });
      } else if (!userInfo) {
        const newTemporalCredentials = {
          storeId: getUUID(),
          userId: getUUID(),
          userFirebaseId: "",
          loginType: LoginTypes.EMAIL,
        };

        KYCProcessInfo.current = {
          ...KYCProcessInfo.current,
          ...newTemporalCredentials,
        };

        setTemporalCredentials(newTemporalCredentials);

        createStore({
          data: {
            userInfo: {
              id: newTemporalCredentials.userId,
              first_name: basicInformation.firstName,
              last_name: basicInformation.lastName,
              email: basicInformation.email,
              country_id: COUNTRIES.COLOMBIA,
              user_status_id: UserStatus.Inactive,
              origin_id: Origins.MPOS,
              is_offline: false,
            },
            storeInfo: {
              id: newTemporalCredentials.storeId,
              name: businessInformation.storeName,
              origin_id: Origins.MPOS,
              country_id: Countries.COLOMBIA,
              store_type_id: relatedStoreType,
              store_document_type_id: StoreDocumentTypes.NIT,
            },
            employeeRegister: {
              user_id: newTemporalCredentials.userId,
              store_id: newTemporalCredentials.storeId,
              user_type_id: UserTypes.OWNER,
              restrictions: "1",
            },
          },
        });
      } else if (
        userInfo.originId === Origins.MPOS &&
        userInfo.userStatusId === UserStatus.Inactive
      ) {
        KYCProcessInfo.current = {
          ...KYCProcessInfo.current,
          userId: userInfo.id,
          storeId: userInfo.stores?.[0],
        };

        createKYCValidation({
          data: {
            validationType: "raw",
            userId: KYCProcessInfo.current.userId,
            documentType: businessInformation.documentType,
            documentId:
              businessInformation.typePerson === TypePerson.NATURAL
                ? businessInformation.document
                : businessInformation.nit,
            issueDate: businessInformation.expeditionDate,
            firstName:
              businessInformation.documentType === DOCUMENT_PEP_COL
                ? basicInformation.firstName
                : "",
            lastName:
              businessInformation.documentType === DOCUMENT_PEP_COL
                ? basicInformation.lastName
                : "",
            countryCode: window.ENV?.REACT_APP_COUNTRY,
            storeId: KYCProcessInfo.current.storeId,
          },
        });
      } else {
        setShowAlreadyExistsModal(true);
      }
    },
    onError: () => {
      redirectVerificationErrorPage();
    },
  });

  const handleContinueSteps = (
    data: BusinessInformationType,
    hasForbiddenActivities: boolean
  ) => {
    setBusinessInformation(mapDataToContext(data));
    newDatadogLog("WebPagosInformation", {
      userId,
      email,
      phoneNumber,
      ...data,
      step: 2,
    });
    generateEvent({
      eventName: "WebPagosEconomicActivitiesConfirmed",
      eventArgs: { banned_activity: !hasForbiddenActivities },
    });

    if (hasForbiddenActivities) {
      navigate(ROUTES.DISCARDED);
    }

    if (isLogged) {
      setIsGettingStoreService(true);
    } else {
      setIsCheckingEmail(true);
    }
  };

  const mapDataToContext = (data: BusinessInformationType) => {
    const findCategory = () =>
      businessCategories.find((item) => item.name === data.category);

    const findSubCategory = (subCategories: BusinessSubCategory[]) =>
      subCategories.find((item) => item.subCategoryName === data.subcategory);

    const category = findCategory();
    const subCategory = findSubCategory(category?.subCategories ?? []);

    const mappedData: BusinessInformationPayload = {
      ...data,
      document: data.typePerson === TypePerson.NATURAL ? data.document : "",
      nit: data.typePerson === TypePerson.LEGAL ? data.nit : "",
      category: category?.id ?? defaultCategory[0].id,
      subcategory: subCategory?.subCategoryId ?? defaultSubcategory[0].id,
      documentType:
        data.typePerson === TypePerson.NATURAL
          ? getDocumentTypesNaturalPerson().find(
              (type) => type.label === data.documentType
            )?.id ?? -1
          : getDocumentTypeNit().id,
    };

    return mappedData;
  };

  const mapDataFromContext = (data: BusinessInformationState) => {
    const findCategory = () =>
      businessCategories.find((item) => item.id === data.category);

    const findSubCategory = (subCategories: BusinessSubCategory[]) =>
      subCategories.find((item) => item.subCategoryId === data.subcategory);

    const category = findCategory();
    const subCategory = findSubCategory(category?.subCategories ?? []);

    const mappedData: BusinessInformationType = {
      ...data,
      documentType:
        getDocumentTypesNaturalPerson().find(
          (type) => type.id === data.documentType
        )?.label ?? getDocumentTypesNaturalPerson()[0].label,
      category: category?.name || defaultCategory[0].label,
      subcategory: subCategory?.subCategoryName || defaultSubcategory[0].label,
    };

    return mappedData;
  };

  const handleCustomEvent = (data: BusinessInformationType) => {
    const eventData: any = {
      person_type:
        data.typePerson === TypePerson.LEGAL ? "juridica" : "natural",
      document_type: data.documentType.toLowerCase(),
      document: data.document || data.nit,
      store_type: data.category,
      store_subcategory_type: data.subcategory,
      store_name: data.storeName || data.storeId,
      store_id: data.storeId || KYCProcessInfo.current.storeId,
      utmParameters,
    };

    if (!!data.expeditionDate)
      eventData["document_expedition_date"] = data.expeditionDate;

    if (!!data.businessName) eventData["business_name"] = data.businessName;

    generateEvent({
      eventName: "WebPagosStoreInfoCompleted",
      eventArgs: eventData,
    });
  };

  useEffect(() => {
    return () => {
      KYCRetryAttempts.current = 0;
      sourceGetStoreService.cancel();
      sourceCreateStoreService.cancel();
      sourceCreateKYCValidation.cancel();
      sourceValidateKYC.cancel();
      sourceCreateStore.cancel();
      sourceUpdateStoreService.cancel();
      sourceCheckEmailAvailability.cancel();
      sourceUpdateStoreServiceWithValidation.cancel();
      sourceCreateStoreWithoutUser.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (businessInformation.isComplete && isGettingStoreService) {
      getStoreService({
        url: `/service?store_id=${businessInformation.storeId}&service_type_id=${ServiceTypes.PAYMENT_LINKS}`,
      });
      setIsGettingStoreService(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessInformation, isGettingStoreService]);

  useEffect(() => {
    if (businessInformation.isComplete && isCheckingEmail) {
      checkEmailAvailability({
        url: `/users/user/zendesk?email=${basicInformation.email}`,
      });
      setIsCheckingEmail(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessInformation, isCheckingEmail]);

  return (
    <BusinessInformation
      isLoading={
        isLoadingCreateStoreService ||
        isLoadingGetStoreService ||
        isLoadingCheckEmailAvailability ||
        isLoadingCreateStore ||
        isLoadingCreateKYCValidation ||
        isLoadingValidateKYC ||
        isLoadingUpdateStoreService ||
        loadingUpdateStoreServiceWithValidation ||
        isRetryingKYC ||
        isLoadingCreateStoreWithoutUser
      }
      isMailError={isMailError}
      showAlreadyExistsModal={showAlreadyExistsModal}
      closeAlreadyExistsModal={() => setShowAlreadyExistsModal(false)}
      onLogin={() => navigate(ROUTES.LOGIN)}
      onContinue={handleContinueSteps}
      initValues={mapDataFromContext(businessInformation)}
      onCustomEvent={handleCustomEvent}
      businessCategories={businessCategories}
      firstName={firstName}
      lastName={lastName}
      isPosMetamap={posmetamap}
      isPosMetamapLoading={metamapSplitLoading}
    />
  );
};
