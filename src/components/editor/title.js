import React from 'react';
import { TitleWrapper, TitleArea } from './styled'
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';

export default class TitleInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      handleUpdate: (e) => {
        this.handleTitleResize(e);
        if (props.changeTitle) {
          props.changeTitle(e);
        }
      },
      placeholder: props.placeholder || 'Give this page a title',
      helpDialogOpen: false,
      titleProgress : 0
    };
  }

  toggleDialog = () => this.setState({ helpDialogOpen: !this.state.helpDialogOpen });

  render() {
    const { placeholder, handleUpdate } = this.state;
    const { value, progress, innerRef, onFocus, onBlur, onKeyDown } = this.props;
    return (
      <TitleWrapper>
        <TitleArea
          maxLength="100"
          rows="1"
          id="editor-title"
          placeholder={placeholder}
          value={this.props.title}
          onChange={handleUpdate}
          innerRef={innerRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={this.countChar}
        />
      </TitleWrapper>
    );
  }

  handleTitleResize = (e) => {
    const elem = e.target;
    elem.style.height = 'inherit';
    elem.style.height = `${elem.scrollHeight}px`;
  };
}
