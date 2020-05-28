// @flow
import React from 'react';
import theme from 'shared/theme';
import BaseTitlebar from './base';
import { themed } from 'src/components/theme';

type Props = {
  title: string,
  leftAction?: 'menu' | 'view-back' | React$Element<any>,
  titleIcon?: any,
  rightAction?: any,
};

export const MobileTitlebar = (props: Props) => (
  <BaseTitlebar
    style={{ borderBottom: `1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })}` }}
    {...props}
  />
);

export const DesktopTitlebar = (props: Props) => (
  <BaseTitlebar
    desktop
    style={{
      borderBottom: `1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})}`,
      position: 'sticky',
      top: '0',
      zIndex: 9000,
      height: '62px',
      maxHeight: '62px',
    }}
    {...props}
  />
);
