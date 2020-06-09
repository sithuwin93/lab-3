// @flow
import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import { isDesktopApp } from 'src/helpers/desktop-app-utils';
import { Truncate } from 'src/components/globals';
import { MEDIA_BREAK, TITLEBAR_HEIGHT } from 'src/components/layout';
import { themed, elevation as AkElevations, } from 'src/components/theme';
const elevations = { ...AkElevations };

export const TitlebarContainer = styled.div`
  ${({ elevation }) => elevations[elevation]}
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.hasAction ? 'space-between' : 'flex-start'};
  width: 100%;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  z-index: 9996; /* on top of everything except navigation */
  padding-right: 16px;
  padding-left: 8px;
  flex: none;
  height: ${TITLEBAR_HEIGHT}px;
  max-height: ${TITLEBAR_HEIGHT}px;
  grid-area: titlebar;

  ${isDesktopApp() &&
    css`
      -webkit-app-region: drag;
      user-select: none;
    `}

  @media (min-width: ${MEDIA_BREAK}px) {
    display: ${props => (props.desktop ? 'flex' : 'none')};
  }
  @media (max-width: ${MEDIA_BREAK}px) {
    display: ${props => (props.desktop ? 'none' : 'flex')};
    
    ${isDesktopApp() &&
      css`
        align-items: flex-end;
        padding-bottom: 12px;
      `}
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;

  @media (max-width: ${MEDIA_BREAK}px) {
    max-width: 70%;
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  display: block;
  max-width: calc(100% - 96px);
  ${Truncate};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-right: 0;
  }
`;

export const LeftActionContainer = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
