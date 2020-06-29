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

export const EditorInput = styled.div`
  // .public-DraftEditor-content {  
  //   color: red;
  //   text-shadow: 0px 0px 0px #000;
  //   -webkit-text-fill-color: transparent;
  // }
    height: 100%;



  .public-DraftEditorPlaceholder-root {
    color: ${() => themed({ light: colors.N100, dark: colors.DN90 })};
  }
`

export const EditorWrapper = styled.div`
  margin: 24px 100px 10px 100px;
  @media (max-width: ${DESKTOP_SITE}px) {
    margin: 8px;
    font-size: 1em;
  }
  cursor: text;
  font-size: 1.2em;
  box-sizing: border-box;
  height: 500px;
`

export const EditorMiniWrapper = styled.div`  
  width: 100%;
  margin: 0px;
  font-size: 16px;
  cursor: text;
  padding: 8px 6px;
  align-items: center;
  background-color: ${() => themed({ light: colors.N10, dark: colors.DN10 })};
  border-color: ${() => themed({ light: colors.N40, dark: colors.DN40 })};
  border-radius: 3px;
  border-width: 2px;
  border-style: solid;
  box-sizing: border-box;
  // color: #091E42;
  // cursor: text;
  // display: flex;
  // flex: 1 1 100%;
  // font-size: 16px;
  // -webkit-box-pack: justify;
  // justify-content: space-between;
  // max-width: 100%;
  // overflow: hidden;
  // vertical-align: top;
  // pointer-events: auto;
  // margin-bottom: 8px;
  &:hover {
    background-color: ${() => themed({ light: colors.N30, dark: colors.DN30 })};
    border-color: ${() => themed({ light: colors.B100, dark: colors.B75 })};

  }

  &: focus-within  {
    border-color: ${() => themed({ light: colors.B100, dark: colors.B75 })};

  }
`

// content: '\2022\2022\2022\2022\2022';

