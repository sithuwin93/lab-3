import React from 'react';

export default class TextAreaElement extends React.Component{
  textareaElement = null;

  state = {
    height: '100%',
  };

  componentDidMount() {
    if (this.props.resize === 'smart' && this.textareaElement) {
      this.setState({
        height: `${this.textareaElement.scrollHeight}px`,
      });
    }
  }

  getTextAreaRef = (ref) => {
    this.textareaElement = ref;
    const { forwardedRef } = this.props;
    if (forwardedRef && typeof forwardedRef === 'object') {
      // @ts-ignore
      forwardedRef.current = ref;
    }
    if (forwardedRef && typeof forwardedRef === 'function') {
      forwardedRef(ref);
    }
  };

  handleOnChange = event => {
    const { onChange } = this.props;
    if (this.props.resize === 'smart') {
      this.setState(
        {
          height: 'auto',
        },
        () => {
          if (this.props.resize === 'smart' && this.textareaElement) {
            this.setState({
              height: `${this.textareaElement.scrollHeight}px`,
            });
          }
        },
      );
    }

    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { resize, forwardedRef, ...rest } = this.props;
    const { height } = this.state;

    if (resize === 'smart') {
      return (
        <textarea
          ref={this.getTextAreaRef}
          style={{ height }}
          {...rest}
          onChange={this.handleOnChange}
        />
      );
    }
    return (
      <textarea
        ref={this.getTextAreaRef}
        style={{ height: '100%' }}
        {...rest}
      />
    );
  }
}
