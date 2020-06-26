import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EditorUtils from 'draft-js-plugins-utils';
import CapForm from './CapForm';

export default class AltButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    // store: PropTypes.object.isRequired,
    ownTheme: PropTypes.object.isRequired,
    // onRemoveLinkAtSelection: PropTypes.func.isRequired,
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  onAddLinkClick = e => {
    e.preventDefault();
    e.stopPropagation();
    const { ownTheme, placeholder, onOverrideContent } = this.props;
    const content = props => (
      <CapForm {...props} placeholder={placeholder} theme={ownTheme} />
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
          style={{width:50}}
        ><strong>Cap</strong>
        </button>
      </div>
    );
  }
}
