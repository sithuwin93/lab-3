import React from 'react';
import invariant from 'tiny-invariant';
import ReactFocusLock from 'react-focus-lock';

export default class FocusLock extends React.Component {
  static defaultProps = {
    autoFocus: true,
    isEnabled: true,
    shouldReturnFocus: true,
  };

  componentDidMount() {
    const { isEnabled, autoFocus } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      invariant(
        typeof autoFocus === 'boolean',
        '@atlaskit/modal-dialog: Passing a function as autoFocus is deprecated. Instead call focus on the element ref or use the autofocus property.',
      );
    }
    if (typeof autoFocus === 'function' && isEnabled) {
      const elem = autoFocus();
      if (elem && elem.focus) {
        elem.focus();
      }
    }
  }

  render() {
    const { isEnabled, autoFocus, shouldReturnFocus } = this.props;
    return (
      <ReactFocusLock
        disabled={!isEnabled}
        autoFocus={!!autoFocus}
        returnFocus={shouldReturnFocus}>
        {this.props.children}
      </ReactFocusLock>
    );
  }
}
