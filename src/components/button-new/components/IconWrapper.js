/** @jsx jsx */
import { jsx } from '@emotion/core'
import { getLoadingStyle } from './utils';
import { gridSize } from 'src/components/theme';

export default ({ spacing, icon, isOnlyChild, isLoading, ...rest }) => {
  const css = {
    alignSelf: 'center',
    display: 'flex',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0,
    userSelect: 'none',
    margin:
      spacing === 'none'
        ? 0
        : isOnlyChild
        ? `0 -${gridSize() / 4}px`
        : `0 ${gridSize() / 2}px`,
    ...getLoadingStyle(isLoading),
  }
  return (
    <span
      css={css}
      {...rest}
    >
      {icon}
    </span>
  );
} 
