import GlobalTheme from '../../theme';
import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Input from './Input';
import { Theme } from '../theme';

class Textfield extends React.Component{
  static defaultProps = {
    appearance: 'standard',
    isCompact: false,
    isMonospaced: false,
    isInvalid: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
  };

  state = {
    isFocused: false,
    isHovered: false,
  };

  input = null;

  handleOnFocus = (event) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleOnBlur = (event) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleOnMouseDown = (event) => {
    const target = event.target;
    if (target.tagName !== 'INPUT') {
      event.preventDefault();
    }
    if (
      this.input &&
      !this.props.isDisabled &&
      document.activeElement !== this.input
    ) {
      // this.input.props.focus();//onFocus();//.
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  onMouseEnter = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: true });
    }
  };

  onMouseLeave = () => {
    if (!this.props.isDisabled) {
      this.setState({ isHovered: false });
    }
  };

  // we want to keep a copy of the ref as well as pass it along
  setInputRef = (input) => {
    this.input = input;
    const forwardedRef = this.props.forwardedRef;
    if (!forwardedRef) {
      return;
    }
    if (typeof forwardedRef === 'object') {
      forwardedRef.current = input;
    }
    if (typeof forwardedRef === 'function') {
      forwardedRef(input);
    }
  };

  render() {
    const { isFocused, isHovered } = this.state;
    const {
      createAnalyticsEvent,
      forwardedRef,
      appearance,
      isCompact,
      isDisabled,
      isInvalid,
      isRequired,
      isReadOnly,
      isMonospaced,
      theme,
      width,
      elemAfterInput,
      elemBeforeInput,
      ...otherProps
    } = this.props;

    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer
              appearance={appearance}
              mode={mode}
              width={width}
              isDisabled={isDisabled}
              isCompact={isCompact}
              isMonospaced={isMonospaced}
              isFocused={isFocused}
              isHovered={isHovered}
              isInvalid={isInvalid}
            >
              {tokens => (
                <Input
                  /* spreading before applying other props to prevent overwriting */
                  {...otherProps}
                  isDisabled={isDisabled}
                  isReadOnly={isReadOnly}
                  isRequired={isRequired}
                  theme={tokens}
                  onBlur={this.handleOnBlur}
                  onFocus={this.handleOnFocus}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onMouseDown={this.handleOnMouseDown}
                  elemAfterInput={elemAfterInput}
                  elemBeforeInput={elemBeforeInput}
                  innerRef={this.setInputRef}
                />
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}


function ChildInput(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);

  return <Textfield {...props} forwardedRef={inputRef} />;
}

export default forwardRef(ChildInput);

