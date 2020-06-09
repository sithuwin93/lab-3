import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getDisplayName from '../../util/getDisplayName';
import safeContextCall from '../../util/safeContextCall';
import { clickManagerContext } from '../../util/contextNamespace';

const withItemClick = (WrappedItem) =>
  class WithItemClick extends Component {
    static displayName = `WithItemClick(${getDisplayName(WrappedItem)})`;

    static defaultProps = {
      onClick: () => {},
    };

    static contextTypes = {
      [clickManagerContext]: PropTypes.object,
    };

    callContextFn = safeContextCall(this, clickManagerContext);

    shouldCloseAfterClick = () => !this.props.isDisabled && !this.props.href;

    handleClick = (event) => {
      this.props.onClick(event);
      if (this.shouldCloseAfterClick()) {
        this.callContextFn('itemClicked');
      }
    };

    handleKeyDown = (event) => {
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      } else if (event.key === 'Space' || event.key === 'Enter') {
        this.handleClick(event);
      }
    };

    render() {
      const { children, ...otherProps } = this.props;

      return (
        <WrappedItem
          {...otherProps}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
        >
          {children}
        </WrappedItem>
      );
    }
  };

export default withItemClick;
