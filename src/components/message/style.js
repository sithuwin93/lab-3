// @flow
import theme from 'shared/theme';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { SvgWrapper } from 'src/components/icon';
import { Truncate, monoStack, hexa } from 'src/components/globals';
import { Wrapper as EditorWrapper } from '../rich-text-editor/style';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';
import {
  DESKTOP_SITE,
} from 'src/components/layout';

export const Byline = styled.span`
  display: flex;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  user-select: none;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  max-width: 100%;
  position: relative;
  flex-wrap: wrap;
  align-items: center;

  a {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Name = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  margin-right: 2px;
  display: flex;

  &:hover {
    color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};
    cursor: pointer;
  }

  @media (max-width: 400px) {
    line-height: 1.4;
  }
`;

export const Username = styled(Name)`
  font-weight: 400;
  margin-left: 2px;
  margin-right: 2px;
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
  display: flex;

  @media (max-width: 400px) {
    line-height: 1.4;
  }
`;

export const ActionsContainer = styled.span`
  position: absolute;
  top: -16px;
  right: -16px;
  height: 28px;
  width: 50%;
  pointer-events: none;
  opacity: 0;
`;

export const Actions = styled.ul`
  position: absolute;
  top: 0;
  right: 16px;
  border-radius: 4px;
  border: 1px solid ${() => themed({ light: theme.bg.border, dark:theme.bgd.border })};
  background: ${() => themed({ light:theme.bg.default, dark: theme.bgd.default})};
  list-style-type: none;
  display: flex;
  margin-left: 30px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export const Action = styled.li`
  border-left: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  padding: 3px 10px;
  display: flex;
  flex: 0 1 auto;
  color: ${() => themed({ light:theme.text.secondary , dark:theme.textd.secondary })};

  &:hover {
    cursor: pointer;d
    color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  }

  &:first-child {
    border-left: 0;
  }
