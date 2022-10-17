import { screen, waitFor } from "@testing-library/react";
import { HunterLogin } from "./HunterLogin";
import { ROUTES } from "~/legacy/src/constants";
import { render } from "~/legacy/src/utils/tests";
import userEvent from "@testing-library/user-event";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockNavigate,
}));

describe("<HunterLogin /> module", () => {
  test("should focus input on visit page", () => {
    render(<HunterLogin />);
    expect(screen.getByPlaceholderText("Ej: 3403230404")).toHaveFocus();
  });
  test("should render welcome message", () => {
    render(<HunterLogin />);
    expect(
      screen.getByText(`¡Hunter, te damos la bienvenida!`)
    ).toBeInTheDocument();
  });
  test("should render treinta logo", () => {
    render(<HunterLogin />);
    expect(screen.getByAltText(`Treinta Logo`)).toBeInTheDocument();
  });
  test("should render dataphone illustration", () => {
    render(<HunterLogin />);
    expect(screen.getByAltText(`Datafono`)).toBeInTheDocument();
  });
  test("should render whatsapp button", () => {
    render(<HunterLogin />);
    expect(screen.getByText(`¿Necesitas ayuda?`)).toBeInTheDocument();
  });

  test("should button changes states of disabled", async () => {
    render(<HunterLogin />);
    const button = screen.getByRole("button", { name: /iniciar sesión/i });
    const input = screen.getByRole("textbox");

    expect(button).toBeDisabled();

    await userEvent.type(input, "3040123");

    expect(button).toBeEnabled();

    await userEvent.clear(input);

    expect(button).toBeDisabled();
  });

  test("should disabled form states & navigate is called when request was fired", async () => {
    const spreasheetId = "x98fF1da1";
    process.env.REACT_APP_HUNTERS_SPREADSHEET_ID = spreasheetId;

    render(<HunterLogin />);

    const button = screen.getByRole("button", { name: /iniciar sesión/i });
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "3040123451");
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(input).toBeDisabled();

    await waitFor(() => expect(button).toBeEnabled()); // wait until 'resolved' state

    expect(input).toBeEnabled();
    expect(mockNavigate).toHaveBeenCalledWith(
      ROUTES.PURCHASE_ORDER,
      expect.anything()
    );
  });
  test("should render error with a invalid document", async () => {
    render(<HunterLogin />);

    const button = screen.getByRole("button", { name: /iniciar sesión/i });
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "39581111"); // invalid

    await userEvent.click(button);
    await waitFor(() => expect(button).toBeEnabled()); // wait until 'pending' state gone

    expect(
      screen.getByText(`El número de documento ingresado no está registrado`)
    ).toBeInTheDocument();
  });
});
