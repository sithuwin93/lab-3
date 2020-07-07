import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import Icon from 'src/components/icon';
import { hexa, FlexRow, FlexCol, zIndex } from '../globals';
import {
  COL_GAP,
  MAX_WIDTH,
  MEDIA_BREAK,
  TITLEBAR_HEIGHT,
  NAVBAR_EXPANDED_WIDTH,
  NAVBAR_WIDTH,
  MIN_WIDTH_TO_EXPAND_NAVIGATION,
} from 'src/components/layout';
import { themed, elevation as AkElevations,colors } from 'src/components/theme';
const elevations = { ...AkElevations };

export const DropzoneWrapper = styled.div`
  position: sticky;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom 0;
`;

export const DropImageOverlay = (props: {
  visible: boolean,
  className?: string,
}) => {
  return (
    <DropImageOverlayWrapper
      visible={props.visible}
      className={props.className}
    >
      <Icon glyph="photo" />
      <h3>Drop image to upload</h3>
    </DropImageOverlayWrapper>
  );
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 9995;
  position: fixed;
  max-width: ${MAX_WIDTH}px;
  left: ${NAVBAR_WIDTH + COL_GAP}px;
  width: 100%;
  max-width: calc(100% - ${NAVBAR_WIDTH * 2}px);

  @media (max-width: ${MEDIA_BREAK}px) {
    height: calc(100vh - ${TITLEBAR_HEIGHT}px);
    top: ${TITLEBAR_HEIGHT}px;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
  }

  @media (min-width: ${MIN_WIDTH_TO_EXPAND_NAVIGATION}px) {
    left: ${NAVBAR_EXPANDED_WIDTH + COL_GAP}px;
    max-width: calc(100% - ${NAVBAR_EXPANDED_WIDTH * 2}px);
  }
`;

export const DropImageOverlayWrapper = styled.div`
  position: absolute;
  top: -32px;
  bottom: 0;
  left: -32px;
  right: -32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${() => themed({ light:theme.bg.wash , dark: theme.bgd.wash})};
  border-radius: 4px;
  border: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  color: ${() => themed({ light:theme.text.secondary , dark:theme.textd.secondary })};
  transition: opacity 125ms ease-in-out;

  ${props =>
    props.visible
      ? css`
          opacity: 0.9;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.24);
  background: rgba(245, 246, 247, 0.9);
  z-index: 9994;
`;

export const Container = styled(FlexCol)`
  ${({ elevation }) => elevations[elevation]}

  display: flex;
  height: 100%;
  max-height: 100vh;
  width: 100%;
  max-width: ${MAX_WIDTH + 32}px;
  background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
  height: calc(100vh);
  z-index: 9995;
  // box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08), 4px 0 12px rgba(0, 0, 0, 0.08);

  @media (max-width: ${MEDIA_BREAK}px) {
    max-width: 100vw;
    max-height: calc(100vh - ${TITLEBAR_HEIGHT}px);
    padding: 0;
    box-shadow: 0;
  }
`;

export const DesktopLink = styled.a`
  display: flex;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const ButtonRow = styled(FlexRow)`
  @media (max-width: ${MEDIA_BREAK}px) {
    justify-content: flex-end;
  }
`;

export const Actions = styled.div`
  background: ${() => themed({ light:theme.bg.wash , dark: theme.bgd.wash})};
  border-top: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  padding: 8px 16px;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  display: flex;
  flex: 1 0 auto;
  height: 56px;
  min-height: 56px;
  max-height: 56px;

  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 8px;
    z-index: ${zIndex.chrome + 1};

    > ${ButtonRow} {
      width: 100%;

      > button:first-of-type {
        display: none;
      }

      > button:last-of-type {
        width: calc(100% - 16px);
        margin-right: 8px;
      }
    }
  }
`;

export const InputHints = styled(FlexRow)`
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
  font-size: 14px;
`;

// export const Dropdowns = styled(FlexRow)`
//   display: flex;
//   flex: 1;
//   height: 48px;
//   min-height: 48px;
//   max-height: 48px;
//   align-items: center;
//   background-color: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
//   border-bottom: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
//   z-index: 9999;
//   border-bottom: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
//   padding: 8px;
//   padding-left: 12px;
//   font-size: 16px;

//   @media (max-width: ${MEDIA_BREAK}px) {
//     justify-content: flex-start;
//   }
// `;

export const SelectWrapper = styled.div`
  // padding: 3px;
  margin:  0 6px 0 0;
  width: 212px;
  @media (max-width: ${MEDIA_BREAK}px) {
    width: 100%;
    margin:  0 0 3px 0;

  }
`

export const Dropdowns = styled.div`
  display: flex;
  flex: 1;
  // height: auto;
  max-height: 58px;
  align-items: center;
  background-color: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  border-bottom: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  z-index: 9999;
  border-bottom: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  padding: 8px;
  font-size: 16px;

  @media (max-width: ${MEDIA_BREAK}px) {
    // justify-content: flex-start;
    display: block;
    min-height: ${props => props.multiRow? '100px': '58px'};

  }
`;

export const DropdownsLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  line-height: 1;
  vertical-align: middle;
  position: relative;
  top: 1px;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const CommunityPreview = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
  margin-left: 16px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: ${MEDIA_BREAK}px) {
    margin-left: 0;
  }
