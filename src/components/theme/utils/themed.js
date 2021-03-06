import getTheme from './getTheme';
import { __values } from 'tslib';

// Unpack custom variants, and get correct value for the current theme
function themedVariants(variantProp, variants) {
  return (props) => {
    const theme = getTheme(props);
    if (props && props[variantProp] && variants) {
      const modes = variants[props[variantProp]];
      if (modes && modes[theme.mode]) {
        const value = modes[theme.mode];
        if (value) return value; // TS believes value can be undefined
      }
    }
    return '';
  };
}

export default function themed(
  modesOrVariant,
  variantModes,
) {
  if (typeof modesOrVariant === 'string') {
    return themedVariants(modesOrVariant, variantModes);
  }
  const modes = modesOrVariant;
  return (props) => {
    // Get theme from the user's props
    const theme = getTheme(props);
    // User isn't required to provide both light and dark values
    if (theme.mode in modes) {
      const value = modes[theme.mode]; // TS believes value can be undefined
      if (value) return value;
    }
    return '';
  };
}
