// @flow
import styled from 'styled-components';
import theme from 'shared/theme';
import { themed } from 'src/components/theme';

export const Bar = styled.div`
  display: flex;
  background: ${() => themed({ light: theme.brand.wash, dark: theme.brandd.wash})};
  align-items: center;
  border-bottom: 1px solid ${() => themed({ light: theme.brand.border, dark: theme.brandd.border})};
  color: ${() => themed({ light: theme.brand.default, dark:theme.brandd.default })};
  font-size: 14px;
  font-weight: 400;
  padding: 0 8px 0 0;
  justify-content: center;
  flex: 0 0 48px;
  max-height: 48px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  padding: 12px 0;
  flex: 1 0 auto;

  a {
    text-decoration: underline;
    font-weight: 600;
  }

  .icon {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 12px;
    flex: 1 1 auto;
  }
`;

export const Dismiss = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding-bottom: 4px;
  padding: 0 12px 4px 12px;
  cursor: pointer;
`;
