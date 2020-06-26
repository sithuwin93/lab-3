/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

class BlockTypeSelect extends React.Component {
  state = {
    showPopup: false,
    style: {
      transform: 'translate(-50%) scale(0)',
    },
    overrideContent: undefined,
  };

  onOverrideContent = overrideContent => {
    this.setState({ overrideContent });
  }
  onMouseEnter = (clickEvent) => {
    const { showPopup } = this.state;
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    if(showPopup){
      this.setState({
        showPopup: !this.state.showPopup,
        style: {
          transform: 'translate(-50%) scale(0)',
        },
      });
    } else {
      this.setState({
        showPopup: !this.state.showPopup,
        style: {
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.30s cubic-bezier(.3,1.2,.2,1)',
        },
      });
    }

  };

  onMouseLeave = () => {
    this.setState({
      showPopup: false,
      style: {
        transform: 'translate(-50%) scale(0)',
      },
      overrideContent: undefined
    });
  };

  onMouseDown = clickEvent => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
  };

  render() {
    const { overrideContent: OverrideContent, showPopup } = this.state;
    const { theme, getEditorState, setEditorState, children } = this.props;
    return (
      <div
        onMouseLeave={this.onMouseLeave}
        className={theme.blockTypeSelectStyles.rotateBlock}>
        <div 
          onMouseDown={this.onMouseEnter}
          className={theme.blockTypeSelectStyles.blockType}>
          <svg
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            {showPopup?
            <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z"/>:
            <path d="M13 11V3.993A.997.997 0 0 0 12 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 0 0 3 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0 0 21 12c0-.556-.445-1-.993-1H13z"/>}
          </svg>
        </div>
        
        <div className={theme.blockTypeSelectStyles.spacer} />
        <div
          className={theme.blockTypeSelectStyles.popup}
          style={this.state.style}>
          {OverrideContent ? 
            <OverrideContent />
            :
            children({
              getEditorState,
              setEditorState,
              theme: theme.buttonStyles,
              onOverrideContent: this.onOverrideContent,
            })
          }          
        </div>
      </div>
    );
  }
}

BlockTypeSelect.propTypes = {
  children: PropTypes.func,
};

export default BlockTypeSelect;
