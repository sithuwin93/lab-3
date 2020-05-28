// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { zIndex } from 'src/components/globals';
import { themed } from 'src/components/theme';
export const Container = styled.div`
  display: grid;
  grid-gap: 16px;
  align-items: flex-end;
  padding: 16px 0;
  grid-template-columns: repeat(2, 1fr);
`;

export const A = styled.a`
  display: flex;
  grid-column: 1 / 2 span;
`;

export const SigninButton = styled.div`
  display: flex;
  flex: 1;
  z-index: ${zIndex.card + 1};
  flex-direction: flex-row;
  align-self: flex-start;
  align-items: center;
  justify-content: flex-start;
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  border-radius: 32px;
  padding: 8px 16px;
  font-size: 15px;
  font-weight: 600;
  position: relative;
  width: 100%;
  cursor: pointer;
  ${props => props.showAfter && `margin-top: 32px`};

  ${props =>
    props.showAfter &&
    `
    &:after {
        content: 'Previously signed in with';
        position: absolute;
        top: -32px;
        font-size: 14px;
        font-weight: 600;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;
        color: ${() => themed({ light: props.theme.text.alt, dark:props.theme.textd.alt })};
      }
    `} svg {
    fill: currentColor !important;
  }
`;

export const Label = styled.span`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  margin-top: -1px;
  margin-left: 8px;
  line-height: 2.45;
  word-break: keep-all;
  white-space: nowrap;
  color: currentColor;
`;

export const TwitterButton = styled(SigninButton)`
  background: ${props =>
    props.preferred ?
    themed({ light: props.theme.social.twitter.default, dark: props.theme.sociald.twitter.default})  : 'none'};
  color: ${props =>
    props.preferred ? '#fff' : 
    themed({ light: props.theme.social.twitter.default, dark: props.theme.sociald.twitter.default})};

  &:after {
    color: ${() => themed({ light: theme.social.twitter.default, dark:theme.sociald.twitter.default })};
  }
`;

export const FacebookButton = styled(SigninButton)`
  background: ${props =>
    props.preferred ? themed({ light: props.theme.social.facebook.default, dark:props.theme.sociald.facebook.default })  : 'none'};
  color: ${props =>
    props.preferred ? '#fff' : themed({ light: props.theme.social.facebook.default, dark: props.theme.sociald.facebook.default})};

  &:after {
    color: ${() => themed({ light: theme.social.facebook.default, dark:theme.sociald.facebook.default })};
  }
`;

export const GoogleButton = styled(SigninButton)`
  background: ${props =>
    props.preferred ? themed({ light:props.theme.social.google.default , dark:props.theme.sociald.google.default }) : 'none'};
  color: ${props =>
    props.preferred ? '#fff' : themed({ light:props.theme.social.google.default , dark:props.theme.sociald.google.default })};

  &:after {
    color: ${() => themed({ light: theme.social.google.default, dark: theme.sociald.google.default})};
  }
`;

export const GithubButton = styled(SigninButton)`
  background: ${props =>
    props.preferred ? themed({ light:props.theme.social.github.default , dark: props.theme.sociald.github.default})  : 'none'};
  color: ${props =>
    props.preferred ? '#fff' : themed({ light: props.theme.social.github.default, dark:props.theme.sociald.github.default})};

  &:after {
    color: ${() => themed({ light:theme.text.default , dark: theme.textd.default})};
  }
`;
