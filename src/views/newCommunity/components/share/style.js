// @flow
import theme from 'shared/theme';
// $FlowFixMe
import styled from 'styled-components';
import { zIndex } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  margin-top: 16px;
  justify-content: center;

  a,
  button {
    margin-top: 16px;
  }

  a:first-of-type,
  button:first-of-type {
    margin-left: 0;
    margin-right: 16px;
  }

  a > button:first-of-type {
    margin: 0;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-wrap: wrap;
  margin: 16px;
  justify-content: center;
  position: relative;
  max-width: 100%;
`;

export const Input = styled.div`
  padding: 4px 12px;
  border-radius: 8px;
  border: 2px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  background: #fff;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  padding-right: 72px;
  position: relative;
  display: flex;
  align-self: center;
  max-width: 100%;
  z-index: ${zIndex.form};

  &:hover {
    cursor: pointer;

    &:after {
      background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    }
  }

  &:after {
    content: 'COPY';
    font-size: 11px;
    font-weight: 600;
    color: ${() => themed({ light: theme.brand.default, dark: theme.brandd.default})};
    text-transform: uppercase;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 4px 12px;
    border-left: 2px solid ${themed({ light:theme.bg.border, dark: theme.bgd.border})};
    border-radius: 0 8px 8px 0;
    z-index: ${zIndex.form + 1};
    line-height: 2.1;
  }
`;
