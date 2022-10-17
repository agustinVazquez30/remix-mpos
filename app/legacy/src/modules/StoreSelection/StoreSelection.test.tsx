import { fireEvent, screen } from "@testing-library/react";
import { render, t } from "~/legacy/src/utils/tests";

import { StoreSelection } from "./StoreSelection";

const STORES = [
  { id: "1", label: "My First Store" },
  { id: "2", label: "My Second Store" },
];

describe("<StoreSelection />", () => {
  test("Should show spinner", () => {
    const { getByTestId } = render(
      <StoreSelection isLoading={true} stores={STORES} onSelect={() => {}} />
    );

    expect(getByTestId(t("store-selection-spinner"))).toBeInTheDocument();
  });

  test("Should select a store", async () => {
    const mockOnSelect = jest.fn();

    render(
      <StoreSelection
        isLoading={false}
        stores={STORES}
        onSelect={mockOnSelect}
      />
    );
    const storeSelect = screen.getByDisplayValue("Selecciona una tienda");

    fireEvent.change(storeSelect, {
      target: { value: STORES[1].label },
    });

    expect(mockOnSelect).toHaveBeenCalledWith(STORES[1]);
  });
});
