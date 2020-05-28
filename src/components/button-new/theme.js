import { createTheme } from 'src/components/theme';
import { colors } from 'src/components/theme';
import { hex2rgba } from './components/utils';
// import { getButtonStyles, getSpinnerStyles } from './components/getStyles';
import { borderRadius, fontSize, gridSize } from 'src/components/theme';

const compactButtonHeight = `${(gridSize() * 3) / fontSize()}em`;
const buttonHeight = `${(gridSize() * 4) / fontSize()}em`;

/** Background */
const getBackground = (props) =>
  applyPropertyStyle('background', props, baseTheme);

/** Box Shadow */
const getBoxShadow = (props) => {
  const boxShadowColor = applyPropertyStyle('boxShadowColor', props, baseTheme);
  return `0 0 0 2px ${boxShadowColor}`;
};

/** Color */
const getColor = (props) =>
  applyPropertyStyle('color', props, baseTheme);

/** Cursor */
const getCursor = ({ state = 'default' }) =>
  state === 'hover' || state === 'active' || state === 'selected'
    ? 'pointer'
    : state === 'disabled'
    ? 'not-allowed'
    : 'default';

/** Height */
const getHeight = ({ spacing = 'default' }) =>
  spacing === 'compact'
    ? compactButtonHeight
    : spacing === 'none'
    ? 'auto'
    : buttonHeight;

/** Line Height */
const getLineHeight = ({ spacing = 'default' }) =>
  spacing === 'compact'
    ? compactButtonHeight
    : spacing === 'none'
    ? 'inherit'
    : buttonHeight;

/** Padding */
const getPadding = ({ spacing = 'default' }) =>
  spacing === 'none' ? 0 : `0 ${gridSize()}px`;

/** Text Decoration */
const getTextDecoration = ({
  appearance = 'default',
  state = 'default',
}) =>
  state === 'hover' && (appearance === 'link' || appearance === 'subtle-link')
    ? 'underline'
    : 'inherit';

/** Transition */
const getTransition = ({ state = 'default' }) =>
  state === 'hover'
    ? 'background 0s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)'
    : 'background 0.1s ease-out, box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38)';

/** Transition Duration */
const getTransitionDuration = ({ state = 'default' }) =>
  state === 'active' ? '0s' : state === 'focus' ? '0s, 0.2s' : '0.1s, 0.15s';

/** Vertical Align */
const getVerticalAlign = ({ spacing = 'default' }) =>
  spacing === 'none' ? 'baseline' : 'middle';

/** Width */
const getWidth = ({ shouldFitContainer }) =>
  shouldFitContainer ? '100%' : 'auto';

