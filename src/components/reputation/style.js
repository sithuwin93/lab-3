// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { zIndex } from '../globals';
import { themed } from 'src/components/theme';

export const ReputationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: none;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  cursor: pointer;
  position: relative;
  z-index: ${zIndex.fullScreen};
  width: fit-content;
`;

export const ReputationLabel = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
`;
