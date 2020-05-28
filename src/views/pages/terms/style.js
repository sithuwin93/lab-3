// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { themed } from 'src/components/theme';

export const PrivacyTermsList = styled.ul`
  padding-top: 24px;
  margin-left: 32px;
  padding-bottom: 24px;

  li {
    font-size: 20px;
    font-weight: 400;
    color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
    line-height: 1.4;
    margin-top: 12px;
  }
`;
