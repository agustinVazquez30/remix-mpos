import { Container } from "./styles";
import FiguresImage from "~/legacy/src/assets/figures.png";
import MposImage from "~/legacy/src/assets/mpos-white-background.png";
import React from "react";
import TreintaLogo from "~/legacy/src/assets/treinta-logo.svg";

export const Information: React.FC<React.PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return (
    <Container>
      <img loading="lazy" id="figuresImage" alt="figures" src={FiguresImage} />
      <img loading="lazy" id="treintaImage" alt="treinta" src={TreintaLogo} />
      <div className="contentContainer">{children}</div>
      <img loading="lazy" id="mposImage" alt="mpos" src={MposImage} />
    </Container>
  );
};
