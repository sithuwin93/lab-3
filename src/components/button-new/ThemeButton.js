/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Button } from './components/Button';
import { colors } from 'src/components/theme'
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
  borderRadius: '18px',
  fontWeight: 'bold',
  height: '40px'
};

const customTheme = {
  default: {
    background: {
      default: '#f5f6f7',
      hover: 'linear-gradient(145deg, #ffffff, #ddddde)',
      active: 'linear-gradient(145deg, #ddddde, #ffffff)',
    },
    boxShadow: {
      default: `7px 7px 15px rgba(55, 84, 170, .15), -7px -7px 20px rgba(255, 255, 255, 1), inset 0px 0px 4px rgba(255, 255, 255, .2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0) !important`,
      hover: `7px 7px 15px rgba(55, 84, 170, .15), -7px -7px 20px rgba(255, 255, 255, 1), inset 0px 0px 4px rgba(255, 255, 255, .2), inset 7px 7px 15px rgba(55, 84, 170, 0), inset -7px -7px 20px rgba(255, 255, 255, 0), 0px 0px 4px rgba(255, 255, 255, 0) !important;`,
      active: '0px 0px 0 0',
    },
    transform: {
      default: 'initial',
      active: 'translateY(2px) translateX(1px)',
    },
    transition: {
      default:
        'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
      active:
        'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s',
    },
  },
  primary: {
    background: {
      default: 'linear-gradient(145deg, #1a61ff, #1652d9)',
      hover: 'linear-gradient(145deg, #1652d9, #1a61ff)',
      active: 'linear-gradient(145deg, #1652d9, #1a61ff)',
    },
    boxShadow: {
      default: `5px 5px 10px #b5b6b7, -5px -5px 10px #ffffff`,
      hover: `5px 5px 10px #b5b6b7, -5px -5px 10px #ffffff`,
      active: '0px 0px 0 0',
    },
    transform: {
      default: 'initial',
      active: 'translateY(2px) translateX(1px)',
    },
    transition: {
      default:
        'background 0.1s ease-out, box-shadow 0.1s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0.1s',
      active:
        'background 0s ease-out, box-shadow 0s cubic-bezier(0.47, 0.03, 0.49, 1.38) transform:0s',
    },
  },
};
//#185BF1

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