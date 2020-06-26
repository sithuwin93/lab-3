// @flow
import { createGlobalStyle } from 'styled-components';
// $FlowIssue
// import prismGlobalCSS from '!!raw-loader!./components/rich-text-editor/prism-theme.css';
import prismGlobalCSS from '!!raw-loader!./components/editor/css/prism.css';
import draftGlobalCSS from '!!raw-loader!./components/editor/css/draft.css';
import draftInlineGlobalCSS from '!!raw-loader!./components/editor/css/draft-js-inline-toolbar-plugin.css';
import draftToolbarGlobalCSS from '!!raw-loader!./components/editor/css/draft-js-side-toolbar-plugin.css';
import draftEmojiGlobalCSS from '!!raw-loader!./components/editor/css/draft-js-emoji-plugin.css';
import draftFocusGlobalCSS from '!!raw-loader!./components/editor/css/draft-js-focus-plugin.css';

import theme from 'shared/theme';
import { themed, colors } from 'src/components/theme';

export default createGlobalStyle`
  ${prismGlobalCSS}
  ${draftGlobalCSS}
  ${draftInlineGlobalCSS}
  ${draftToolbarGlobalCSS}
  ${draftEmojiGlobalCSS}
  ${draftFocusGlobalCSS}
  * {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: auto;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  html {
    display: flex;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    background-color: ${themed({ light: theme.bg.wash, dark:theme.bgd.wash})};
    color: #16171a;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: auto;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  body {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overscroll-behavior-y: none;
    -webkit-overflow-scrolling: touch;
  }

  #root {
    height: 100%
    width: 100%;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  ::-moz-selection {
    /* Code for Firefox */
    background: ${themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
    color: ${themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  }

  ::selection {
    background: ${themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
    color: ${theme.text.reverse};
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: ${themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: ${themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }

  .fade-enter {
    opacity: 0;
    z-index: 1;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .markdown {
    font-size: 16px;
    line-height: 1.4;
    color: ${themed({ light: theme.text.default, dark:theme.textd.default })};
  }

  .markdown pre {
    font-size: 15px;
    white-space: pre;
  }

  .markdown p {
    color: inherit;
    font-size: 16px;
    font-weight: 400;
    display: block;
  }

  .markdown p + p {
    margin-top: 16px;
  }

  .markdown img {
    margin-top: 16px;
    max-width: 100%;
    display: inline;
    border-radius: 4px;
    transition: box-shadow 0.2s;
    display: block;
    margin: 12px 0;
  }

  .markdown img:hover {
    cursor: pointer;
    transition: box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .markdown em {
    color: inherit;
    font-size: inherit;
    font-style: italic;
  }

  .markdown strong {
    color: inherit;
    font-size: inherit;
    font-weight: 700;
  }

  .markdown ul,
  .markdown ol {
    color: inherit;
    margin: 8px 0;
    margin-left: 16px;
  }

  .markdown li {
    color: inherit;
    font-size: 16px;
    margin-bottom: 4px;
    line-height: 1.5;
    font-weight: 400;
  }

  .markdown blockquote {
    color: ${themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
    border-left: 4px solid ${themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
    background: ${themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
    padding: 4px 8px 4px 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    margin: 16px 0;
    word-break: break-all;
  }

  .markdown blockquote p {
    margin-top: 0;
  }

  .markdown a {
    color: ${themed({ light:theme.brand.default , dark: theme.brandd.default})};
    font-weight: 500;
    text-decoration: none;
    font-size: inherit;
    word-wrap: break-word;
    line-height: inherit;
  }

  .markdown a:hover {
    text-decoration: underline;
  }

  .markdown a:visited {
    opacity: 0.6;
    transition: opacity 0.2s ease-in;
  }

  .markdown code {
    font-family: 'Input Mono', 'Menlo', 'Inconsolata', 'Roboto Mono', monospace;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.4px;
    background-color: ${themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
    padding: 2px 4px;
    display: inline;
    width: 100%;
    border: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .markdown pre {
    margin: 16px 0;
    display: block;
    border-radius: 4px;
    background-color: ${themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  }

  .markdown pre code {
    padding: 8px 16px;
    display: block;
    white-space: pre;
    position: relative;
    margin: 0;
    border: none;
    background: none;
  }

  .markdown div[data-block='true'] {
    margin-top: 12px;
  }

  .markdown div[data-block='true']:first-of-type {
    margin-top: 0;
  }

  .markdown span[data-text='true'] {
    line-height: 1.4;
  }

  .markdown code span {
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .markdown iframe {
    margin: 1rem 0;
  }

  .markdown hr {
    width: 100%;
    height: 1px;
    background: ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    display: block;
    margin: 32px 0;
  }

  .markdown h1 {
    font-size: 24px;
    line-height: 40px;
    border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    font-weight: 800;
    margin-top: 1rem;
    margin-bottom: 8px;
  }

  .markdown h2 {
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 8px;
  }

  .markdown h3 {
    font-size: 18px;
    line-height: 28px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 8px;
  }

  .markdown h4 {
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 8px;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .markdown h5 {
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 8px;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .markdown h6 {
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 8px;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .threadComposer textarea {
    line-height: 1.5;
    height: calc(100% + 48px)!important;
  }
  
  .tippy-backdrop {
    background-color: ${themed({ light: theme.text.default, dark: theme.textd.default})};
  }

  .public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul {
    display: table;
  }

  .ol-level-0 {
    display: table;
  }

  .ol-level-1 {
    list-style-type: lower-alpha;
  }

  .ol-level-2 {
    list-style-type: lower-roman;
  }

  .ol-level-4 {
    list-style-type: lower-alpha;
  }

  /* Quotes */
  blockquote{
    line-height: 1.5;
    // border-left: 4px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
    padding: 4px 12px 4px 16px;
	  font-family: Lobster, cursive !important;
    font-style: italic;
  }

  blockquote> div > span::before {
    content: open-quote;
  }
  blockquote> div > span::after {
    content: close-quote;
  }
  blockquote > div > span {
    quotes: "“" "”" "‘" "’";
  }
  
  
`;
