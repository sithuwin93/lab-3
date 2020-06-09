import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { themed } from 'src/components/theme';
import { gridSize } from 'src/components/theme';
import { N30, DN30, R400, Y400, N0, DN50, N900, DN600 } from 'src/components/theme/colors';
import { divide } from 'src/components/theme/math';
import { flexMaxHeightIEFix } from '../utils/flex-max-height-ie-fix';

const backgroundColor = themed({ light: N0, dark: DN50 });
const textColor = themed({ light: N900, dark: DN600 });
console.log("themed({ light: N0, dark: DN50 });",themed({ light: N0, dark: DN50 })())
const modalPadding = gridSize() * 3;
const keylineColor = themed({ light: N30, dark: DN30 });
export const keylineHeight = 2;
export const wrapperStyles = css`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  ${flexMaxHeightIEFix};
`;

export const Header = styled.header`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
  z-index: 1;
  padding: ${modalPadding}px ${modalPadding}px ${modalPadding - keylineHeight}px
    ${modalPadding}px;
  box-shadow: ${props =>
    props.showKeyline
      ? `0 ${keylineHeight}px 0 0 ${keylineColor(props)}`
      : 'none'};
`;

export const Title = styled.h4`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-style: inherit;
  font-weight: 500;
  letter-spacing: -0.008em;
  line-height: 1;
  margin: 0;
  min-width: 0;
  color: red;
`;

export const TitleText = styled.span`
  flex: 1 1 auto;
  min-width: 0;
  word-wrap: break-word;
  width: 100%;
  ${props =>
    !props.isHeadingMultiline &&
    `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};
`;

const iconColor = {
  danger: R400,
  warning: Y400,
};

export const titleIconWrapperStyles = (appearance) => css`
  color: ${iconColor[appearance]};
  margin-right: ${gridSize()}px;
  flex: 0 0 auto;
`;

export const bodyStyles = (shouldScroll) => css`
  flex: 1 1 auto;
  ${shouldScroll
    ? `
        overflow-y: auto;
        overflow-x: hidden;
        padding: ${keylineHeight}px ${modalPadding}px;
      `
    : `
        padding: 0 ${modalPadding}px;
      `}

  @media (min-width: 320px) and (max-width: 480px) {
    overflow-y: auto;
    height: 100%;
  }
`;

export const Body = styled.div`
  ${props => bodyStyles(props.shouldScroll)}
`;

export const Footer = styled.footer`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  transition: box-shadow 200ms;
  z-index: 1;
  padding: ${modalPadding - keylineHeight}px ${modalPadding}px ${modalPadding}px
    ${modalPadding}px;
  box-shadow: ${props =>
    props.showKeyline
      ? `0 -${keylineHeight}px 0 0 ${keylineColor(props)}`
      : 'none'};

`;

export const Actions = styled.div`
  display: inline-flex;
  margin: 0 -${divide(gridSize, 2)}px;
`;

export const ActionItem = styled.div`
  flex: 1 0 auto;
  margin: 0 ${divide(gridSize, 2)}px;
`;
