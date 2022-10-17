import { ROUTES } from "~/legacy/src/constants";
import { StepByStep } from ".";
import { render } from "~/legacy/src/utils/tests";
import { screen } from "@testing-library/react";

describe("<StepByStep />", () => {
  const FormComponent = () => <p>Form</p>;

  test("should render the child components", () => {
    render(
      <StepByStep
        form={<FormComponent />}
        step={ROUTES.BASIC_INFORMATION}
        floatButton={<button>Button</button>}
      />
    );

    expect(screen.getByText("Form")).toBeInTheDocument();
  });

  test("should show the button to ask for help", () => {
    render(
      <StepByStep
        form={<FormComponent />}
        floatButton={<button>Button</button>}
        step={ROUTES.BASIC_INFORMATION}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
