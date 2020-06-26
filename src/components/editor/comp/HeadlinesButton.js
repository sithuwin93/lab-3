import React, { Component } from 'react'
import HeadlinesPicker from './HeadlinesPicker'
import inlineButtonStyles from '../styles/inlineButtonStyles.module.css'
import inlineButtonDarkStyles from '../styles/inlineButtonDarkStyles.module.css'

export default class HeadlinesButton extends Component {
    // When using a click event inside overridden content, mouse down
    // events needs to be prevented so the focus stays in the editor
    // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
    onMouseDown = (event) => event.preventDefault()
  
    onClick = () =>
      // A button can call `onOverrideContent` to replace the content
      // of the toolbar. This can be useful for displaying sub
      // menus or requesting additional information from the user.
      this.props.onOverrideContent(HeadlinesPicker);
  
    render() {
      const { theme } = this.props;
      const buttonWrapperClass = theme === 'light' ? inlineButtonStyles.buttonWrapper : inlineButtonDarkStyles.buttonWrapper
      const buttonClass = theme === 'light' ? inlineButtonStyles.button : inlineButtonDarkStyles.button;
      return (
        <div onMouseDown={this.onMouseDown} className={buttonWrapperClass}>
          <button onClick={this.onClick} className={buttonClass}>
            H
          </button>
        </div>
      );
    }
  }