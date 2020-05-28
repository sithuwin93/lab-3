// @flow
import theme from 'shared/theme';
import styled, { css } from 'styled-components';
import { Transition, Shadow, zIndex, hexa } from 'src/components/globals';
import { isDesktopApp } from 'src/helpers/desktop-app-utils';
import { themed } from 'src/components/theme';

export const Wrapper = styled.div`
  display: inline-block;

  ${props =>
    props.darkContext &&
    css`
      > button {
        color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
        transition: ${Transition.hover.off};

        &:hover {
          color: ${() => themed({ light:theme.text.reverse , dark:theme.textd.reverse })};
          transform: scale(1.1);
          transition: ${Transition.hover.on};
        }
      }
    `};
`;

export const Absolute = styled.div`
  display: ${props => (props.open ? 'flex' : 'none')};
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  min-width: 100vw;
  height: 100%;
  min-height: 100%;
  z-index: 1;

  button {
    color: ${() => themed({ light:theme.text.reverse , dark:theme.textd.reverse })};
    z-index: 2;
    align-self: flex-start;
    margin-top: ${props => (props.hasNavBar ? '56px' : '8px')};
    margin-left: 8px;
  }

  button:hover {
    color: ${() => themed({ light:theme.text.reverse , dark: theme.textd.reverse})};
  }
`;

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: start;
  justify-content: stretch;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 300px;
  color: ${() => themed({ light: theme.brand.alt, dark:theme.brandd.alt })};
  background-color: ${() => themed({ light:theme.bg.wash , dark:theme.bgd.wash })};
  box-shadow: ${Shadow.high} ${props => themed({ light:hexa(props.theme.bg.reverse, 0.25) , dark:hexa(props.theme.bgd.reverse, 0.25) })};
  padding-top: ${props =>
    props.hasNavBar ? '48px' : isDesktopApp() ? '40px' : '0'};
  z-index: ${zIndex.fullscreen + 1};
`;

export const MenuOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  min-width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-color: ${props => themed({ light:hexa(props.theme.bg.reverse, 0.5) , dark:hexa(props.theme.bgd.reverse, 0.5) }) };
`;
