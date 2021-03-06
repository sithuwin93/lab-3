import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;
const easing = 'cubic-bezier(0.23, 1, 0.32, 1)';
const verticalOffset = 16;

export const Animation = ({
  in: hasEntered,
  stackIndex = 0,
  onExited,
  onEntered,
  children,
}) => (
  <Transition
    in={hasEntered}
    timeout={{ enter: 0, exit: duration }}
    onExited={onExited}
    onEntered={onEntered}
    appear
  >
    {(unadjustedStatus) => {
      const adjustedStatus =
        hasEntered && unadjustedStatus === 'exited'
          ? 'entering'
          : unadjustedStatus;
      // Fade styles
      const fadeBaseStyles = {
        transition: `opacity ${duration / 2}ms`,
        opacity: 1,
      };
      const fadeTransitionStyles = {
        entering: {
          opacity: 0,
        },
        entered: {},
        exiting: {
          opacity: 0,
        },
        exited: {},
      };
      // Slide styles
      const slideBaseStyles = {
        transition: `transform ${duration}ms ${easing}`,
        transform: `translate3d(0, ${verticalOffset * 2}px, 0)`,
      };
      const slideTransitionStyles = {
        entering: {},
        entered: {
          transform:
            stackIndex > 0
              ? `translate3d(0, ${stackIndex * (verticalOffset / 2)}px, 0)`
              : null,
        },
        exiting: {
          transform: `translate3d(0, -${verticalOffset * 2}px, 0)`,
        },
        exited: {},
      };
      return children({
        fade: { ...fadeBaseStyles, ...fadeTransitionStyles[adjustedStatus] },
        slide: { ...slideBaseStyles, ...slideTransitionStyles[adjustedStatus] },
      });
    }}
  </Transition>
);
