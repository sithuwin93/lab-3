import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Select from 'react-select';
import createFocusTrap from 'focus-trap';
import { Manager, Reference, Popper } from 'react-popper';
import NodeResolver from 'react-node-resolver';
import shallowEqualObjects from 'shallow-equal/objects';
import { N80 } from 'src/components/theme/colors';

import { MenuDialog, DummyControl, defaultComponents } from './components';


const canUseDOM = () =>
  Boolean(
    typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement,
  );


const defaultStyles = {
  groupHeading: provided => ({ ...provided, color: N80 }),
};

const defaultPopperProps = {
  modifiers: { offset: { offset: `0, 8` } },
  placement: 'bottom-start',
};

const isEmpty = (obj) => Object.keys(obj).length === 0;

export default class PopupSelect extends PureComponent{
  focusTrap = null;
  menuRef = null;
  selectRef = null;
  targetRef = null;

  state = {
    isOpen: false,
    mergedComponents: defaultComponents,
    mergedPopperProps: defaultPopperProps,
  };

  static defaultProps = {
    closeMenuOnSelect: true,
    components: {},
    maxMenuHeight: 300,
    maxMenuWidth: 440,
    minMenuWidth: 220,
    popperProps: {},
    searchThreshold: 5,
    styles: {},
    options: [],
  };

  static getDerivedStateFromProps(
    props,
    state,
  ) {
    const newState = {};

    const mergedPopperProps = { ...defaultPopperProps, ...props.popperProps };
    if (!shallowEqualObjects(mergedPopperProps, state.mergedPopperProps)) {
      newState.mergedPopperProps = mergedPopperProps;
    }

    const mergedComponents = { ...defaultComponents, ...props.components };
    if (!shallowEqualObjects(mergedComponents, state.mergedComponents)) {
      newState.mergedComponents = mergedComponents;
    }

    if (!isEmpty(newState)) return newState;

    return null;
  }

  componentDidMount() {
    if (typeof window === 'undefined') return;
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('click', this.handleClick);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
        this.close();
        break;
      default:
    }
    if (this.props.handleKeyDown) {
      this.props.handleKeyDown(event);
    }
  };

  handleClick = ({ target }) => {
    const { isOpen } = this.state;
    if (!(target instanceof Element)) return;

    if (isOpen && this.menuRef && !this.menuRef.contains(target)) {
      this.close();
    }

    if (!isOpen && this.targetRef && this.targetRef.contains(target)) {
      this.open();
    }
  };

  handleSelectChange = (value, actionMeta) => {
    const { closeMenuOnSelect, onChange } = this.props;
    if (closeMenuOnSelect && actionMeta.action !== 'clear') this.close();
    if (onChange) onChange(value, actionMeta);
  };

  open = () => {
    const { onOpen } = this.props;
    if (onOpen) onOpen();

    this.setState({ isOpen: true }, this.initialiseFocusTrap);

    if (this.selectRef) {
      this.selectRef.select.openMenu('first'); // HACK
    }

    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', this.handleKeyDown);
  };

  initialiseFocusTrap = () => {
    if (!this.menuRef) return;

    const trapConfig = {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      fallbackFocus: this.menuRef,
      returnFocusOnDeactivate: true,
    };

    this.focusTrap = createFocusTrap(this.menuRef, trapConfig);
    setTimeout(() => this.focusTrap.activate(), 1);
  };

  close = () => {
    const { onClose } = this.props;
    if (onClose) onClose();

    this.setState({ isOpen: false });

    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }

    if (typeof window === 'undefined') return;

    window.removeEventListener('keydown', this.handleKeyDown);
  };


  resolveTargetRef = (popperRef) => (
    ref,
  ) => {
    if (!this.targetRef && popperRef && ref) {
      this.targetRef = ref;

      if (typeof popperRef === 'function') {
        popperRef(ref);
      } else {
        (popperRef).current = ref;
      }
    }
  };

  resolveMenuRef = (popperRef) => (
    ref,
  ) => {
    this.menuRef = ref;

    if (typeof popperRef === 'function') {
      popperRef(ref);
    } else {
      (popperRef).current = ref;
    }
  };

  getSelectRef = (ref) => {
    this.selectRef = ref;
  };

  
  getItemCount = () => {
    const { options } = this.props;
    let count = 0;

    options.forEach((groupOrOption) => {
      if ((groupOrOption).options) {
        (groupOrOption).options.forEach(() => count++);
      } else {
        count++;
      }
    });

    return count;
  };

  getMaxHeight = () => {
    const { maxMenuHeight } = this.props;

    if (!this.selectRef) return maxMenuHeight;

    // subtract the control height to maintain consistency
    const showSearchControl = this.showSearchControl();

    const { controlRef } = this.selectRef.select;

    // @ts-ignore React-select provides incomplete types for controlRef
    const offsetHeight = showSearchControl ? controlRef.offsetHeight : 0;
    const maxHeight = maxMenuHeight - offsetHeight;

    return maxHeight;
  };

  showSearchControl = () => {
    const { searchThreshold } = this.props;
    return this.getItemCount() > searchThreshold;
  };

  renderSelect = () => {
    const { footer, maxMenuWidth, minMenuWidth, target, ...props } = this.props;
    const { isOpen, mergedComponents, mergedPopperProps } = this.state;
    const showSearchControl = this.showSearchControl();
    const portalDestination = canUseDOM() ? document.body : null;
    const components = {
      ...mergedComponents,
      Control: showSearchControl ? mergedComponents.Control : DummyControl,
    };

    if (!portalDestination || !isOpen) return null;

    const popper = (
      <Popper {...mergedPopperProps}>
        {({ placement, ref, style }) => {
          return (
            <NodeResolver innerRef={this.resolveMenuRef(ref)}>
              <MenuDialog
                style={style}
                data-placement={placement}
                minWidth={minMenuWidth}
                maxWidth={maxMenuWidth}>
                <Select             
                  backspaceRemovesValue={false}
                  controlShouldRenderValue={false}
                  isClearable={false}
                  tabSelectsValue={false}
                  menuIsOpen
                  ref={this.getSelectRef}
                  {...props}
                  isSearchable={showSearchControl}
                  styles={{ ...defaultStyles, ...props.styles }}
                  maxMenuHeight={this.getMaxHeight()}
                  components={components}
                  onChange={this.handleSelectChange}
                />
                {footer}
              </MenuDialog>
            </NodeResolver>
          );
        }}
      </Popper>
    );

    return mergedPopperProps.positionFixed
      ? popper
      : createPortal(popper, portalDestination);
  };

  render() {
    const { target } = this.props;
    const { isOpen } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) =>
            target && target({ ref: this.resolveTargetRef(ref), isOpen })
          }
        </Reference>
        {this.renderSelect()}
      </Manager>
    );
  }
}
