import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { SelectionDateModal } from ".";

describe("<SelectionDateModal/>", () => {
  test("should display calendar", () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();
    render(
      <SelectionDateModal
        onClose={mockOnClose}
        onSaveDate={mockOnSave}
        show={true}
      />
    );

    expect(
      screen.getByText(t("depositData.dateModal.title"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("depositData.dateModal.description"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("depositData.dateModal.label"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("depositData.dateModal.buttonSave"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(t("depositData.dateModal.buttonSkip"))
    ).toBeInTheDocument();
  });
});
