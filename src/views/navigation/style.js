// @flow
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import theme from 'shared/theme';
import { hexa, Truncate } from 'src/components/globals';
import {
  MEDIA_BREAK,
  NAVBAR_WIDTH,
  NAVBAR_EXPANDED_WIDTH,
  MIN_WIDTH_TO_EXPAND_NAVIGATION,
} from 'src/components/layout';
import { isDesktopApp } from 'src/helpers/desktop-app-utils';
import { 
  elevation as AkElevations,
  themed,
  colors
} from 'src/components/theme';
const elevations = { ...AkElevations };

export const Overlay = styled.div`
  position: fixed;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998 /* on top of titlebar */;
  background: rgba(0, 0, 0, 0.4);
`;

export const RedDot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 3px solid ${themed({ light: theme.bg.default, dark: theme.bgd.default})};
  position: absolute;
  background: ${() => themed({ light:theme.warn.alt , dark: theme.warnd.alt})};
  top: 0;
  right: 0px;
`;

export const BlackDot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border: 3px solid ${themed({ light:theme.bg.default , dark: theme.bgd.default})};
  position: absolute;
  background: ${() => themed({ light: theme.text.placeholder, dark:theme.textd.placeholder })};
  top: 2px;
  right: 10px;

  @media (max-width: ${MEDIA_BREAK}px) {
    background: ${() => themed({ light: theme.warn.alt, dark: theme.warnd.alt})};
    left: 40px;
    top: 0px;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    background: ${() => themed({ light:theme.warn.alt , dark:theme.warnd.alt })};
    left: 40px;
    top: 0px;
  }
`;

export const NavigationWrapper = styled.div`
  grid-area: navigation;
  position: sticky;
  top: 0;
  width: ${NAVBAR_WIDTH}px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  
  ${isDesktopApp() &&
    css`
      -webkit-app-region: drag;
      user-select: none;
    `}


  @media (max-width: ${MEDIA_BREAK}px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 9997;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.16);
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    width: ${NAVBAR_EXPANDED_WIDTH}px;
  }
`;

export const DesktopMenuIconsCover = styled.div`
  position: fixed;
  width: ${NAVBAR_WIDTH - 1}px;
  height: 40px;
  border-bottom: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  background: #fff;
  top: 0;
  display: none;
  z-index: 1;

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    width: ${NAVBAR_EXPANDED_WIDTH - 1}px;
  }
`;

export const NavigationGridListScroller = styled.div`
  grid-area: scroll;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  padding-top: 1px;

  &&::-webkit-scrollbar {
    width: 6px;
  }
  
  &&::-webkit-scrollbar-track {
    background: ${themed({light: colors.N10, dark: colors.N500})}; 
  }
   
  &&::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: ${themed({light: colors.N30,dark:colors.N800})};

  }
  
  &&::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  
`;


export const Fixed = styled.div`
  border-top: 1px solid ${() => themed({ light: theme.bg.border, dark: theme.bgd.border})};
  grid-area: fixed;
  // padding: 8px 12px 8px 12px;
  width: 100%;
  display: grid;    
  @media (max-width: ${MEDIA_BREAK}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const ThemeButtonWrapper = styled.div`  
  @media (max-width: ${MEDIA_BREAK}px) {
    text-align: center;
  }
  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    text-align: center;
  }
`

export const NavigationGrid = styled.div`
  ${({ elevation }) => elevations[elevation]}
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  // nca-remove
  // grid-template-rows: auto;
  grid-template-rows: 1fr auto;
  grid-template-areas: 'scroll' 'fixed';

  height: 100%;
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
  // border-right: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  position: fixed;
  top: 0;
  width: 100%;
  max-width: ${NAVBAR_WIDTH}px;
  overflow: hidden;
  overflow-y: auto;
  padding: 12px 0 0px;
  
  ${isDesktopApp() &&
    css`
      padding-top: 40px;

      ${DesktopMenuIconsCover} {
        display: block;
      }
    `}

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    position: fixed;
    top: 0;
    z-index: 9999 /* on top of overlay and titlebar */;
    width: 100%;
    max-width: ${NAVBAR_EXPANDED_WIDTH}px;
    grid-gap: 0px;
    padding: 12px 0 0;

    ${isDesktopApp() &&
      css`
        padding-top: 40px;
      `}
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    z-index: 9999 /* on top of overlay and titlebar */;
    width: 100%;
    max-width: ${NAVBAR_EXPANDED_WIDTH}px;
    grid-gap: 0px;
    padding: 12px 0 0;

    ${isDesktopApp() &&
      css`
        padding-top: 40px;
      `}
  }
