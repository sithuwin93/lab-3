// @flow
import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import { tint } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed, colors, elevation as AkElevations, } from 'src/components/theme';
const elevations = { ...AkElevations };

export const StyledSegmentedControl = styled.div`
  ${({ elevation }) => elevations[elevation]}
  display: flex;
  width: 100%;
  // box-shadow: inset 0 -1px ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  // background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  background-color: ${() => themed({ light: colors.N20, dark: colors.N700 })};

  overflow: hidden;
  overflow-x: scroll;
  position: ${props => (props.sticky ? 'sticky' : 'relative')};
  z-index: ${props => (props.sticky ? '13' : '1')};

  ${props =>
    props.sticky &&
    css`
      top: ${props => (props.stickyOffset ? `${props.stickyOffset}px` : '0')};
    `};

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    max-width: 100vw;
    position: ${props => (props.mobileSticky ? 'sticky' : 'relative')};
    top: ${props =>
      props.mobileStickyOffset ? `${props.mobileStickyOffset}px` : '0'};
  }
`;

//  box-shadow: ${props =>
// props.isActive ? `inset 0 -2px 0 ${theme.text.default}` : 'none'};
// color: ${props => (props.isActive ? 
//   themed({ light: theme.text.default, dark:theme.textd.default }) 
//   :themed({ light: theme.text.alt, dark: theme.text.alt}) )};

export const StyledSegment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  flex: 1 0 auto;
  font-weight: 600;
  color: ${props => (props.isActive ? 
    themed({ light: colors.B400, dark: colors.B100 })
    : themed({ light:theme.text.alt , dark:theme.textd.alt }))};

  ${props =>
      props.isActive && css`
      box-shadow: inset 0 -3px 0 ${() => themed({ light: colors.B400, dark: colors.B100 })};

  `}
  text-align: center;

  &:hover {
    background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    box-shadow: ${props =>
      props.isActive
        ? `inset 0 -2px 0 ${themed({ light: theme.text.default, dark: theme.textd.default})}`
        : `inset 0 -2px 0 ${themed({ light:tint(theme.bg.wash, -16) , dark:tint(theme.bgd.wash, -16) })}`};
    color: ${props =>
      props.isActive ? 
      themed({ light: theme.text.default, dark: theme.textd.default}) : 
      themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
    cursor: pointer;
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    &:hover {
      background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
    }

    &:active {
      background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
    }
  }

  @media (min-width: ${MEDIA_BREAK}px) {
    ${props =>
      props.hideOnDesktop &&
      css`
        display: none;
      `}
  }
`;