`;

export const ChannelPreview = styled(CommunityPreview)`
  margin-left: 0;
`;

const Selector = styled.select`
  display: inline-block;
  border: none;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  margin-left: 8px;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;

  @media (max-width: ${MEDIA_BREAK}px) {
    flex: auto;
    font-size: 16px; /* has to be 16px to avoid zoom on iOS */
  }
`;

export const RequiredSelector = styled(Selector)`
  padding: 8px 12px;
  max-height: 38px;
  max-width: 212px;
  line-height: 1.2;
  border: 1px solid
    ${props => (props.emphasize ?
      themed({ light: theme.brand.alt , dark: theme.brandd.alt })
       : themed({ light: theme.bg.border, dark: theme.bgd.border}))};
  border-radius: 8px;
  color: ${props => (props.emphasize ? 
    themed({ light: theme.brand.alt, dark: theme.brandd.alt}) : 
    themed({ light: theme.text.default, dark:theme.textd.default }))};
  background-color: ${props =>
    props.disabled ? 
    themed({ light:theme.bg.wash , dark:theme.bgd.wash }) : 
    themed({ light:theme.bg.default , dark:theme.bgd.default })};

  &:focus {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.24), dark: hexa(theme.brandd.alt, 0.24)})};
  }

  &:active {
    transition: box-shadow 0.2s ease-in-out;
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light: hexa(theme.brand.alt, 0.64), dark:hexa(theme.brandd.alt, 0.64) })};
  }
`;

export const ThreadInputs = styled(FlexCol)`
  position: relative;
  padding: 32px;
  padding-bottom: 0;
  background-color: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  // z-index: ${zIndex.composer};
  z-index: 12;
  height: 100%;

  @media (max-width: ${MEDIA_BREAK}px) {
    padding: 24px;
  }
`;

export const ThreadTitle = {
  fontSize: '26px',
  padding: '0',
  outline: 'none',
  border: '0',
  // lineHeight: '1.4',
  fontWeight: '600',
  boxShadow: 'none',
  width: '100%',
  background: 'inherit',
  color: 'inherit',
  // color: '#16171A',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  minHeight: '34px',
  flex: 'none',
  display: 'inline-block',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Helvetica', 'Segoe', sans-serif",
};

export const ThreadDescription = {
  fontSize: '16px', // has to be 16px to avoid zoom on iOS
  fontWeight: '400',
  width: '100%',
  display: 'inline-block',
  lineHeight: '1.4',
  outline: 'none',
  border: '0',
  boxShadow: 'none',
  color: '#16171A',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowY: 'scroll',
  position: 'relative',
  // NOTE(@mxstbr): Magic value to make the margin between
  // the thread title and body match the preview
  marginTop: '9px',
};

export const DisabledWarning = styled.div`
  display: flex;
  flex: auto;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: ${props => themed({ light: hexa(props.theme.warn.default, 0.1), dark: hexa(props.theme.warnd.default, 0.1)})};
  color: ${() => themed({ light: theme.warn.default, dark:theme.warnd.default })};
`;

export const RenderWrapper = styled.div``;

export const InputsGrid = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
  background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  padding-bottom: 48px;
  &&::-webkit-scrollbar {
    width: 6px;
  }
  
  &&::-webkit-scrollbar-track {
    background: ${themed({light: colors.N10, dark: '#283447'})}; 
  }
   
  &&::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: ${themed({light: colors.N30,dark:colors.N300})};

  }
  
  &&::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

`;
