import React from 'react';
import { PositionerAbsolute, PositionerRelative } from '../styled/Modal';

const Positioner = function Positioner({
  scrollBehavior,
  ...props
}) {
  const PositionComponent =
    scrollBehavior === 'inside' ? PositionerAbsolute : PositionerRelative;

  return <PositionComponent {...props} />;
};

export default Positioner;
