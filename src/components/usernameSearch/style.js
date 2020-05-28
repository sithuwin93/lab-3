import React from 'react';
import theme from 'shared/theme';
// $FlowFixMe
import styled from 'styled-components';
import { Transition } from '../globals';
import { themed } from 'src/components/theme';

export const Loading = styled.span`
  position: absolute;
  left: calc(100% - 24px);
  top: ${props => (props.size === 'small' ? 'calc(50% + 12px)' : '50%')};
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  transition: ${Transition.hover.off};
  position: relative;
  margin-top: ${props => (props.size === 'small' ? '12px' : 0)};

  &:hover > input {
    border-color: ${props =>
      props.disabled ? 
      themed({ light:props.theme.bg.border , dark: props.theme.bgd.border}) 
      : themed({ light:props.theme.text.alt , dark: props.theme.textd.alt})};
    transition: ${Transition.hover.on};
  }

  &:hover > input:focus {
    border-color: ${props =>
      props.disabled ? 
      themed({ light: props.theme.bg.inactive, dark:props.theme.bgd.inactive }) 
      : themed({ light: props.theme.brand.alt, dark: props.theme.brandd.alt})};
  }
`;

export const StyledInput = styled.input`
  flex: 1 0 auto;
  background: ${props =>
    props.disabled ? 
    themed({ light: props.theme.bg.wash, dark: props.theme.bgd.wash}) : 
    themed({ light:props.theme.bg.default , dark: props.theme.bgd.default})};
  font-weight: 500;
  width: 100%;
  font-size: ${props => (props.size === 'small' ? '14px' : '18px')};
  border: 2px solid
    ${props =>
      props.disabled ? 
      themed({ light: props.theme.bg.border, dark: props.theme.bgd.border}) 
      : themed({ light: props.theme.bg.inactive, dark:props.theme.bgd.inactive })};
  border-radius: ${props => (props.size === 'small' ? '4px' : '8px')};
  padding: ${props => (props.size === 'small' ? '8px 12px' : '12px 24px')};
  margin-top: 2px;
  text-align: ${props => (props.size === 'small' ? 'left' : 'center')};
  box-shadow: none;
  transition: ${Transition.hover.off};

  &::placeholder {
    color: ${() => themed({ light:theme.text.placeholder, dark: theme.textd.placeholder})};
  }
  &::-webkit-input-placeholder {
    color: ${() => themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }
  &:-moz-placeholder {
    color: ${() => themed({ light: theme.text.placeholder, dark:theme.textd.placeholder })};
  }
  &:-ms-input-placeholder {
    color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
  }

  &:focus {
    border-color: ${() => themed({ light:theme.brand.default , dark:theme.brandd.default })};
    transition: ${Transition.hover.on};
  }
`;

export const Input = props => {
  const { dataCy, ...rest } = props;
  return (
    <StyledLabel {...rest}>
      {props.children}
      <StyledInput
        id={props.id}
        type={props.inputType}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        size={props.size}
        data-cy={dataCy}
      />
    </StyledLabel>
  );
};
