import React from 'react';
import rafSchedule from 'raf-schd';
import ScrollLock from 'react-scrolllock';

import Footer from './Footer';
import Header from './Header';
import {
  keylineHeight,
  Body as DefaultBody,
  bodyStyles,
  wrapperStyles,
} from '../styled/Content';

function getInitialState() {
  return {
    showFooterKeyline: false,
    showHeaderKeyline: false,
    tabbableElements: [],
  };
}


const ContainerWrapper = (props) => {
  switch (props.type) {
    case 'div':
      return <div {...props}/>
    case 'span':
      return <span {...props}/>
    case 'a':
      return <a {...props}/>
    default:
      return <button {...props}/>
  }
}


export default class Content extends React.Component {
  static defaultProps = {
    autoFocus: false,
    components: {},
    isChromeless: false,
    stackIndex: 0,
    isHeadingMultiline: true,
  };

  escapeIsHeldDown = false;

  _isMounted = false;

  scrollContainer = null;

  state = getInitialState();

  componentDidMount() {
    this._isMounted = true;

    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('keyup', this.handleKeyUp, false);

    if (this.scrollContainer) {
      const capturedScrollContainer = this.scrollContainer;
      window.addEventListener('resize', this.determineKeylines, false);
      // capturedScrollContainer.addEventListener(
      //   'scroll',
      //   this.determineKeylines,
      //   false,
      // );
      this.determineKeylines();
    }

    /* eslint-disable no-console */
    // Check for deprecated props
    if (this.props.header)
      console.warn(
        "@atlaskit/modal-dialog: Deprecation warning - Use of the header prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead",
      );
    if (this.props.footer)
      console.warn(
        "@atlaskit/modal-dialog: Deprecation warning - Use of the footer prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead",
      );
    if (this.props.body)
      console.warn(
        "@atlaskit/modal-dialog: Deprecation warning - Use of the body prop in ModalDialog is deprecated. Please compose your ModalDialog using the 'components' prop instead",
      );

    // Check that custom body components have used ForwardRef to attach to a DOM element
    if (this.props.components.Body) {
      if (!(this.scrollContainer instanceof HTMLElement)) {
        console.warn(
          '@atlaskit/modal-dialog: Warning - Ref must attach to a DOM element; check you are using forwardRef and attaching the ref to an appropriate element. Check the examples for more details.',
        );
      }
    }
    /* eslint-enable no-console */
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { stackIndex } = this.props;

    // update focus scope and let consumer know when stack index has changed
    if (nextProps.stackIndex && nextProps.stackIndex !== stackIndex) {
      this.handleStackChange(nextProps.stackIndex);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;

    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);

    if (this.scrollContainer) {
      const capturedScrollContainer = this.scrollContainer;
      window.removeEventListener('resize', this.determineKeylines, false);
      // capturedScrollContainer.removeEventListener(
      //   'scroll',
      //   this.determineKeylines,
      //   false,
      // );
    }
  }

  determineKeylines = rafSchedule(() => {
    if (!this.scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = this.scrollContainer;
    const scrollableDistance = scrollHeight - clientHeight;
    const showHeaderKeyline = scrollTop > keylineHeight;
    const showFooterKeyline = scrollTop <= scrollableDistance - keylineHeight;

    this.setState({ showHeaderKeyline, showFooterKeyline });
  });

  getScrollContainer = (ref) => {
    if (!ref) return;
    this.scrollContainer = ref;
  };

  handleKeyUp = () => {
    this.escapeIsHeldDown = false;
  };

  handleKeyDown = (event) => {
    const { onClose, shouldCloseOnEscapePress, stackIndex = 0 } = this.props;

    // avoid consumers accidentally closing multiple modals if they hold escape.
    if (this.escapeIsHeldDown) return;
    if (event.key === 'Escape' || event.key === 'Esc')
      this.escapeIsHeldDown = true;

    // only the foremost modal should be interactive.
    if (!this._isMounted || stackIndex > 0) return;

    switch (event.key) {
      case 'Esc':
      case 'Escape':
        if (shouldCloseOnEscapePress) onClose(event);
        break;
      default:
    }
  };

  handleStackChange = (stackIndex) => {
    const { onStackChange } = this.props;
    if (onStackChange) onStackChange(stackIndex);
  };

  render() {
    const {
      actions,
      appearance,
      body: DeprecatedBody,
      children,
      components,
      footer,
      header,
      heading,
      isChromeless,
      isHeadingMultiline,
      onClose,
      shouldScroll,
      testId,
    } = this.props;

    const { showFooterKeyline, showHeaderKeyline } = this.state;
    const { Container , Body: CustomBody } = components; //= 'div'
    const Body = CustomBody || DeprecatedBody || DefaultBody;

    return (
      <ContainerWrapper type={Container} css={wrapperStyles} data-testid={testId}>
        {isChromeless ? (
          children
        ) : (
          <React.Fragment>
            <Header
              appearance={appearance}
              component={components.Header ? components.Header : header}
              heading={heading}
              onClose={onClose}
              isHeadingMultiline={isHeadingMultiline}
              showKeyline={showHeaderKeyline}
            />
            {/* Backwards compatibility for styled-components innerRefs */}
            <div
              css={bodyStyles(shouldScroll)}
              {...(!Body.hasOwnProperty('styledComponentId')
                ? { ref: this.getScrollContainer }
                : { innerRef: this.getScrollContainer })}
            >
              {children}
            </div>
            <Footer
              actions={actions}
              appearance={appearance}
              component={components.Footer ? components.Footer : footer}
              onClose={onClose}
              showKeyline={showFooterKeyline}
            />
          </React.Fragment>
        )}
        <ScrollLock />
      </ContainerWrapper>
    );
  }
}
