import styled from 'styled-components';
import {
  elevation as AkElevations,
  themed,
  colors,
} from 'src/components/theme';
import {
  DESKTOP_SITE,
} from 'src/components/layout';

export const TitleWrapper = styled.div`
  margin: 20px 100px 10px 100px;
  @media (max-width: ${DESKTOP_SITE}px) {
    margin: 8px;
  }
`

export const TitleArea = styled.textarea`
  overflow: hidden;
  border: none;
  outline: none;
  width: 100%;
  resize: none;
  vertical-align: bottom;
  color: ${() => themed({ light: colors.N500, dark: '#B8C7E0' })};
  /* Blend into the page bg colour. This way it's theme agnostic. */
  background: transparent;

  &::placeholder {
    color: ${colors.N90};
  }
  font-family: 'Bree Serif', serif;
  @media (max-width: ${DESKTOP_SITE}px) {
    font-size: 28px;
  }
  font-size: 36px;

  font-weight: 500;
  line-height: 56px;
`;

export const EditorWrapper = styled.div`
  margin: 24px 100px 10px 100px;
  @media (max-width: ${DESKTOP_SITE}px) {
    margin: 8px;
    font-size: 1em;
  }
  cursor: text;
  font-size: 1.2em;




code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

}

/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #2d2d2d;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: .1em;
  border-radius: .3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #999;
}

.token.punctuation {
  color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #e2777a;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
  color: #67cdcc;
}

.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: green;
}
// emoji plugin
.draftJsEmojiPlugin__emojiSelect__34S1B {
  display: inline-block;
}

.draftJsEmojiPlugin__emojiSelectButton__3sPol, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
  margin: 0;
  padding: 0;
  width: 2.5em;
  height: 1.5em;
  box-sizing: border-box;
  line-height: 1.2em;
  font-size: 1.5em;
  color: ${() => themed({ light: '#000', dark: '#fff' })};
  background: ${() => themed({ light: '#fff', dark: '#000' })};
  border: ${() => themed({ light: '1px solid #fff', dark: '1px solid #000' })};
  border-radius: 1.5em;
  cursor: pointer;
}

.draftJsEmojiPlugin__emojiSelectButton__3sPol:focus, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:focus {
  outline: 0;
  /* reset for :focus */
}

.draftJsEmojiPlugin__emojiSelectButton__3sPol:hover, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:hover {
  background: ${() => themed({ light: '#fff', dark: '#000' })};
}

.draftJsEmojiPlugin__emojiSelectButton__3sPol:active, .draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu:active {
  background: ${() => themed({ light: '#fff', dark: '#000' })};
}

.draftJsEmojiPlugin__emojiSelectButtonPressed__2Tezu {
  background:${() => themed({ light: '#fff', dark: '#000' })};
}

.draftJsEmojiPlugin__emojiSelectPopover__1J1s0 {
  margin-top: 10px;
  padding: 0 .3em;
  position: absolute;
  z-index: 1000;
  box-sizing: content-box;
  background: ${() => themed({ light: '#fff', dark: '#000' })};
  border: ${() => themed({ light: '1px solid #fff', dark: '1px solid #000' })};
  box-shadow: ${() => themed({ light: '0 4px 8px -2px rgba(9,30,66,0.25),0 0 1px rgba(9,30,66,0.31)', dark: '0 4px 8px -2px rgba(13,20,36,0.85), 0 0 1px rgba(13,20,36,0.81)' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverClosed__3Kxxq {
  display: none;
}

.draftJsEmojiPlugin__emojiSelectPopoverTitle__3tpXz {
  margin: 0 0 .3em;
  padding-left: 1em;
  height: 2.5em;
  line-height: 2.5em;
  font-weight: normal;
  font-size: 1em;
  color:${() => themed({ light: '#000', dark: '#fff' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m {
  margin: 0 0 .3em;
  position: relative;
  z-index: 0;
  width: 21em;
  height: 20em;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE {
  padding: 0 .5em;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroup__3zwcE:first-child .draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
  display: none;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroupTitle__2pC51 {
  margin: 1em 0;
  padding-left: .5em;
  font-weight: normal;
  font-size: 1em;
  color: ${() => themed({ light: '#000', dark: '#fff' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverGroupList__HQ8_y {
  margin: 0;
  padding: 0;
  display: -webkit-box;
  display: flex;
  list-style: none;
  flex-wrap: wrap;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroupItem__2pFOS {
  width: 2.5em;
  height: 2.5em;
}

.draftJsEmojiPlugin__emojiSelectPopoverToneSelect__28bny {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}

.draftJsEmojiPlugin__emojiSelectPopoverToneSelectList__haFSJ {
  margin: .3em;
  padding: .3em;
  position: absolute;
  display: -webkit-box;
  display: flex;
  list-style: none;
  border: ${() => themed({ light: '1px solid #fff', dark: '1px solid #000' })};
  border-radius: .5em;
  background: ${() => themed({ light: '#fff', dark: '#000' })};
  box-shadow: ${() => themed({ light: '0 4px 8px -2px rgba(9,30,66,0.25),0 0 1px rgba(9,30,66,0.31)', dark: '0 4px 8px -2px rgba(13,20,36,0.85), 0 0 1px rgba(13,20,36,0.81)' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL {
  width: 2.5em;
  height: 2.5em;
}

.draftJsEmojiPlugin__emojiSelectPopoverToneSelectItem__2SgvL:first-child {
  border-right: ${() => themed({ light: '1px solid #fff', dark: '1px solid #000' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverEntry__1ErDJ, .draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
  padding: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  outline: none;
  transition: background-color 0.4s cubic-bezier(0.27, 1.27, 0.48, 0.56);
}

.draftJsEmojiPlugin__emojiSelectPopoverEntryFocused__M28XS {
  background-color: ${() => themed({ light: '#fff', dark: '#000' })};
}

.draftJsEmojiPlugin__emojiSelectPopoverEntryIcon__1yNaC {
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
}

.draftJsEmojiPlugin__emojiSelectPopoverNav__1Nzd7 {
  margin: 0;
  padding: 0 .5em;
  display: -webkit-box;
  display: flex;
  width: 20em;
  list-style: none;
}

.draftJsEmojiPlugin__emojiSelectPopoverNavItem__qydCX {
  width: 2.5em;
  height: 2.5em;
}

.draftJsEmojiPlugin__emojiSelectPopoverNavEntry__1OiGB, .draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
  padding: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2em;
  color: ${() => themed({ light: '#000', dark: '#fff' })};
  background: none;
  border: none;
  outline: none;
}

.draftJsEmojiPlugin__emojiSelectPopoverNavEntryActive__2j-Vk {
  color: ${() => themed({ light: '#000', dark: '#fff' })};;
}

.draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
  position: absolute;
  right: 0;
  top: .3em;
  bottom: .3em;
  width: .25em;
  background-color: ${() => themed({ light: '#fff', dark: '#000' })};
  border-radius: .125em;
  opacity: .1;
  transition: opacity .4s;
}

.draftJsEmojiPlugin__emojiSelectPopoverScrollbarThumb__jGYdG {
  background-color: ${() => themed({ light: '#fff', dark: '#000' })};
  border-radius: .125em;
  cursor: pointer;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m:hover .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6 {
  opacity: .3;
}

.draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:hover,
.draftJsEmojiPlugin__emojiSelectPopoverGroups__35t9m .draftJsEmojiPlugin__emojiSelectPopoverScrollbar__1Xjc6:active {
  opacity: .6;
}
.draftJsEmojiPlugin__emoji__2oqBk {
  background-position: center;
  /* make sure the background the image is only shown once */
  background-repeat: no-repeat;
  background-size: contain;
  /* move it a bit further down to align it nicer with the text */
  vertical-align: middle;

  /*
  We need to limit the emoji width because it can be multiple characters
  long if it is a 32bit unicode. Since the proper width depends on the font and
  it's relationship between 0 and other characters it's not ideal. 1.95ch is not
  the best value, but hopefully a good enough approximation for most fonts.
  */
  display: inline-block;
  overflow: hidden;
  max-width: 1.95ch;
  /*
  Needed for iOS rendering to avoid some icons using a lot of height without
  actually needing it.
  */
  max-height: 1em;
  line-height: inherit;
  margin: -.2ex 0em .2ex;
  /*
  In the past we used opacity: 0 to hide the original Emoji icon no matter what
  system it is. Recently we switched to color: transparent since it started to
  work in recent iOS version.
  */
  color: transparent;

  /*
  Some SVG files (say 2764 for :heart:) don't have default width/height, thus
  may not be rendered properly on some platforms/browsers (e.g., Windows 10 +
  Chrome 61).
  */
  min-width: 1em;
}
.draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_ {
  padding: 5px 10px 1px 10px;
  transition: background-color 0.4s cubic-bezier(.27,1.27,.48,.56);
}

.draftJsEmojiPlugin__emojiSuggestionsEntry__2-2p_:active {
  background-color: ${() => themed({ light: '#cce7ff', dark: '#fff' })};
}

.draftJsEmojiPlugin__emojiSuggestionsEntryFocused__XDntY {
  background-color: ${() => themed({ light: '#fff', dark: '#000' })};
}

.draftJsEmojiPlugin__emojiSuggestionsEntryText__2sPjk {
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 368px;
  font-size: 0.9em;
}

.draftJsEmojiPlugin__emojiSuggestionsEntryIcon__1qC2V {
  width: 1em;
  height: 1em;
  margin-left: 0.25em;
  margin-right: 0.25em;
  display: inline-block;
}
.draftJsEmojiPlugin__emojiSuggestions__2ffcV {
  border: ${() => themed({ light: '1px solid #fff', dark: '1px solid #000' })};
  margin-top: 1.75em;
  position: absolute;
  min-width: 220px;
  max-width: 440px;
  background: ${() => themed({ light: '#fff', dark: '#000' })};
  border-radius: 2px;
  box-shadow: ${() => themed({ light: '0 4px 8px -2px rgba(9,30,66,0.25),0 0 1px rgba(9,30,66,0.31)', dark: '0 4px 8px -2px rgba(13,20,36,0.85), 0 0 1px rgba(13,20,36,0.81)' })};
  cursor: pointer;
  padding-top: 8px;
  padding-bottom: 8px;
  z-index: 2;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  box-sizing: border-box;
  -webkit-transform: scale(0);
          transform: scale(0);
}

.draftJsFocusPlugin__unfocused__1Wvrs:hover {
  cursor: default;
  border-radius: 2px;
  box-shadow: 0 0 0 3px #D2E3F7;
}

.draftJsFocusPlugin__focused__3Mksn {
  cursor: default;
  border-radius: 2px;
  box-shadow: 0 0 0 3px #ACCEF7;
}


.draftJsDividerPlugin__dividerBlock__4VxnL {
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  width: 100%;
  height: 100%;
  margin: 32px 0;
  border: none; /* strip default hr styling */
  text-align: center;
}

.draftJsDividerPlugin__dividerBlock__4VxnL::after {
  margin-left: 48px;
  /* color: #091E42; */
  font-size: 2.125rem;
  letter-spacing: 48px; /* increase space between dots */
} 
`
  // content: '\2022\2022\2022\2022\2022';
