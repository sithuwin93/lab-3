/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import { gridSize } from 'src/components/theme';

export const groupItemStyles = {
  flex: '1 0 auto',
  display: 'flex',

  '& + &::before': {
    content: `''`,
    display: 'inline-block',
    width: `${gridSize() / 2}px`,
  },
};

export default class ButtonGroup extends React.Component {
  render() {
    const { appearance, children } = this.props;

    return (
      <div css={{ display: 'inline-flex' }}>
        {React.Children.map(children, (child, idx) => {
          if (!child) {
            return null;
          }
          return (
            <div key={idx} css={groupItemStyles}>
              {appearance
                ? React.cloneElement(child, { appearance })
                : child}
            </div>
          );
        })}
      </div>
    );
  }
}
