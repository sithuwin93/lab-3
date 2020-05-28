/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import Spinner from 'src/components/spinner';

const appearances = ['primary', 'danger'];


export default class LoadingSpinner extends React.Component{
  invertSpinner = () => {
    const { appearance, isSelected, isDisabled } = this.props;
    if (isSelected) {
      return true;
    }
    if (isDisabled) {
      return false;
    }
    if (appearance !== undefined) {
      if (appearances.indexOf(appearance) !== -1) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { spacing, styles } = this.props;
    let spinnerSize = spacing !== 'default' ? 'small' : 'medium';

    return (
      <div css={styles}>
        <Spinner size={spinnerSize} invertColor={this.invertSpinner()} />
      </div>
    );
  }
}
