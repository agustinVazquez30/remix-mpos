import {Container, Question} from './styles';
import {DownLgIcon} from '@30sas/web-ui-kit-icons';
import {Typography} from '@30sas/web-ui-kit-core';
import {useState} from 'react';

interface Props {
  question: string;
  children: JSX.Element;
  open?: boolean;
}

export const Accordion = ({question, children, open = false}: Props) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);
  return (
    <Container onClick={() => setOpenAccordion(!openAccordion)}>
      <Question>
        <Typography
          color="gray"
          colorType={openAccordion ? '900' : '700'}
          variant="Largebold">
          {question}
        </Typography>{' '}
        <DownLgIcon />
      </Question>
      {(open || openAccordion) && <div>{children}</div>}
    </Container>
  );
};
