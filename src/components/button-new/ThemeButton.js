/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from './components/Button';

export default (props) => (
  <Button
    {...props}
    theme={(currentTheme, themeProps) => {
      const { buttonStyles, ...rest } = currentTheme(themeProps);
      return {
        buttonStyles: {
          ...buttonStyles,
          ...baseStyles,
          ...extract(customTheme, themeProps),
        },
        ...rest,
      };
    }}
  />
);

const baseStyles = {
  border: 'none',
  padding: '0px 15px',
  // borderRadius: '15px',
  fontWeight: 'bold',
  height: '40px'
};

const customTheme = {};

function extract(newTheme: any, { mode, appearance, state }: ThemeProps) {
  if (!newTheme[appearance]) {
    return undefined;
  }
  const root = newTheme[appearance];
  return Object.keys(root).reduce((acc: { [index: string]: string }, val) => {
    let node = root;
    [val, state, mode].forEach(item => {
      if (!node[item]) {
        return undefined;
      }
      if (typeof node[item] !== 'object') {
        acc[val] = node[item];
        return undefined;
      }
      node = node[item];
      return undefined;
    });
    return acc;
  }, {});
}