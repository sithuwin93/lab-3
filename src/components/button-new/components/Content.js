/** @jsx jsx */
import { jsx } from '@emotion/core'
import { gridSize } from 'src/components/theme';
import { getLoadingStyle } from './utils';


export default ({
  children,
  followsIcon,
  spacing,
  isLoading,
  ...rest
}) => {
  const css = {
    alignItems: followsIcon ? 'baseline' : 'center',
    alignSelf: followsIcon ? 'baseline' : 'center',
    flex: '1 1 auto',
    margin: spacing === 'none' ? 0 : `0 ${gridSize() / 2}px`,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...getLoadingStyle(isLoading),
  }
  return (
    <span css={css} {...rest}>
      {children}
    </span>
  );
} 
