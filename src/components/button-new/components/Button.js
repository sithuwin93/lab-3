/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import memoize from 'memoize-one';
import GlobalTheme from 'src/components/theme';
import { Theme } from '../theme';
import { mapAttributesToState, filterProps, composeRefs } from './utils';
import Content from './Content';
import InnerWrapper from './InnerWrapper';
import IconWrapper from './IconWrapper';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

const Wrapper = React.forwardRef((props,ref) => {
  switch (props.type) {
    case 'span':
      return <span {...props} ref={ref}/>
    case 'a':
      return <a {...props} ref={ref}/>
    case 'link':
      return <Link {...props} ref={ref}/>
  
    default:
      return <button {...props} ref={ref}/>
  }
})

export class Button extends React.Component {
  static defaultProps = {
    appearance: 'default',
    autoFocus: false,
    isDisabled: false,
    isLoading: false,
    isSelected: false,
    shouldFitContainer: false,
    spacing: 'default',
    type: 'button',
  };

  button = React.createRef();
  getComposedRefs = memoize(composeRefs);

  state = {
    isActive: false,
    isFocus: false,
    isHover: false,
  };

  componentDidMount() {
    if (this.props.autoFocus && this.button instanceof HTMLButtonElement) {
      this.button.focus();
    }
  }

  isInteractive = () => !this.props.isDisabled && !this.props.isLoading;

  onMouseEnter = (e) => {
    this.setState({ isHover: true });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  onMouseLeave = (e) => {
    this.setState({ isHover: false, isActive: false });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({ isActive: true });
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }
  };

  onMouseUp = (e) => {
    this.setState({ isActive: false });
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  };

  onFocus = event => {
    this.setState({ isFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  onBlur = event => {
    this.setState({ isFocus: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  getElement = () => {
    const { href, isDisabled } = this.props;
    if (href) {
      return isDisabled ? 'span' : 'a';
    }
    return 'button';
  };

  // Swallow click events when the button is disabled
  // to prevent inner child clicks bubbling up.
  onInnerClick = e => {
    if (!this.isInteractive()) {
      e.stopPropagation();
    }
    return true;
  };

  render() {
    const {
      appearance = 'default',
      children,
      className,
      component: CustomComponent,
      consumerRef,
      iconAfter,
      iconBefore,
      isDisabled = false,
      isLoading = false,
      isSelected = false,
      shouldFitContainer = false,
      spacing = 'default',
      theme = (
        current,
        props,
      ) => current(props),
      ...rest
    } = this.props;

    const attributes = { ...this.state, isSelected, isDisabled };
    const StyledButton = CustomComponent || this.getElement();
    const iconIsOnlyChild = !!(
      (iconBefore && !iconAfter && !children) ||
      (iconAfter && !iconBefore && !children)
    );

    const specifiers = (styles) => {
      if (StyledButton === 'a') {
        return {
          'a&': styles,
        };
      } else if (StyledButton === CustomComponent) {
        return {
          '&, a&, &:hover, &:active, &:focus': styles,
        };
      }
      return styles;
    };
    return (
      <Theme.Provider value={theme}>
        <GlobalTheme.Consumer>
          {({ mode }) => (
            <Theme.Consumer
              mode={mode}
              state={mapAttributesToState(attributes)}
              iconIsOnlyChild={iconIsOnlyChild}
              {...this.props}
            >
              {({ buttonStyles, spinnerStyles }) => (
                <Wrapper type={StyledButton}
                  {...filterProps(rest, StyledButton)}
                  ref={this.getComposedRefs(this.button, consumerRef)}
                  onMouseEnter={this.onMouseEnter}
                  onMouseLeave={this.onMouseLeave}
                  onMouseDown={this.onMouseDown}
                  onMouseUp={this.onMouseUp}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  disabled={isDisabled}
                  className={className}
                  css={specifiers(buttonStyles)}
                >
                  <InnerWrapper
                    onClick={this.onInnerClick}
                    fit={!!shouldFitContainer}
                  >
                    {isLoading && (
                      <LoadingSpinner
                        spacing={spacing}
                        appearance={appearance}
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        styles={spinnerStyles}
                      />
                    )}
                    {iconBefore && (
                      <IconWrapper
                        isLoading={isLoading}
                        spacing={spacing}
                        isOnlyChild={iconIsOnlyChild}
                        icon={iconBefore}
                      />
                    )}
                    {children && (
                      <Content
                        isLoading={isLoading}
                        followsIcon={!!iconBefore}
                        spacing={spacing}
                      >
                        {children}
                      </Content>
                    )}
                    {iconAfter && (
                      <IconWrapper
                        isLoading={isLoading}
                        spacing={spacing}
                        isOnlyChild={iconIsOnlyChild}
                        icon={iconAfter}
                      />
                    )}
                  </InnerWrapper>
                </Wrapper>
              )}
            </Theme.Consumer>
          )}
        </GlobalTheme.Consumer>
      </Theme.Provider>
    );
  }
}

export default React.forwardRef(
  (props, ref) => <Button {...props} consumerRef={ref} />,
);