import styled, { css, keyframes } from 'styled-components';
import { themed } from '../../theme';
import { colors } from '../../theme';
import { SIZES_MAP } from './constants';

const getStrokeWidth = (size) => Math.round(size / 10);

const getStrokeCircumference = (size) => {
  const strokeWidth = getStrokeWidth(size);
  const strokeRadius = size / 2 - strokeWidth / 2;
  return Math.PI * strokeRadius * 2;
};

const keyframeNames = {
  noop: keyframes`
    from { opacity: 0; }
    to { opacity: 0; }
  `,
  rotate: keyframes`
    to { transform: rotate(360deg); }
  `,
  enterOpacity: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  smallEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small) *
      0.8}px; }
  `,
  mediumEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium) *
      0.8}px; }
  `,
  largeEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large) *
      0.8}px; }
  `,
  xlargeEnterStroke: keyframes`
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge) *
      0.8}px; }
  `,
};

const getEnterStrokeKeyframe = (size) => {
  const standardSizeName = Object.keys(SIZES_MAP).find(
    sizeName => size === SIZES_MAP[sizeName],
  );
  if (standardSizeName) {
    return keyframeNames[`${standardSizeName}EnterStroke`];
  }

  const circumference = getStrokeCircumference(size);
  return keyframes`
    from { stroke-dashoffset: ${circumference}px; }
    to { stroke-dashoffset: ${circumference * 0.8}px; }
  `;
};

const spinnerColor = themed({ light: colors.N500, dark: colors.N0 });
const spinnerColorInverted = themed({ light: colors.N0, dark: colors.N0 });

export const getStrokeColor = ({
  invertColor,
  ...props
}) =>
  invertColor ? spinnerColorInverted(props) : spinnerColor(props);

export const svgStyles = css`
  ${(props) => {
    const circumference = getStrokeCircumference(props.size);

    const animation = (animProps) => {
      const baseAnimation = '0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite';
      if (animProps.phase === 'ENTER') {
        return css`
          animation: ${baseAnimation} ${keyframeNames.rotate},
            0.8s ease-in-out ${getEnterStrokeKeyframe(animProps.size)},
            0.2s ease-in-out ${keyframeNames.enterOpacity};
        `;
      }
      return css`
        animation: ${baseAnimation} ${keyframeNames.rotate};
      `;
    };

    return css`
      ${animation}
      fill: none;
      stroke: ${getStrokeColor};
      stroke-dasharray: ${circumference}px;
      stroke-dashoffset: ${circumference * 0.8}px;
      stroke-linecap: round;
      stroke-width: ${getStrokeWidth(props.size)}px;
      transform-origin: center;
    `;
  }};
`;

const Svg = styled.svg`
  ${svgStyles};
`;
Svg.displayName = 'SpinnerSvg';
export default Svg;
