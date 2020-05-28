const DEFAULT_THEME_MODE = 'light';

export default function getTheme(props) {
  if (props && props.theme) {
    if ('__PARABAIK_THEME__' in props.theme) {
      return props.theme.__PARABAIK_THEME__;
    }
    else if ('mode' in props.theme) {
      return props.theme;
    }
  }
  return { mode: DEFAULT_THEME_MODE };
}