/** Base styles */
const staticStyles = {
  alignItems: 'baseline',
  borderWidth: 0,
  boxSizing: 'border-box',
  display: 'inline-flex',
  fontSize: 'inherit',
  fontStyle: 'normal',
  fontWeight: 'normal',
  maxWidth: '100%',
  outline: 'none !important',
  textAlign: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

/**
 * BUTTON STYLES
 */
export const getButtonStyles = (props) => ({
  ...staticStyles,
  background: getBackground(props),
  borderRadius: `${borderRadius()}px`,
  boxShadow: getBoxShadow(props),
  color: `${getColor(props)} !important`,
  cursor: getCursor(props),
  height: getHeight(props),
  lineHeight: getLineHeight(props),
  padding: getPadding(props),
  transition: getTransition(props),
  transitionDuration: getTransitionDuration(props),
  verticalAlign: getVerticalAlign(props),
  width: getWidth(props),

  '&::-moz-focus-inner': {
    border: 0,
    margin: 0,
    padding: 0,
  },

  '&:hover': {
    textDecoration: getTextDecoration(props),
  },
  ...(props.isLoading && { pointerEvents: 'none' }),
});


export const getSpinnerStyles = () => ({
  display: 'flex',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
});


export const fallbacks = {
  background: { light: colors.N20A, dark: colors.DN70 },
  color: { light: colors.N400, dark: colors.DN400 },
  textDecoration: { light: 'none', dark: 'none' },
};

export const baseTheme = {
  // Default appearance
  background: {
    default: {
      default: { light: colors.N20A, dark: colors.DN70 },
      hover: { light: colors.N30A, dark: colors.DN60 },
      active: { light: hex2rgba(colors.B75, 0.6), dark: colors.B75 },
      disabled: { light: colors.N20A, dark: colors.DN70 },
      selected: { light: colors.N700, dark: colors.DN0 },
      focusSelected: { light: colors.N700, dark: colors.DN0 },
    },
    primary: {
      default: { light: colors.B400, dark: colors.B100 },
      hover: { light: colors.B300, dark: colors.B75 },
      active: { light: colors.B500, dark: colors.B200 },
      disabled: { light: colors.N20A, dark: colors.DN70 },
      selected: { light: colors.N700, dark: colors.DN0 },
      focusSelected: { light: colors.N700, dark: colors.DN0 },
    },
    warning: {
      default: { light: colors.Y300, dark: colors.Y300 },
      hover: { light: colors.Y200, dark: colors.Y200 },
      active: { light: colors.Y400, dark: colors.Y400 },
      disabled: { light: colors.N20A, dark: colors.DN70 },
      selected: { light: colors.Y400, dark: colors.Y400 },
      focusSelected: { light: colors.Y400, dark: colors.Y400 },
    },
    danger: {
      default: { light: colors.R400, dark: colors.R400 },
      hover: { light: colors.R300, dark: colors.R300 },
      active: { light: colors.R500, dark: colors.R500 },
      disabled: { light: colors.N20A, dark: colors.DN70 },
      selected: { light: colors.R500, dark: colors.R500 },
      focusSelected: { light: colors.R500, dark: colors.R500 },
    },
    link: {
      default: { light: 'none', dark: 'none' },
      selected: { light: colors.N700, dark: colors.N20 },
      focusSelected: { light: colors.N700, dark: colors.N20 },
    },
    subtle: {
      default: { light: 'none', dark: 'none' },
      hover: { light: colors.N30A, dark: colors.DN60 },
      active: { light: hex2rgba(colors.B75, 0.6), dark: colors.B75 },
      disabled: { light: 'none', dark: 'none' },
      selected: { light: colors.N700, dark: colors.DN0 },
      focusSelected: { light: colors.N700, dark: colors.DN0 },
    },
    'subtle-link': {
      default: { light: 'none', dark: 'none' },
      selected: { light: colors.N700, dark: colors.N20 },
      focusSelected: { light: colors.N700, dark: colors.N20 },
    },
  },

  boxShadowColor: {
    default: {
      focus: { light: hex2rgba(colors.B200, 0.6), dark: colors.B75 },
      focusSelected: {
        light: hex2rgba(colors.B200, 0.6),
        dark: colors.B75,
      },
    },
    primary: {
      focus: { light: hex2rgba(colors.B200, 0.6), dark: colors.B75 },
      focusSelected: {
        light: hex2rgba(colors.B200, 0.6),
        dark: colors.B75,
      },
    },
    warning: {
      focus: { light: colors.Y500, dark: colors.Y500 },
      focusSelected: { light: colors.Y500, dark: colors.Y500 },
    },
    danger: {
      focus: { light: colors.R100, dark: colors.R100 },
      focusSelected: { light: colors.R100, dark: colors.R100 },
    },
    link: {
      focus: { light: hex2rgba(colors.B200, 0.6), dark: colors.B75 },
      focusSelected: {
        light: hex2rgba(colors.B200, 0.6),
        dark: colors.B75,
      },
    },
    subtle: {
      focus: { light: hex2rgba(colors.B200, 0.6), dark: colors.B75 },
      focusSelected: {
        light: hex2rgba(colors.B200, 0.6),
        dark: colors.B75,
      },
    },
    'subtle-link': {
      focus: { light: hex2rgba(colors.B200, 0.6), dark: colors.B75 },
      focusSelected: {
        light: hex2rgba(colors.B200, 0.6),
        dark: colors.B75,
      },
    },
  },

  color: {
    default: {
      default: { light: colors.N500, dark: colors.DN400 },
      active: { light: colors.B400, dark: colors.B400 },
      disabled: { light: colors.N70, dark: colors.DN30 },
      selected: { light: colors.N20, dark: colors.DN400 },
      focusSelected: { light: colors.N20, dark: colors.DN400 },
    },
    primary: {
      default: { light: colors.N0, dark: colors.DN30 },
      disabled: { light: colors.N70, dark: colors.DN30 },
      selected: { light: colors.N20, dark: colors.DN400 },
      focusSelected: { light: colors.N20, dark: colors.DN400 },
    },
    warning: {
      default: { light: colors.N800, dark: colors.N800 },
      disabled: { light: colors.N70, dark: colors.DN30 },
      selected: { light: colors.N800, dark: colors.N800 },
      focusSelected: { light: colors.N800, dark: colors.N800 },
    },
    danger: {
      default: { light: colors.N0, dark: colors.N0 },
      disabled: { light: colors.N70, dark: colors.DN30 },
      selected: { light: colors.N0, dark: colors.N0 },
      focusSelected: { light: colors.N0, dark: colors.N0 },
    },
    link: {
      default: { light: colors.B400, dark: colors.B100 },
      hover: { light: colors.B300, dark: colors.B75 },
      active: { light: colors.B500, dark: colors.B200 },
      disabled: { light: colors.N70, dark: colors.DN100 },
      selected: { light: colors.N20, dark: colors.N700 },
      focusSelected: { light: colors.N20, dark: colors.N700 },
    },
    subtle: {
      default: { light: colors.N500, dark: colors.DN400 },
      active: { light: colors.B400, dark: colors.B400 },
      disabled: { light: colors.N70, dark: colors.DN100 },
      selected: { light: colors.N20, dark: colors.DN400 },
      focusSelected: { light: colors.N20, dark: colors.DN400 },
    },
    'subtle-link': {
      default: { light: colors.N200, dark: colors.DN400 },
      hover: { light: colors.N90, dark: colors.B50 },
      active: { light: colors.N400, dark: colors.DN300 },
      disabled: { light: colors.N70, dark: colors.DN100 },
      selected: { light: colors.N20, dark: colors.DN400 },
      focusSelected: { light: colors.N20, dark: colors.DN400 },
    },
  },
};

export function applyPropertyStyle(
  property,
  {
    appearance = 'default',
    state = 'default',
    mode = 'light',
  },
  theme,
) {
  const propertyStyles = theme[property];
  if (!propertyStyles) {
    return 'initial';
  }

  // Check for relevant fallbacks
  if (!propertyStyles[appearance]) {
    if (!propertyStyles['default']) {
      return fallbacks[property][mode] ? fallbacks[property][mode] : 'initial';
    }
    appearance = 'default';
  }

  // If there is no 'state' key (ie, 'hover') defined for a given appearance,
  // return the 'default' state of that appearance.
  if (!propertyStyles[appearance][state]) {
    state = 'default';
  }

  const appearanceStyles = propertyStyles[appearance];
  const stateStyles = appearanceStyles[state];

  if (!stateStyles) {
    return 'inherit';
  }
  return stateStyles[mode] || appearanceStyles.default[mode];
}

export const Theme = createTheme(themeProps => ({
  buttonStyles: getButtonStyles(themeProps),
  spinnerStyles: getSpinnerStyles(),
}));
