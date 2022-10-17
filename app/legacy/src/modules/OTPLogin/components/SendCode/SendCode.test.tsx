import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";
import { SendCode } from "./SendCode";
import { act } from "@testing-library/react-hooks";

describe("< SendCode />", () => {
  test("should render the component", () => {
    render(
      <SendCode
        onSendCode={() => {}}
        isLoading={false}
        OTPLoginFailed={false}
      />
    );

    expect(screen.getByTestId("sendCode-card")).toBeInTheDocument();
  });

  test("should alert if OTP login fails", () => {
    render(
      <SendCode onSendCode={() => {}} isLoading={false} OTPLoginFailed={true} />
    );

    expect(screen.getByText(t("commons.unknownError"))).toBeInTheDocument();
  });

  test("should call onSendCode on valid phone button click", () => {
    const onSendCodeMock = jest.fn();

    render(
      <SendCode
        onSendCode={onSendCodeMock}
        isLoading={false}
        OTPLoginFailed={true}
      />
    );

    act(() => {
      fireEvent.change(screen.getByTestId("phone-input"), {
        target: { value: "3154323443" },
      });
    });

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: t("OTPLogin.sendCode.continue") })
      );
    });

    expect(onSendCodeMock).toHaveBeenCalledWith({
      countryId: 1,
      countryCode: "+57",
      number: "3154323443",
    });
  });
});
