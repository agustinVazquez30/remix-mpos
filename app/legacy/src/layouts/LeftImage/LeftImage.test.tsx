import { render, t } from "~/legacy/src/utils/tests";

import { LeftImage } from ".";
import { WhatsappButton } from "~/legacy/src/commons/components";

describe("<LeftImage />", () => {
  const FormComponent = () => <p>Form component</p>;
  const image = "/static/media/your-mpos.png";

  test("should render the child components", () => {
    const { getByText } = render(
      <LeftImage
        image={image}
        form={<FormComponent />}
        floatButton={<WhatsappButton />}
      />
    );

    expect(getByText("Form component")).toBeInTheDocument();
  });

  test("should show the button to ask for help", () => {
    const { getByRole } = render(
      <LeftImage
        image={image}
        form={<FormComponent />}
        floatButton={<WhatsappButton />}
      />
    );

    expect(
      getByRole("button", { name: t("commons.needHelp") })
    ).toBeInTheDocument();
  });

  test("should render the received image as prop", () => {
    const { getByTestId } = render(
      <LeftImage
        image={image}
        form={<FormComponent />}
        floatButton={<WhatsappButton />}
      />
    );

    expect(getByTestId("left-image").getAttribute("src")).toEqual(image);
  });
});
