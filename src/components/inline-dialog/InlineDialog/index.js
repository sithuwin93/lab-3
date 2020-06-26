import React, { Component } from 'react';
import NodeResolver from 'react-node-resolver';
import { Manager, Reference, Popper } from 'src/components/popper';
import { Container } from './styled';

export default class InlineDialog extends Component {
  static defaultProps = {
    isOpen: false,
    onContentBlur: () => {},
    onContentClick: () => {},
    onContentFocus: () => {},
    onClose: () => {},
    placement: 'bottom-start',
  };

  containerRef;

  triggerRef;

  componentDidUpdate(prevProps) {
    if (typeof window === 'undefined') return;

    if (!prevProps.isOpen && this.props.isOpen) {
      window.addEventListener('click', this.handleClickOutside, true);
    } else if (prevProps.isOpen && !this.props.isOpen) {
      window.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;

    if (this.props.isOpen) {
      window.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return;

    window.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    const { isOpen, onClose } = this.props;

    if (event.defaultPrevented) return;

    const container = this.containerRef;
    const trigger = this.triggerRef;
    const { target } = event;

    // exit if we click outside but on the trigger — it can handle the clicks itself
    if (trigger && trigger.contains(target)) return;

    // call onClose if the click originated from outside the dialog
    if (isOpen && container && !container.contains(target)) {
      onClose && onClose({ isOpen: false, event });
    }
  };

  render() {
    const {
      children,
      placement,
      isOpen,
      content,
      onContentBlur,
      onContentFocus,
      onContentClick,
      testId,
    } = this.props;

    const popper = isOpen ? (
      <Popper placement={placement}>
        {({ ref, style }) => (
          <Container
            onBlur={onContentBlur}
            onFocus={onContentFocus}
            onClick={onContentClick}
            innerRef={node => {
              this.containerRef = node;

              if (typeof ref === 'function') {
                ref(node);
              } else {
                (ref).current = node;
              }
            }}
            style={style}
            data-testid={testId}
          >
            {content}
          </Container>
        )}
      </Popper>
    ) : null;

    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <NodeResolver
              innerRef={(node) => {
                this.triggerRef = node;

                if (typeof ref === 'function') {
                  ref(node);
                } else {
                  (ref).current = node;
                }
              }}
            >
              {children}
            </NodeResolver>
          )}
        </Reference>
        {popper}
      </Manager>
    );
  }
}