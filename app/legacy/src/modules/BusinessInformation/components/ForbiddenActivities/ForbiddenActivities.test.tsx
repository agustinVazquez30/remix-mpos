import { render, t } from "~/legacy/src/utils/tests";
import { ForbiddenActivities } from "./ForbiddenActivities";
import { fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/react";

describe("<ForbiddenActivities />", () => {
  test("should render custom forbidden activities", () => {
    const firstActivity = "Test custom activity 1";
    const secondActivity = "Test custom activity 2";
    render(<ForbiddenActivities items={[firstActivity, secondActivity]} />);

    expect(screen.getByText(firstActivity)).toBeInTheDocument();
    expect(screen.getByText(secondActivity)).toBeInTheDocument();
  });

  test("should render title", () => {
    render(<ForbiddenActivities />);

    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.title.first"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        t("businessInformation.forbiddenActivities.title.middle")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.title.last"))
    ).toBeInTheDocument();
  });

  test("should verify if user has forbidden activities", () => {
    const mockOnSelect = jest.fn();
    render(<ForbiddenActivities onSelect={mockOnSelect} />);

    const yesButton = screen.getByRole("button", {
      name: t("businessInformation.forbiddenActivities.yes"),
    });
    const confirmButton = screen.getByRole("button", {
      name: t("commons.confirm"),
    });
    fireEvent.click(yesButton);
    fireEvent.click(confirmButton);

    expect(mockOnSelect).toBeCalledWith(true);
  });

  test("should active selected button with changes", () => {
    render(<ForbiddenActivities />);

    expect(screen.getByTestId("iconOnNoButton")).toBeInTheDocument();

    const noButton = screen.getByRole("button", {
      name: t("businessInformation.forbiddenActivities.no"),
    });
    const yesButton = screen.getByRole("button", {
      name: t("businessInformation.forbiddenActivities.yes"),
    });
    fireEvent.click(yesButton);

    expect(screen.getByTestId("iconOnYesButton")).toBeInTheDocument();

    fireEvent.click(noButton);
    expect(screen.getByTestId("iconOnNoButton")).toBeInTheDocument();
  });

  test("should render custom button labels", () => {
    const yesLabelTest = "label test YES";
    const noLabelTest = "label test NO";
    render(
      <ForbiddenActivities
        LabelYesButton={yesLabelTest}
        LabelNoButton={noLabelTest}
      />
    );

    expect(
      screen.getByRole("button", { name: yesLabelTest })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: noLabelTest })
    ).toBeInTheDocument();
  });

  test("should render default button labels", () => {
    render(<ForbiddenActivities />);

    expect(
      screen.getByRole("button", {
        name: t("businessInformation.forbiddenActivities.yes"),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: t("businessInformation.forbiddenActivities.no"),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: t("commons.confirm") })
    ).toBeInTheDocument();
  });

  test("should render default forbidden activities", () => {
    render(<ForbiddenActivities />);

    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd1"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd2"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd3"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd4"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd5"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd6"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd7"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd8"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd9"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd10"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd11"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd12"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd13"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd14"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd15"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd16"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd17"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(t("businessInformation.forbiddenActivities.forbidd18"))
    ).toBeInTheDocument();
  });
});
