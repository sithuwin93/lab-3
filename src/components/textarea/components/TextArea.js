import React from 'react';
import GlobalTheme from '../../theme';
import { Theme } from '../theme';
import { TextAreaWrapper } from '../styled';
import TextareaElement from './TextAreaElement';


class TextAreaWithoutForwardRef extends React.Component {
  static defaultProps = {
    resize: 'smart',
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isInvalid: false,
    isMonospaced: false,
    minimumRows: 1,
    maxHeight: '50vh',
    forwardedRef: () => {},
  };

  state = {
    isFocused: false,
  };

  handleOnBlur = event => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    if (onBlur) {
      onBlur(event);
    }
  };

  handleOnFocus = event => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus(event);
    }
  };

  render() {
    const {
      createAnalyticsEvent,
      appearance,
      resize,
      isCompact,
      isDisabled,
      isInvalid,
      isReadOnly,
      isMonospaced,
      isRequired,
      minimumRows,
      maxHeight,
      theme,
      forwardedRef,
      testId,
      ...rest
    } = this.props;

    const { isFocused } = this.state;

    return (
      <GlobalTheme.Consumer>
        {({ mode }) => (
          <Theme.Provider value={theme}>
            <Theme.Consumer appearance={appearance} mode={mode}>
              {(tokens) => (
                <TextAreaWrapper
                  resize={resize}
                  maxHeight={maxHeight}
                  appearance={appearance}
                  isCompact={isCompact}
                  isDisabled={isDisabled}
                  isReadOnly={isReadOnly}
                  isMonospaced={isMonospaced}
                  isFocused={isFocused}
                  isInvalid={isInvalid}
                  minimumRows={minimumRows}
                  {...tokens}
                >
                  <TextareaElement
                    forwardedRef={forwardedRef}
                    resize={resize}
                    disabled={isDisabled}
                    readOnly={isReadOnly}
                    required={isRequired}
                    {...rest}
                    onFocus={this.handleOnFocus}
                    onBlur={this.handleOnBlur}
                    data-testid={testId}
                  />
                </TextAreaWrapper>
              )}
            </Theme.Consumer>
          </Theme.Provider>
        )}
      </GlobalTheme.Consumer>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <TextAreaWithoutForwardRef forwardedRef={ref} {...props} />
));