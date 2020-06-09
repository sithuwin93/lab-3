import React, { Component } from 'react';
import Select, { mergeStyles } from 'react-select';
import makeAnimated from 'react-select/animated';
import memoizeOne from 'memoize-one';
import isEqual from 'react-fast-compare';
import * as defaultComponents from './components';
import baseStyles from './styles';
import Theme from 'src/components/theme';

export default function createSelect(WrappedComponent) {
  return class EffectiveNoteSelect extends Component{
    components = {};

    select = null;

    constructor(props) {
      super(props);
      this.cacheComponents = memoizeOne(this.cacheComponents, isEqual).bind(
        this,
      );
      this.cacheComponents(props.components || {}, props.enableAnimation);
    }

    static defaultProps = {
      enableAnimation: true,
      validationState: 'default',
      spacing: 'default',
      onClickPreventDefault: true,
      tabSelectsValue: false,
      components: {},
      styles: {},
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.cacheComponents(nextProps.components, nextProps.enableAnimation);
    }

    cacheComponents = (
      components,
      enableAnimation,
    ) => {
      this.components = enableAnimation
        ? makeAnimated({
            ...defaultComponents,
            ...components,
          })
        : {
            ...defaultComponents,
            ...components,
          };
    };

    focus() {
      if (this.select) this.select.focus();
    }

    blur() {
      if (this.select) this.select.blur();
    }

    onSelectRef = (ref) => {
      this.select = ref;

      const { innerRef } = this.props;

      if (typeof innerRef === 'object') {
        innerRef.current = ref;
      }
      if (typeof innerRef === 'function') {
        innerRef(ref);
      }
    };

    render() {
      const {
        styles,
        validationState,
        spacing,
        isMulti,
        ...props
      } = this.props;
      const isCompact = spacing === 'compact';
      // props must be spread first to stop `components` being overridden
      return (
        <Theme.Consumer>
          {(tokens) => (
            <WrappedComponent
              ref={this.onSelectRef}
              isMulti={isMulti}
              {...props}
              components={this.components}
              styles={mergeStyles(baseStyles(validationState, isCompact,tokens.mode), styles)}
            />
          )}
        </Theme.Consumer>
      );
    }
  };
}
