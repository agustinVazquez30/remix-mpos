import { Container, ContentContainer } from "./styles";
import { FC, PropsWithChildren } from "react";
import { Header } from "../../commons/components";

export const LandingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Header />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};
