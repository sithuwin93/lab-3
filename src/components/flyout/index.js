// @flow
import theme from 'shared/theme';
import React from 'react';
import styled from 'styled-components';
import { FlexCol, FlexRow, zIndex } from '../globals';
import { themed } from 'src/components/theme';

const StyledFlyout = styled(FlexRow)`
  background-color: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  border: 1px solid ${() => themed({ light: theme.bg.border, dark:theme.bgd.border })};
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  flex: 0 0 auto;
  right: -25%;
  top: 36px;
  z-index: ${zIndex.flyout};
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  ${props => props.style};
`;

const StyledRow = styled(FlexCol)`
  display: flex;
  align-items: stretch;
  position: relative;
  flex: 1;
`;

const Flyout = (props: Object): React$Element<any> => (
  <StyledFlyout className={'flyout'} {...props}>
    <StyledRow>{props.children}</StyledRow>
  </StyledFlyout>
);

export default Flyout;
