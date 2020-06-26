import React from 'react';
import memoizeOne from 'memoize-one';
import {
  Popper as ReactPopper,
  PopperChildrenProps,
  PopperProps,
} from 'react-popper';
import { Placement } from './types';

export { Manager, Reference } from 'react-popper';
const FlipBehavior = {
  auto: [],
  top: ['top', 'bottom', 'top'],
  right: ['right', 'left', 'right'],
  bottom: ['bottom', 'top', 'bottom'],
  left: ['left', 'right', 'left'],
};

const getFlipBehavior = (side)=> FlipBehavior[side];

export class Popper extends React.Component {
  static defaultProps = {
    children: () => null,
    offset: '0, 8px',
    placement: 'bottom-start',
  };

  getModifiers = memoizeOne(
    placement => {
      const flipBehavior = getFlipBehavior(placement.split('-')[0]);
      const modifiers = {
        flip: {
          enabled: true,
          behavior: flipBehavior,
          boundariesElement: 'viewport',
        },
        hide: {
          enabled: true,
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false,
          boundariesElement: 'window',
        },
      };

      if (this.props.modifiers) {
        return { ...modifiers, ...this.props.modifiers };
      }

      return modifiers;
    },
  );

  render() {
    const { placement, children, referenceElement } = this.props;
    const modifiers = this.getModifiers(
      this.props.placement,
    );

    return (
      <ReactPopper
        positionFixed
        modifiers={modifiers}
        placement={placement}
        {...(referenceElement ? { referenceElement } : {})}
      >
        {children}
      </ReactPopper>
    );
  }
}
