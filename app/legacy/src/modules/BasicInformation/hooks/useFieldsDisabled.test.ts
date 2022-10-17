import { LoginTypes } from "~/legacy/src/constants";
import { defaultAppState } from "~/legacy/src/contexts/AppContext";
import { renderHook } from "~/legacy/src/utils/tests";
import { useFieldsDisabled } from "./useFieldsDisabled";

const MOCK_USER_LOGGED_EMAIL = {
  contexts: {
    appContext: {
      basicInformation: {
        ...defaultAppState.basicInformation,
        userId: "123",
        phoneNumber: {
          countryId: 3,
          countryCode: "+57",
          number: "333333333",
        },
        email: "random@test.com",
      },
      isLogged: true,
      loginType: LoginTypes.EMAIL,
    },
  },
};
const MOCK_USER_EMPTY_EMAIL = {
  contexts: {
    appContext: {
      ...MOCK_USER_LOGGED_EMAIL.contexts.appContext,
      basicInformation: {
        ...MOCK_USER_LOGGED_EMAIL.contexts.appContext.basicInformation,
        email: "",
      },
    },
  },
};
const MOCK_USER_LOGGED_PHONE = {
  contexts: {
    appContext: {
      basicInformation: {
        ...defaultAppState.basicInformation,
        userId: "123",
        phoneNumber: {
          countryId: 3,
          countryCode: "+57",
          number: "333333333",
        },
        email: "",
      },
      isLogged: true,
      loginType: LoginTypes.OTP,
    },
  },
};
const MOCK_USER_EMPTY_PHONE = {
  contexts: {
    appContext: {
      ...MOCK_USER_LOGGED_PHONE.contexts.appContext,
      basicInformation: {
        ...MOCK_USER_LOGGED_PHONE.contexts.appContext.basicInformation,
        phoneNumber: {
          number: "",
          countryId: 1,
          countryCode: "",
        },
      },
    },
  },
};

describe("useFieldsDisabled hook", () => {
  it("should be enabled both fields if user not logged", () => {
    const { result } = renderHook(useFieldsDisabled);

    expect(result.current.email).toBeFalsy();
    expect(result.current.phone).toBeFalsy();
  });
  it("should be email disabled if user has email and be logged by email", () => {
    const { result } = renderHook(useFieldsDisabled, MOCK_USER_LOGGED_EMAIL);

    expect(result.current.email).toBeTruthy();
    expect(result.current.phone).toBeFalsy();
  });
  it("should be email enabled if user has logged but email dont have value", () => {
    const { result } = renderHook(useFieldsDisabled, MOCK_USER_EMPTY_EMAIL);

    expect(result.current.email).toBeFalsy();
    expect(result.current.phone).toBeFalsy();
  });
  it("should be phone disabled if user has phone and be logged by phone", () => {
    const { result } = renderHook(useFieldsDisabled, MOCK_USER_LOGGED_PHONE);

    expect(result.current.email).toBeFalsy();
    expect(result.current.phone).toBeTruthy();
  });
  it("should be PHONE enabled if user has logged but phone dont have value", () => {
    const { result } = renderHook(useFieldsDisabled, MOCK_USER_EMPTY_PHONE);

    expect(result.current.email).toBeFalsy();
    expect(result.current.phone).toBeFalsy();
  });
});
