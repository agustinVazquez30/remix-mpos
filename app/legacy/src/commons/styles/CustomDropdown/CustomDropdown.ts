import styled, {css} from 'styled-components';

import {Dropdown} from '@30sas/web-ui-kit-core';

export const CustomDropDown = styled(Dropdown)<{
  disabled: boolean;
}>`
  ${({disabled}) =>
    disabled &&
    css`
      & .SelectInput {
        pointer-events: none;
      }
    `}
`;
