import { act, fireEvent, waitFor } from "@testing-library/react";

import { InputSelect } from "./InputSelect";
import { render } from "~/legacy/src/utils/tests";

const PROPS = {
  label: "test_label",
  placeholder: "test_placeholder",
  options: [{ label: "uno" }, { label: "dos" }],
};

describe("<InputSelect />", () => {
  test("should render correctly", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <InputSelect {...PROPS} onChange={() => {}} />
    );

    const label = getByText(PROPS.label);
    const placeholder = getByPlaceholderText(PROPS.placeholder);
    const dropdown = getByTestId("default-input-select-dropdown");
    const input = getByTestId("default-input-select");
    const firstOption = getByText(PROPS.options[0].label);

    expect(label).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(firstOption).toBeInTheDocument();
  });

  test("should render whithout placeholder and label", () => {
    const { getByText, getByTestId } = render(
      <InputSelect options={PROPS.options} onChange={() => {}} />
    );

    const dropdown = getByTestId("default-input-select-dropdown");
    const input = getByTestId("default-input-select");
    const firstOption = getByText(PROPS.options[0].label);
    const label = getByTestId("default-typography");

    expect(dropdown).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(firstOption).toBeInTheDocument();
    expect(input.getAttribute("placeholder")).toBe("");
    expect(label.children.length).toBe(0);
  });

  test("should works on change correctly when change value in input", async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <InputSelect {...PROPS} onChange={mockOnChange} />
    );

    const newValue = "1";
    const input = getByTestId("default-input-select");

    act(() => {
      fireEvent.change(input, {
        target: { value: newValue },
      });
    });

    await waitFor(() => {
      expect(mockOnChange).toBeCalledWith({
        type: PROPS.options[0].label,
        value: newValue,
      });
    });
  });

  test("should works on change correctly when change value in select", async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <InputSelect {...PROPS} onChange={mockOnChange} />
    );

    const dropdown = getByTestId("input-default-dropdown");

    fireEvent.change(dropdown, { target: { value: "dos" } });

    await waitFor(() => {
      expect(mockOnChange).toBeCalledWith({
        type: "dos",
        value: "",
      });
    });
  });
});
