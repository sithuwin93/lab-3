import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AltForm from './AltForm';

export default class AltButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    ownTheme: PropTypes.object.isRequired,
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  onAddLinkClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const { ownTheme, placeholder, onOverrideContent } = this.props;
    const content = props => (
      <AltForm {...props} placeholder={placeholder} theme={ownTheme} />
    );
    onOverrideContent(content);
  };

  render() {
    const { theme } = this.props;
    const className = theme.button;
    return (
      <div className={theme.buttonWrapper} onMouseDown={this.onMouseDown}>
        <button
          className={className}
          onClick={this.onAddLinkClick}
          type="button"
          style={{width:50}}>
          <strong>Alt</strong>
        </button>
      </div>
    );
  }
}
