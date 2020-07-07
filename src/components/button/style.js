// @flow
import styled from 'styled-components';
import theme from 'shared/theme';
import { Link } from 'react-router-dom';
import { tint, hexa } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const A = styled.a`
  display: flex;
  align-items: center;
  flex: none;
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex: none;
  align-items: center;
`;

export const StyledButton = styled.button`
  font-size: ${props => (props.size === 'small' ? '15px' : '16px')};
  font-weight: 600;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  border-radius: 32px;
  padding: ${props => (props.size === 'small' ? '6px 12px' : '10px 16px')};
  background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-display: none;
  opacity: ${props => (props.disabled ? '0.6' : '1')};
  line-height: 1.2;
  transition: box-shadow 0.2s ease-in-out;

  .icon:not(:first-child):not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    background: ${() => themed({ light: theme.bg.border, dark: theme.bgd.border})};
  }

  &:focus {
    // box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})}, 0 0 0 4px ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    // transition: box-shadow 0.2s ease-in-out;
  }

  &:active {
    // box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
    //   0 0 0 4px ${themed({ light: tint(theme.bg.border, -24), dark: tint(theme.bgd.border, -24)})};
    // transition: box-shadow 0.2s ease-in-out;
  }
`;

export const StyledWhiteIconButton = styled(StyledButton)`
  background-color: transparent;
  padding: 0;
  color: ${() => themed({ light: '#f5f6f7', dark: theme.textd.default})};
  box-shadow: 5px 5px 10px #ddddde, -5px -5px 10px #ffffff;
  .icon {
    margin-right: 0;
    color: #185BF1;
  }
  &:active {
    box-shadow: inset 5px 5px 10px #ddddde, inset -5px -5px 10px #ffffff;
  }
`;

export const StyledPrimaryButton = styled(StyledButton)`
  background-color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  background-image: ${`linear-gradient(to bottom, ${themed({ light:theme.brand.alt , dark: theme.brandd.alt})}, 
  ${themed({ light: tint(theme.brand.alt,-8), dark: tint(theme.brandd.alt,-8)})})`};
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  border: 1px solid ${themed({ light: tint(theme.brand.alt, -8), dark: tint(theme.brandd.alt, -8)})};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    border: 1px solid ${themed({ light:tint(theme.brand.alt, -16) , dark: tint(theme.brandd.alt, -16)})};
    background: ${themed({ light: tint(theme.brand.alt, -8), dark:tint(theme.brandd.alt, -8) })};
    color: ${() => themed({ light:theme.text.reverse , dark:theme.textd.reverse })};
  }

  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.24), dark: hexa(theme.brandd.alt, 0.24)})};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.64), dark:hexa(theme.brandd.alt, 0.64) })};
  }
`;

export const StyledWarnButton = styled(StyledPrimaryButton)`
  background-color: ${() => themed({ light: theme.warn.default, dark: theme.warnd.default})};
  background-image: ${`linear-gradient(to bottom, 
    ${themed({ light: theme.warn.default, dark: theme.warnd.default})}, 
    ${themed({ light: tint(theme.warn.default,-8), dark: tint(theme.warnd.default,-8)})})`};
  border: 1px solid ${themed({ light: tint(theme.warn.default, -8), dark: tint(theme.warnd.default, -8)})};

  &:hover {
    border: 1px solid ${themed({ light:tint(theme.warn.default, -16) , dark: tint(theme.warnd.default, -16)})};
    background: ${themed({ light: tint(theme.warn.default, -8), dark: tint(theme.warnd.default, -8)})};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: hexa(theme.warn.default, 0.24), dark: hexa(theme.warnd.default, 0.24)})};
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light:hexa(theme.warn.default, 0.64) , dark:hexa(theme.warnd.default, 0.64) })};
  }
`;

export const StyledWhiteButton = styled(StyledButton)`
  background-color: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  border: 0;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    border: 0;
    background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
    color: ${() => themed({ light: theme.text.default, dark: theme.text.default})};
  }

  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light:hexa(theme.bg.default, 0.24) , dark:hexa(theme.bgd.default, 0.24) })};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light:hexa(theme.bg.default, 0.64) , dark:hexa(theme.bgd.default, 0.64) })};
  }
`;

