import {
  defaultAppActions,
  defaultAppContext,
} from "~/legacy/src/contexts/AppContext";
import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { AlreadyExistsModal } from "./AlreadyExistsModal";
import { SplitIOTreatmentNames } from "~/legacy/src/config/SplitIo";
import { TypeValidation } from "~/legacy/src/modules/BasicInformation/models";

describe("<ConfirmationModal />", () => {
  test('should raise the "onConfirmData" event', () => {
    const mockOnConfirmData = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <AlreadyExistsModal
        show={true}
        type={TypeValidation.EMAIL}
        onLogin={mockOnConfirmData}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("basicInformation.alreadyExists.login"),
      })
    );

    expect(mockOnConfirmData).toBeCalledTimes(1);
    expect(mockOnClose).toBeCalledTimes(1);
  });

  test('should raise the "onClose" event', () => {
    const mockOnClose = jest.fn();

    render(
      <AlreadyExistsModal
        show={true}
        type={TypeValidation.PHONE}
        onLogin={() => {}}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: t("basicInformation.alreadyExists.continueOtherPhone"),
      })
    );

    expect(mockOnClose).toBeCalledTimes(1);
  });

  test("should NOT show subtitle Typography when split IO is false", () => {
    render(
      <AlreadyExistsModal
        show={true}
        type={TypeValidation.PHONE}
        onLogin={() => {}}
        onClose={() => {}}
      />,
      {
        contexts: {
          appContext: {
            ...defaultAppContext,
            ...defaultAppActions,
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: false,
            },
          },
        },
      }
    );

    const confimatinModalSubtitle = screen.queryByText(
      t("basicInformation.alreadyExists.noLoginPOS.wantToAssociateYourPurchase")
    );

    expect(confimatinModalSubtitle).toBeNull();
  });
});

describe("ConfirmationModal when split IO is true", () => {
  test("should show noLoginPOS wording", () => {
    render(
      <AlreadyExistsModal
        show={true}
        type={TypeValidation.PHONE}
        onLogin={() => {}}
        onClose={() => {}}
      />,
      {
        contexts: {
          appContext: {
            ...defaultAppContext,
            ...defaultAppActions,
            splitIOKeyValue: {
              [SplitIOTreatmentNames.ActivationNoLoginPOS]: true,
            },
          },
        },
      }
    );

    expect(
      screen.getByText(
        t("basicInformation.alreadyExists.noLoginPOS.youAlreadyHaveAnAccount")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        t(
          "basicInformation.alreadyExists.noLoginPOS.wantToAssociateYourPurchase"
        )
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        t("basicInformation.alreadyExists.noLoginPOS.yesAssociateMyAccount")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        t("basicInformation.alreadyExists.noLoginPOS.noAssociateMyAccount")
      )
    ).toBeInTheDocument();
  });
});
