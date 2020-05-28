// @flow
import styled from 'styled-components';
import { theme } from 'shared/theme';
import { tint } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  position: absolute;
  z-index: 1;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
`;

export const Select = styled.select`
  padding: 8px 40px 8px 16px;
  border: none;
  border: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  border-radius: 32px;
  overflow: hidden;
  box-shadow: none;
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
  background-image: none;
  -webkit-appearance: none;
  font-weight: 600;
  font-size: 15px;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  text-align: center;
  text-align-last: center;

  option {
    text-align: left;
  }

  &:hover {
    cursor: pointer;
    background: ${() => themed({ light: theme.bg.divider, dark: theme.bgd.divider})};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })}, 0 0 0 4px ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    transition: box-shadow 0.2s ease-in-out;
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light:tint(theme.bg.border, -24) , dark:tint(theme.bgd.border, -24) })};
    transition: box-shadow 0.2s ease-in-out;
  }
`;
