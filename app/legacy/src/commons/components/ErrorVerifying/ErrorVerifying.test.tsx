import { render, t } from "~/legacy/src/utils/tests";
import { ErrorVerifying } from ".";
import { screen } from "@testing-library/react";

describe("<ErrorVerifying />", () => {
  test("Should render elements", () => {
    render(
      <ErrorVerifying
        errorTitle={t("errorVerifying.title")}
        errorMessage={t("errorVerifying.message")}
        containerMaxWidth="1"
        messageMaxWidth="1"
        titleMaxWidth="1"
      />
    );

    expect(screen.queryByTestId("backgroundInfoIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("infoIcon")).toBeInTheDocument();
    expect(screen.getByText(t("errorVerifying.title"))).toBeInTheDocument();
    expect(screen.getByText(t("errorVerifying.message"))).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: t("commons.writeToSupport") })
    ).toBeInTheDocument();
  });

  test("Should show manual error verifying wording", () => {
    render(
      <ErrorVerifying
        errorTitle={t("errorVerifying.manualVerifying.title")}
        errorMessage={t("errorVerifying.manualVerifying.message")}
        containerMaxWidth="1"
        messageMaxWidth="1"
        titleMaxWidth="1"
      />
    );

    expect(screen.queryByTestId("backgroundInfoIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("infoIcon")).toBeInTheDocument();
    expect(
      screen.getByText(t("errorVerifying.manualVerifying.title"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("errorVerifying.manualVerifying.message"))
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: t("commons.writeToSupport") })
    ).toBeInTheDocument();
  });
});