export const StyledOutlineButton = styled(StyledButton)`
  background: transparent;
  // border: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  // transition: box-shadow 0.2s ease-in-out;
  box-shadow: 5px 5px 10px #ddddde, -5px -5px 10px #ffffff;
  .icon {
    color: #185BF1;
  }

  // &:hover {
  //   background: transparent;
  //   border: 1px solid ${themed({ light: tint(theme.bg.border, -8), dark: tint(theme.bgd.border, -8)})};
  // }

  // &:focus {
  //   box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark: theme.bgd.default})}, 0 0 0 4px ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  //   transition: box-shadow 0.2s ease-in-out;
  // }

  &:active {
    // box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark:theme.bgd.default })},
    //   0 0 0 4px ${themed({ light: tint(theme.bg.border, -24), dark: tint(theme.bgd.border, -24)})};
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: inset 5px 5px 10px #ddddde, inset -5px -5px 10px #ffffff;
  }
`;

export const StyledPrimaryOutlineButton = styled(StyledOutlineButton)`
  background: transparent;
  border: 1px solid ${themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    background: ${() => themed({ light:hexa(theme.brand.alt, 0.04) , dark:hexa(theme.brandd.alt, 0.04) })};
    border: 1px solid ${themed({ light: tint(theme.brand.alt, -8), dark: tint(theme.brandd.alt, -8)})};
    color: ${() => themed({ light:tint(theme.brand.alt, -8) , dark:tint(theme.brandd.alt, -8) })};
  }

  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.16), dark: hexa(theme.brandd.alt, 0.16)})};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.48), dark: hexa(theme.brandd.alt, 0.48)})};
  }
`;

export const StyledWhiteOutlineButton = styled(StyledOutlineButton)`
  background: transparent;
  border: 1px solid ${themed({ light: theme.bg.default, dark: theme.bgd.default})};
  color: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    background: ${() => themed({ light: hexa(theme.bg.default, 0.04), dark:hexa(theme.bgd.default, 0.04) })};
    border: 1px solid ${themed({ light: theme.bg.default, dark: theme.bgd.default})};
    color: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  }

  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: hexa(theme.bg.default, 0.16), dark:hexa(theme.bgd.default, 0.16) })};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: hexa(theme.bg.default, 0.48), dark:hexa(theme.bgd.default, 0.48) })};
  }
`;

export const StyledHoverWarnOutlineButton = styled(StyledOutlineButton)`
  &:hover {
    background: ${() => themed({ light: theme.warn.default, dark: theme.warnd.default})};
    border: 1px solid ${themed({ light: theme.warn.default, dark: theme.warnd.default})};
    color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light:hexa(theme.warn.default, 0.48) , dark:hexa(theme.warnd.default, 0.48) })};
  }
`;

export const StyledTextButton = styled(StyledOutlineButton)`
  border: 0;

  &:hover {
    background: transparent;
    border: 0;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })}, 0 0 0 4px ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
    transition: box-shadow 0.2s ease-in-out;
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light: tint(theme.bg.border, -24), dark: tint(theme.bgd.border, -24)})};
    transition: box-shadow 0.2s ease-in-out;
  }
`;

export const StyledFacebookButton = styled(StyledPrimaryButton)`
  background-color: ${() => themed({ light: theme.social.facebook.default, dark: theme.sociald.facebook.default})};
  background-image: none;
  border: 1px solid ${themed({ light: tint(theme.social.facebook.default, -8), dark: tint(theme.sociald.facebook.default, -8)})};

  &:hover {
    border: 1px solid ${themed({ light: tint(theme.social.facebook.default, -16), dark: tint(theme.sociald.facebook.default, -16)})};
    background: ${themed({ light: tint(theme.social.facebook.default, -8), dark: tint(theme.sociald.facebook.default, -8)})};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark: theme.bgd.default})},
      0 0 0 4px ${hexa(theme.social.facebook.default, 0.24)};
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})},
      0 0 0 4px ${themed({ light:hexa(theme.social.facebook.default, 0.64) , dark:hexa(theme.sociald.facebook.default, 0.64) })};
  }
`;

export const StyledTwitterButton = styled(StyledPrimaryButton)`
  background-color: ${() => themed({ light: theme.social.twitter.default, dark: theme.sociald.twitter.default})};
  background-image: none;
  border: 1px solid ${themed({ light:tint(theme.social.twitter.default, -8) , dark: tint(theme.sociald.twitter.default, -8)})};

  &:hover {
    border: 1px solid ${themed({ light: tint(theme.social.twitter.default, -16), dark:tint(theme.sociald.twitter.default, -16) })};
    background: ${themed({ light: tint(theme.social.twitter.default, -8), dark: tint(theme.sociald.twitter.default, -8)})};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bg.default})},
      0 0 0 4px ${themed({ light: hexa(theme.social.twitter.default, 0.24), dark: hexa(theme.sociald.twitter.default, 0.24)})};
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light:hexa(theme.social.twitter.default, 0.64) , dark:hexa(theme.sociald.twitter.default, 0.64) })};
  }
`;
