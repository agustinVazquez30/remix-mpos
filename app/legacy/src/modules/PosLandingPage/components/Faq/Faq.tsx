import {
  AccordionContainer,
  FAQSection,
  FaqAnswer,
  FaqTitle,
  MoreFaqButton,
} from "./styles";
import { Accordion } from "../../../../commons/components/Accordion";
import { questions } from "./questions";
import { useState } from "react";

export const Faq = ({ data }: any) => {
  const [take, setTake] = useState<number>(6);

  return (
    <FAQSection>
      <AccordionContainer>
        <FaqTitle forwardedAs="h3" variant="XXXLargebold">
          Resuelve tus dudas
        </FaqTitle>

        {questions.map(
          ({ question, answer }, index) =>
            index + 1 <= take && (
              <Accordion key={question} question={question}>
                <FaqAnswer>
                  {answer.replace("{{mposValue}}", data.mposValue)}
                </FaqAnswer>
              </Accordion>
            )
        )}

        <MoreFaqButton
          label="Quiero ver más preguntas"
          color="gray"
          colorType="100"
          borderColor="info"
          borderColorType="900"
          hoverColor="gray"
          hoverColorType="200"
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="900"
          textVariant="Mediumbold"
          onClick={() => setTake(take + 6)}
          fullWidth={true}
          disabled={false}
          className="moreFaq"
        />
      </AccordionContainer>
    </FAQSection>
  );
};
