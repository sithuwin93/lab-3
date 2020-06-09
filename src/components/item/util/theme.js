import {
  gridSize as akGridSize,
  borderRadius,
} from 'src/components/theme/constants';
import * as colors from 'src/components/theme/colors';
export const themeNamespace = '@parabaik-shared-theme/item';
export const compactSmallFontSize = 10;
export const compactLineHeight = 1.2;
export const gridSize = akGridSize();

export const defaultTheme = {
  afterItemSpacing: {
    compact: akGridSize(),
    default: akGridSize(),
  },
  beforeItemSpacing: {
    compact: akGridSize(),
    default: akGridSize(),
  },
  borderRadius: borderRadius(),
  focus: {
    outline: colors.B100,
  },
  height: {
    compact: 0,
    default: 0,
  },
  width: {
    compact: 'auto',
    default: 'auto',
  },
  padding: {
    default: {
      bottom: akGridSize() / 2,
      left: akGridSize() / 2,
      right: akGridSize() / 2,
      top: akGridSize() / 2,
    },
    compact: {
      bottom: akGridSize(),
      left: akGridSize(),
      right: akGridSize(),
      top: akGridSize(),
    },
  },
  default: {
    background: colors.background,
    text: colors.text,
    secondaryText: colors.N200,
  },
  selected: {
    background: colors.backgroundActive,
    text: colors.N500,
    secondaryText: colors.N200,
  },
  active: {
    background: colors.backgroundActive,
    text: colors.textActive,
    secondaryText: colors.N200,
  },
  hover: {
    background: colors.backgroundHover,
    text: colors.textHover,
    secondaryText: colors.N200,
  },
  disabled: {
    background: colors.N0,
    text: colors.N200,
    secondaryText: colors.N200,
  },
  // same as hover in this case
  dragging: {
    background: colors.N20,
    text: colors.N800,
    secondaryText: colors.N200,
  },
};

const isValidCssValue = value =>
  value !== undefined && value !== null && value !== '';

export const themeWithKeys = (
  maybeTheme,
  key,
  parentKey,
) => {
  if (parentKey) {
    return maybeTheme &&
      maybeTheme[parentKey] &&
      isValidCssValue(maybeTheme[parentKey][key])
      ? maybeTheme
      : defaultTheme;
  }
  return maybeTheme && isValidCssValue(maybeTheme[key])
    ? maybeTheme
    : defaultTheme;
};

export const getThemeStyle = (
  maybeTheme,
  key,
  parentKey,
) => {
  const theme = themeWithKeys(maybeTheme, key, parentKey);
  return parentKey ? theme[parentKey][key] : theme[key];
};
