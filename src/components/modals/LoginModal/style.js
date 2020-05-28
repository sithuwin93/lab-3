// @flow
import styled from 'styled-components';
import theme from 'shared/theme';
import { zIndex } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  padding: 0 16px;
`;

export const CodeOfConduct = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  margin-top: 16px;
  margin-bottom: 16px;
  position: relative;
  z-index: ${zIndex.card + 1};

  a {
    color: ${() => themed({ light:theme.brand.default , dark:theme.brandd.default })};
    font-weight: 600;
  }
`;
