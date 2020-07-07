import * as colors from './colors';
import themed from './utils/themed';

// Cards on a board
export const e100 = themed({
  light: `box-shadow: 0 1px 1px ${colors.N50A}, 0 0 1px 0 ${colors.N60A};`,
  dark: `box-shadow: 0 1px 1px ${colors.DN50A}, 0 0 1px ${colors.DN60A};`,
});

// Inline dialogs
// export const e200 = themed({
  // light: `box-shadow: 0 4px 8px -2px ${colors.N50A}, 0 0 1px ${colors.N60A};`,
  // dark: `box-shadow: 0 4px 8px -2px ${colors.DN50A}, 0 0 1px ${colors.DN60A};`,
// });

export const e200 = `
  // background: #f0f5ff;
  // box-shadow: 12px 12px 16px 0  #ccd0d9,-8px -8px 12px 0 #ffffff;
  // background: #f4f4f4;
  // box-shadow:  3px 3px 6px #bebebe, 
  //              -3px -3px 6px #ffffff;

  background: #f5f6f7;
  box-shadow:-4px -2px 4px 0px #ffffff,4px 2px 6px 0px #DFE4EA;
  // box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1), -3px -3px 3px 3px rgba(247, 251, 255, 1), 3px 3px 8px 2px rgba(0, 0, 0, 0) inset, -3px -3px 7px 2px rgba(247, 251, 255, 0) inset;
`

// Modals
export const e300 = themed({
  light: `box-shadow: 0 8px 16px -4px ${colors.N50A}, 0 0 1px ${colors.N60A};`,
  dark: `box-shadow: 0 8px 16px -4px ${colors.DN50A}, 0 0 1px ${colors.DN60A};`,
});

// Panels
export const e400 = themed({
  light: `box-shadow: 0 12px 24px -6px ${colors.N50A}, 0 0 1px ${colors.N60A};`,
  dark: `box-shadow: 0 12px 24px -6px ${colors.DN50A}, 0 0 1px ${colors.DN60A};`,
});

// Flag messages (notifications)
export const e500 = themed({
  light: `box-shadow: 0 20px 32px -8px ${colors.N50A}, 0 0 1px ${colors.N60A};`,
  dark: `box-shadow: 0 20px 32px -8px ${colors.DN50A}, 0 0 1px ${colors.DN60A};`,
});