import { Container } from "./styles";
import HeaderImage from "~/legacy/src/assets/stepper-header-decoration.png";
import MposImage from "~/legacy/src/assets/mpos.png";
import { ROUTES } from "~/legacy/src/constants";
import type { ReactNode } from "react";
import { RightHeader } from "./components";
import { Stepper } from "./components";
import Treinta from "~/legacy/src/assets/treinta.png";
import { useLocation } from "react-router-dom";

type StepByStepType = {
  step?: ROUTES;
  form: ReactNode;
  floatButton: ReactNode;
  maxWidthForm?: string;
};

export const StepByStep = ({
  step,
  form,
  floatButton,
  maxWidthForm,
}: StepByStepType) => {
  const { pathname } = useLocation();
  const path = pathname.includes(ROUTES.HUNTERS)
    ? pathname.slice(`/${ROUTES.HUNTERS}`.length + 1)
    : pathname.slice(1);
  return (
    <Container maxWidth={maxWidthForm}>
      <div className="left-container">
        <div className="box">
          <img
            loading="lazy"
            className="logo"
            src={Treinta}
            alt="treinta-logo"
          />
          <img
            loading="lazy"
            className="header-img"
            src={HeaderImage}
            alt="header-decoration"
          />
          <div className="stepper-container">
            <Stepper currentStep={step || path} />
          </div>
          <img
            loading="lazy"
            className="footer-img"
            src={MposImage}
            alt="mpos"
          />
        </div>
      </div>
      <div className="right-container">
        <div className="content">
          <RightHeader currentStep={step || path} />
          {form}
        </div>
        <div className="float-button">{floatButton}</div>
      </div>
    </Container>
  );
};
