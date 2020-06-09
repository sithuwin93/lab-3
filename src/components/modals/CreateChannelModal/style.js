// @flow
// $FlowFixMe
import styled from 'styled-components';
import { FlexRow } from '../../globals';
import { subtleHeading } from 'src/components/theme/colors';
import { fontSize, gridSize } from 'src/components/theme/constants';
import { headingSizes } from 'src/components/theme/typography';

export const LabelWrapper = styled.div`
  margin-top: 12px;
`

export const Label = styled.label`
  font-size: ${headingSizes.h400.size / fontSize()}em;
  font-style: inherit;
  line-height: ${headingSizes.h200.lineHeight /headingSizes.h200.size};
  color: ${subtleHeading()};
  font-weight: 600px;
  margin-top: ${gridSize() * 2}px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1 0 auto;
  padding: 0 24px 24px;
`;

export const Actions = styled(FlexRow)`
  margin-top: 24px;
  justify-content: flex-end;

  button + button {
    margin-left: 8px;
  }
`;
