import styled from 'styled-components';
import { borderRadius, layers } from 'src/components/theme';
import { N30A, N60A, N0, DN50, text, N900, DN600 } from 'src/components/theme/colors';
import { WIDTH_ENUM, gutter, WidthNames } from '../shared-variables';
// import { zIndex } from 'src/compoentns/globals';

import {
  flexMaxHeightIEFix,
  IEMaxHeightCalcPx,
} from '../utils/flex-max-height-ie-fix';

const boxShadow = ({ isChromeless }) =>
  isChromeless
    ? 'none'
    : `
      0 0 0 1px ${N30A}, 0 2px 1px ${N30A},
      0 0 20px -6px ${N60A}
    `;

const dialogBgColor = (props) => {
  const { isChromeless } = props;
  const theme = props.theme.__PARABAIK_THEME__.mode
  return isChromeless ? 'transparent' : theme == 'light'? N0:DN50;
};

const maxDimensions = `calc(100% - ${gutter * 2}px)`;
const maxHeightDimensions = `calc(100% - ${gutter * 2 - IEMaxHeightCalcPx}px)`;

export const dialogWidth = ({ widthName, widthValue }) => {
  if (typeof widthValue === 'number') {
    return `${widthValue}px`;
  }

  return widthName ? `${WIDTH_ENUM.widths[widthName]}px` : widthValue || 'auto';
};

export const dialogHeight = ({
  heightValue,
}) => {
  if (typeof heightValue === 'number') {
    return `${heightValue}px`;
  }
  return heightValue || 'auto';
};


export const FillScreen = styled.div`
  height: 100vh;
  left: 0;
  overflow-y: auto;
  position: absolute;
  top: ${(props) => props.scrollDistance}px;
  width: 100%;
  z-index: ${layers.modal};
  -webkit-overflow-scrolling: touch;
`;


export const PositionerAbsolute = styled.div`
  display: flex;
  flex-direction: column;
  height: ${maxHeightDimensions};
  left: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: ${maxDimensions};
  position: absolute;
  right: 0;
  // top: ${gutter}px;
  top: 90px;
  width: ${dialogWidth};
  // z-index: ${layers.modal};
  z-index: 9999;
  pointer-events: none;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    max-width: 100%;
    width: 100%;
  }
`;
export const PositionerRelative = styled.div`
  margin: ${gutter}px auto;
  position: relative;
  width: ${dialogWidth};
  z-index: ${layers.modal};
  pointer-events: none;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    margin: 0;
    max-width: 100%;
    width: 100%;
  }
`;

export const Dialog = styled.div`
  ${(props) =>
    props.isChromeless
      ? null
      : `
          background-color: ${dialogBgColor(props)};
          border-radius: ${borderRadius()}px;
          box-shadow: ${boxShadow(props)};
        `}
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    dialogHeight({ heightValue: props.heightValue })};
  ${flexMaxHeightIEFix};
  outline: 0;
  pointer-events: auto;

  @media (min-width: 320px) and (max-width: 480px) {
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

PositionerAbsolute.displayName = 'PositionerAbsolute';
Dialog.displayName = 'Dialog';
FillScreen.displayName = 'FillScreen';
PositionerRelative.displayName = 'PositionerRelative';
