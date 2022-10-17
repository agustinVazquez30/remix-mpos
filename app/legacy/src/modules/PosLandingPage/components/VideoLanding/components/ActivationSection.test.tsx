import { fireEvent, screen } from "@testing-library/react";
import { ActivationSection } from "./ActivationSection";
import { render } from "~/legacy/src/utils/tests";

const savedFetch = global.fetch;

afterAll(() => {
  global.fetch = savedFetch;
});

const steps = [
  "Compra tu datáfono.",
  "Después de tu compra recibirás un SMS con los datos de activación de tu nuevo datáfono.",
  "Cuando recibas tu datáfono, ingresa los datos que recibiste.",
  "¡Listo! Ya puedes recibir pagos en tu negocio con tu datáfono Treinta.",
];

describe("<ActivationSection />", () => {
  test("should renders the component", () => {
    const { container } = render(<ActivationSection />);
    expect(container.firstChild).toMatchInlineSnapshot(`
      <section
        class="sc-bcXHqe lnYyVQ"
      >
        <p
          class="activation__title"
        >
          Activa tu datáfono
        </p>
        <p
          class="activation__subtitle"
        >
          Podrás empezar a usarlo en 4 simples pasos:
        </p>
        <div
          class="sc-gswNZR byubCD"
        >
          <div
            class="step__index"
          >
            1
          </div>
          <p
            class="step__title"
          >
            Compra tu datáfono.
          </p>
        </div>
        <div
          class="sc-gswNZR byubCD"
        >
          <div
            class="step__index"
          >
            2
          </div>
          <p
            class="step__title"
          >
            Después de tu compra recibirás un SMS con los datos de activación de tu nuevo datáfono.
          </p>
        </div>
        <div
          class="sc-gswNZR byubCD"
        >
          <div
            class="step__index"
          >
            3
          </div>
          <p
            class="step__title"
          >
            Cuando recibas tu datáfono, ingresa los datos que recibiste.
          </p>
        </div>
        <div
          class="sc-gswNZR byubCD"
        >
          <div
            class="step__index"
          >
            4
          </div>
          <p
            class="step__title"
          >
            ¡Listo! Ya puedes recibir pagos en tu negocio con tu datáfono Treinta.
          </p>
        </div>
        <button
          class="activation__button"
        >
          Descargar manual de uso
        </button>
      </section>
    `);
  });
  test("should render title", () => {
    render(<ActivationSection />);
    expect(screen.getByText(`Activa tu datáfono`)).toBeInTheDocument();
  });
  test("should render subtitle", () => {
    render(<ActivationSection />);
    expect(
      screen.getByText(`Podrás empezar a usarlo en 4 simples pasos:`)
    ).toBeInTheDocument();
  });
  test("should render steps items", () => {
    render(<ActivationSection />);
    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
  test("should download button call fetch", () => {
    render(<ActivationSection />);

    global.fetch = jest.fn().mockResolvedValue({
      blob: () => Promise.resolve(`����`),
    }) as jest.Mock;

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(fetch).toHaveBeenCalled();
  });
});
