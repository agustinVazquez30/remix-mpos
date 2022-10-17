import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { ConfirmationModal } from ".";

describe("<ConfirmationModal />", () => {
  const formInfo = {
    fullName: "Full Name",
    phone: "3141234567",
    email: "test@gmail.com",
  };

  test('should raise the "onConfirmData" event', () => {
    const mockOnConfirmData = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <ConfirmationModal
        show={true}
        formInfo={formInfo}
        onConfirmData={mockOnConfirmData}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("commons.confirmData"),
      })
    );

    expect(mockOnConfirmData).toBeCalledTimes(1);
    expect(mockOnClose).toBeCalledTimes(1);
  });

  test('should raise the "onClose" event', () => {
    const mockOnClose = jest.fn();

    render(
      <ConfirmationModal
        show={true}
        formInfo={formInfo}
        onConfirmData={() => null}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("commons.editData"),
      })
    );

    expect(mockOnClose).toBeCalledTimes(1);
  });
});
