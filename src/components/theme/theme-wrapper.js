import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import ParabaikThemeProvider from './components/ParabaikThemeProvider';

export const ThemeWrapper = memo(({children}) => {
  const { theme } = useSelector(state => state.theme);
  return (
    <ParabaikThemeProvider mode={theme}>
      {children}
    </ParabaikThemeProvider>
  )
});