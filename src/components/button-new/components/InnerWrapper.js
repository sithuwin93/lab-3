/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';

export default ({ fit, children, ...rest }) => {
  const css = {
    alignSelf: 'center',
    display: 'inline-flex',
    flexWrap: 'nowrap',
    maxWidth: '100%',
    position: 'relative',
    ...(fit && { width: '100%' }),
    ...(fit && { justifyContent: 'center' }),
  }
  return (
    <span css={css} {...rest}>
      {children}
    </span>
  );
}
