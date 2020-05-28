// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { hexa, tint } from 'src/components/globals';
import { Link } from 'react-router-dom';
import { themed } from 'src/components/theme';

export const HasNextPage = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  width: 100%;
`;

export const NextPageButton = styled.span`
  display: flex;
  flex: 1;
  margin-top: 16px;
  justify-content: center;
  padding: 8px;
  background: ${() => themed({ light: hexa(theme.brand.default, 0.04), dark:hexa(theme.brandd.default, 0.04) })};
  color: ${() => themed({ light: tint(theme.brand.default, -8), dark: tint(theme.brandd.default, -8)})};
  border-top: 1px solid ${themed({ light: hexa(theme.brand.default, 0.06), dark: hexa(theme.brandd.default, 0.06)})};
  border-bottom: 1px solid ${themed({ light: hexa(theme.brand.default, 0.06), dark:hexa(theme.brandd.default, 0.06) })};
  font-size: 15px;
  font-weight: 500;
  position: relative;
  min-height: 40px;
  width: 100%;

  &:hover {
    color: ${() => themed({ light:theme.brand.default , dark:theme.brandd.default })};
    cursor: pointer;
    background: ${() => themed({ light:hexa(theme.brand.default, 0.08) , dark:hexa(theme.brandd.default, 0.08) })};
  }
`;
