import { EditorState } from 'draft-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EmbForm extends Component {
  static propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
    // theme: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: 'Enter youtube video url',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    this.input.focus();
  }

  onRef = node => {
    this.input = node;
  };

  onChange = ({ target: { value } }) => {
    this.setState({value})
  };

  onClose = () => this.props.onOverrideContent(undefined);

  onKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.onClose();
    }
  };

  submit() {
    // const { getEditorState, setEditorState, onOverrideContent } = this.props;
    // const editorState = getEditorState();
    // const contentState = editorState.getCurrentContent();
    // contentState.getBlockMap().map((block,key) => {
    //   let entityKey = block.getEntityAt(0);
    //   if (entityKey !== null){
    //     const entt = contentState.getEntity(entityKey)
    //     // const { alignment, alt,src } = entt.getData()
    //     contentState.mergeEntityData(entityKey, {
    //       alt: this.state.value,
    //     });
    //   }
    // });
    // const newEditorState = EditorState.createWithContent(contentState);
    // setEditorState(newEditorState);
    
    // this.input.blur();
    // this.onClose();
    onOverrideContent(null);
  }

  render() {
    const { theme, placeholder } = this.props;
    const { value } = this.state;
    // const className = theme.inputStyles.input;
    return (
      <input
        // className={className}
        // onBlur={this.onClose}
        // onChange={this.onChange}
        // onKeyDown={this.onKeyDown}
        // placeholder={placeholder}
        ref={this.onRef}
        // type="text"
        // value={value}
      />
    );
  }
}