`;

// color: ${props => (props.isActive ? 
//   themed({ light:theme.text.default , dark: theme.textd.default}) 
//   : themed({ light:theme.text.alt , dark:theme.textd.alt }))};
export const AvatarGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  color: ${props => (props.isActive ? 
    themed({ light: colors.B400, dark: colors.B100 })
    : themed({ light:theme.text.alt , dark:theme.textd.alt }))};
  
  font-weight: ${props => (props.isActive ? '600' : '500')};
  background: ${props =>
    props.isActive ? 
    themed({ light:hexa(theme.text.default, 0.04), dark:hexa(theme.textd.default, 0.04) })
     : themed({ light: theme.bg.default, dark:theme.bgd.default })};

  a img {
    opacity: ${props => (props.isActive ? '1' : '0.4')};
    filter: ${props => (props.isActive ? 'none' : 'grayscale(80%)')};
  }

  ${props =>
    props.isActive &&
    css`
      // box-shadow: inset 3px 0 0 ${themed({ light:theme.text.default , dark: theme.textd.default})};
      box-shadow: inset 3px 0 0 ${() => themed({ light: colors.B400, dark: colors.B100 })};
      background-color: ${() => themed({ light: colors.N30A, dark: colors.N500A })};

      img,
      a img {
        filter: grayscale(0%) !important;
        opacity: 1 !important;
      }
    `}

  &:hover {
    box-shadow: inset 3px 0 0
      ${props => (props.isActive ? 
        themed({ light: theme.brand.default, dark: theme.brandd.default}) : 
        themed({ light: theme.bg.border, dark:theme.bgd.border }))};
    background: ${props =>
      props.isActive ? 
      themed({ light: hexa(theme.brand.default, 0.04), dark:hexa(theme.brandd.default, 0.04) }) 
      : themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    color: ${props =>
      props.isActive ? 
      themed({ light: theme.brand.default, dark: theme.brandd.default}) : 
      themed({ light: theme.text.secondary, dark:theme.textd.secondary })};

    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }

    ${BlackDot} {
      background-color: ${() => themed({ light: theme.warn.alt, dark:theme.warnd.alt })};
    }
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
`;


export const AvatarBottomGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  color: ${props => (props.isActive ? 
    themed({ light: colors.B400, dark: colors.B100 })
    : themed({ light:theme.text.alt , dark:theme.textd.alt }))};
  
  font-weight: ${props => (props.isActive ? '600' : '500')};
  background: ${props =>
    props.isActive ? 
    themed({ light:hexa(theme.text.default, 0.04), dark:hexa(theme.textd.default, 0.04) })
     : themed({ light: theme.bg.default, dark:theme.bgd.default })};

  &:hover {
    background: ${props =>
      props.isActive ? 
      themed({ light: hexa(theme.brand.default, 0.04), dark:hexa(theme.brandd.default, 0.04) }) 
      : themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    color: ${props =>
      props.isActive ? 
      themed({ light: theme.brand.default, dark: theme.brandd.default}) : 
      themed({ light: theme.text.secondary, dark:theme.textd.secondary })};

    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }

    ${BlackDot} {
      background-color: ${() => themed({ light: theme.warn.alt, dark:theme.warnd.alt })};
    }
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    img,
    a img {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
`;

export const AvatarLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  position: relative;
  color: inherit !important;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 20px 8px 12px;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 8px 20px 8px 12px;
  }
`;

export const AvatarDiv = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  position: relative;
  color: inherit !important;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex-direction: row;
    justify-content: center;
    padding: 8px 20px 8px 12px;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    flex-direction: row;
    justify-content: center;
    padding: 8px 20px 8px 12px;
  }
`;

export const Avatar = styled.img`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.2s ease-in-out;
  }
`;

export const Shortcut = styled.span`
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
  text-align: center;
  margin-bottom: -4px;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    display: none;
  }
`;

export const Label = styled.span`
  font-size: 15px;
  margin-left: 12px;
  padding-right: 12px;
  ${Truncate};
  display: none;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: block;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    display: block;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  opacity: 1;
  position: relative;

  &:hover {
    color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${() => themed({ light: theme.bg.border, dark: theme.bgd.border})};
  margin: 8px 0;
`;

// We make it a real link element because anchor links don’t work properly with React Router.
// Ref: https://github.com/ReactTraining/react-router/issues/394.
export const SkipLink = styled.a`
  overflow: hidden;
  position: absolute;
  height: 1px;
  width: 1px;

  &:focus {
    height: auto;
    width: auto;
  }
`;