`;

export const LikeAction = styled(Action)`
  color: ${props =>
    props.hasReacted ? 
    themed({ light: props.theme.warn.alt, dark: props.theme.warnd.alt}) 
    : themed({ light: props.theme.text.secondary, dark: props.theme.textd.secondary})};

  &:hover {
    color: ${props =>
      props.hasReacted ? 
      themed({ light:props.theme.warn.alt , dark:props.theme.warnd.alt })
       : themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
  }
`;

export const GutterTimestamp = styled(Link)`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 72px;
  font-size: 14px;
  font-weight: 400;
  color: ${() => themed({ light:theme.text.secondary , dark:theme.textd.secondary })};
  opacity: 0;
  ${Truncate};

  @media (max-width: 400px) {
    display: none !important;
  }
`;

export const OuterMessageContainer = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  padding-right: 16px;
  align-self: stretch;
  position: relative;
  padding-right: 16px;
  background: ${props =>
    props.selected
      ? themed({ light: props.theme.special.wash, dark:props.theme.speciald.wash })
      : props.error
      ? themed({ light: props.theme.warn.wash, dark:props.theme.warnd.wash })
      : 'transparent'};

  ${props =>
    props.selected &&
    css`
      background: ${() => themed({ light:props.theme.special.wash , dark:props.theme.speciald.wash })};

      ${ActionsContainer} {
        opacity: 1;
        pointer-events: auto;
      }

      ${GutterTimestamp} {
        opacity: 1;
      }
    `}

  &:hover,
  &:focus,
  &:active {
    background: ${props =>
      props.selected
        ? themed({ light:props.theme.special.wash , dark:props.theme.speciald.wash })
        : props.error
        ? themed({ light:props.theme.warn.border , dark:props.theme.warnd.border })
        : themed({ light: props.theme.bg.wash, dark: props.theme.bgd.wash})};

    ${ActionsContainer} {
      opacity: 1;
      pointer-events: auto;
    }

    ${GutterTimestamp} {
      opacity: 1;
    }
  }
`;

export const InnerMessageContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding-right: 32px;
  flex-direction: column;
  padding: 4px 0;
  position: relative;
`;

export const GutterContainer = styled.div`
  display: flex;
  width: 72px;
  min-width: 72px;
  max-width: 72px;
`;

export const AuthorAvatarContainer = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
`;

const Bubble = styled.div`
  display: inline-block;
  border-radius: 16px;
  vertical-align: middle;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-word;
  align-self: flex-start;
  clear: both;

  &::selection {
    background-color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  }

  code {
    border-radius: 4px;
    padding: 2px 4px;
    background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
    border: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
    color: ${() => themed({ light:theme.text.secondary , dark: theme.textd.secondary})};
  }

  pre {
    font-size: 14px;
    margin: 8px 0;
    width: 100%;
    border-radius: 8px;
    padding: 8px 16px;
    background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    border: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
    color: ${() => themed({ light:theme.text.secondary , dark: theme.textd.secondary})};
  }

  pre code {
    padding: 0;
    background: none;
    border: none;
    color: inherit;
  }
`;

export const Text = styled(Bubble)`
  font-size: 16px;
  line-height: 1.4;
  color: ${props =>
    props.error ? props.theme.warn.default : props.theme.text.default};
  font-weight: 400;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;

  a {
    text-decoration: underline;
    word-break: break-word;
  }

  ul,
  ol {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const Emoji = styled(Bubble)`
  font-size: 48px;
  line-height: 1;
  vertical-align: middle;
  clear: both;
  display: block;
  margin-top: 12px;
  display: flex;
  align-self: flex-start;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:first-of-type:not(:last-of-type) {
    /* if two emojis are posted back to back, don't add margin to the first one */
    margin-bottom: 0;
  }

  & + & {
    margin: 0; /* if two emojis are next to each other, no margin needed */
  }

  & + img {
    margin-top: 8px; /* if emoji is followed by an image */
    margin-bottom: 8px;
  }

  & + p {
    margin-top: 8px; /* if emoji is followed by a bubble, add margin to the bubble */
  }
`;

export const Image = styled.img`
  display: block;
  clear: both;
  flex: 0 0 auto;
  vertical-align: middle;
  border-radius: 16px;
  max-width: 100%;
  display: flex;
  align-self: flex-start;
  opacity: 1;
  transition: opacity 0.2s ease-out;
  border: 1px solid #f6f7f8;
  margin-top: 0;
  margin-bottom: 0;
  cursor: pointer;
`;

export const Code = styled(Bubble)`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${() => themed({ light:theme.bg.reverse , dark:theme.bgd.reverse })};
  border: 1px solid ${() => themed({ light: theme.bg.border, dark:theme.bgd.border })};
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  max-width: 100%;
  overflow-x: scroll;
  list-style: none;
`;

export const Line = styled.pre`
  display: inline-block;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
  ${monoStack};
  border: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
`;

export const Paragraph = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  @media (max-width: ${DESKTOP_SITE}px) {
    font-size: 1em;
  }
  font-size: 1.2em;

  &:not(:empty) ~ &:not(:empty) {
    margin-top: 8px;
  }
`;



export const BlockQuote = styled.blockquote`
  line-height: 1.5;
  // border-left: 4px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  padding: 4px 12px 4px 16px;
  font-family: Lobster, cursive !important;
  font-style: italic;
  && > div > span::before {
    content: open-quote;
  }
  && > div > span::after {
    content: close-quote;
  }
  && > div > span {
    quotes: "“" "”" "‘" "’";
  }

`;

export const QuotedParagraph = styled.div`
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};

  code {
    color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  }
  /* overrides Bubble component styles to fix #3098 */
  pre {
    margin: 0;
    margin-top: 8px;
    width: 100%;
    border: 1px solid ${props => themed({ light: hexa(props.theme.brand.border, 0.5), dark: hexa(props.theme.brandd.border, 0.5)}) };
    color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  }
`;

export const QuoteWrapperGradient = styled.div`
  background: linear-gradient(
    to top,
    ${() => themed({ light: '#FFFFFF', dark:'#000000' })},
    rgba(255, 255, 255, 0)
  );
  height: 2em;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const QuoteWrapper = styled.div`
  border-left: 4px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  padding: 4px 12px 4px 16px;
  max-height: ${props => (props.expanded ? 'none' : '7em')};
  margin-top: 4px;
  margin-bottom: 8px;
  overflow-y: hidden;
  cursor: pointer;
  position: relative;

  ${SvgWrapper} {
    margin-left: -3px;
    margin-right: 2px;
  }

  /* Don't change the color of the name and username on hover since they aren't clickable in quotes */
  ${Username}:hover, ${Byline}:hover {
    color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  }

  ${Name} {
    font-size: 14px;
    font-weight: 600;
    color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  }

  ${Name}:hover {
    color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  }

  ${Username} {
    font-size: 13px;
    font-weight: 500;
    color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  margin-left: 4px;

  @media (max-width: 400px) {
    margin-top: 4px;
  }
`;

export const EditorInput = styled(EditorWrapper)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: auto;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  min-height: 40px;
  padding: 8px 16px;
  transition: padding 0.2s ease-in-out;
  border-radius: 4px;
  border: 1px solid ${props => themed({ light: props.theme.bg.border, dark: props.theme.bgd.border})};
  transition: border 0.3s ease-out;
  color: ${props => themed({ light:props.theme.text.secondary , dark:props.theme.textd.secondary })};
  background: ${props => themed({ light: props.theme.bg.default, dark:props.theme.bgd.default })};
  max-width: 100%;
  word-break: break-all;

  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 16px;
    padding-left: 16px;
  }

  &::placeholder {
    color: ${props => themed({ light: props.theme.text.placeholder, dark:props.theme.textd.placeholder })};
  }
  &::-webkit-input-placeholder {
    color: ${props => themed({ light: props.theme.text.placeholder, dark:props.theme.textd.placeholder })};
  }
  &:-moz-placeholder {
    color: ${props => themed({ light: props.theme.text.placeholder, dark:props.theme.textd.placeholder }) };
  }
  &:-ms-input-placeholder {
    color: ${props => themed({ light: props.theme.text.placeholder, dark:props.theme.textd.placeholder })};
  }

  &:hover {
    border-color: ${props => themed({ light: props.theme.text.alt, dark:props.theme.textd.alt })};
    transition: border-color 0.2s ease-in;
  }

  pre {
    ${monoStack};
    font-size: 15px;
    font-weight: 500;
    background-color: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
    border: 1px solid ${() => themed({ light: theme.bg.border, dark: theme.bgd.border})};
    border-radius: 2px;
    padding: 4px;
    margin-right: 16px;
  }

  blockquote {
    line-height: 1.5;
    border-left: 4px solid ${() => themed({ light: theme.bg.border, dark:theme.bgd.border })};
    color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt})};
    padding: 4px 12px 4px 16px;
  }
`;

export const EditActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

export const EditedIndicator = styled.span`
  display: block;
  font-size: 11px;
  color: ${props => themed({ light:props.theme.text.alt , dark: props.theme.textd.alt})};
`;

export const ThreadAttachmentsContainer = styled.ul``;
