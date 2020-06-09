import React, { Component } from 'react';
  
  import styledRootElement from '../styled/Item';
  import {
    Before,
    After,
    Content,
    ContentWrapper,
    Description,
  } from '../styled/ItemParts';
  
  
  export default class Item extends Component {
    static defaultProps = {
      autoFocus: false,
      description: '',
      isCompact: false,
      isDisabled: false,
      isHidden: false,
      role: 'button',
      shouldAllowMultiline: false,
    };
  
    rootComponent;
    ref;
  
    constructor(props) {
      super(props);
      this.rootComponent = styledRootElement({
        href: this.href(),
        linkComponent: props.linkComponent,
      });
    }
  
    componentDidMount() {
      if (this.ref && this.props.autoFocus) {
        this.ref.focus();
      }
    }
  
    setRef = (ref) => {
      this.ref = ref;
    };
  
    href = () => (this.props.isDisabled ? null : this.props.href);
  
    render() {
      const {
        onClick,
        onKeyDown,
        isCompact,
        isDisabled,
        isDragging,
        isHidden,
        isSelected,
        onMouseEnter,
        onMouseLeave,
        role,
        dnd,
        ...otherProps
      } = this.props;
  
      const { rootComponent: Root } = this;
      const dragHandleProps = (dnd && dnd.dragHandleProps) || null;
  
      const patchedEventHandlers = {
        onClick: (event) => {
          if (event.defaultPrevented) {
            return;
          }
  
          if (!isDisabled && onClick) {
            onClick(event);
          }
        },
        onMouseDown: (event) => {
          if (dragHandleProps && dragHandleProps.onMouseDown) {
            dragHandleProps.onMouseDown(event);
          }
          event.preventDefault();
        },
        onKeyDown: (event) => {
          if (isDragging) {
            return;
          }
          if (dragHandleProps && dragHandleProps.onKeyDown) {
            dragHandleProps.onKeyDown(event);
          }
          if (event.defaultPrevented) {
            return;
          }
          if (isDisabled) {
            return;
          }
  
          if (!onKeyDown) {
            return;
          }
  
          onKeyDown(event);
        },
      };
  
      const patchedInnerRef = (ref) => {
        this.setRef(ref);
          if (dnd && dnd.innerRef) {
          dnd.innerRef(ref);
        }
      };
  
      return (
        <Root
          aria-disabled={isDisabled}
          href={this.href()}
          isCompact={isCompact}
          isDisabled={isDisabled}
          isDragging={isDragging}
          isHidden={isHidden}
          isSelected={isSelected}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          role={role}
          tabIndex={isDisabled || isHidden || this.props.href ? null : 0}
          target={this.props.target}
          title={this.props.title}
          innerRef={patchedInnerRef}
          {...(dnd && dnd.draggableProps)}
          {...dragHandleProps}
          {...patchedEventHandlers}
          {...otherProps}>
          {!!this.props.elemBefore && (
            <Before isCompact={isCompact}>{this.props.elemBefore}</Before>
          )}
          <ContentWrapper>
            <Content allowMultiline={this.props.shouldAllowMultiline}>
              {this.props.children}
            </Content>
            {!!this.props.description && (
              <Description
                isCompact={this.props.isCompact}
                isDisabled={this.props.isDisabled}
              >
                {this.props.description}
              </Description>
            )}
          </ContentWrapper>
          {!!this.props.elemAfter && (
            <After isCompact={isCompact}>{this.props.elemAfter}</After>
          )}
        </Root>
      );
    }
  }
  