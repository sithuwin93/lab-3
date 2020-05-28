import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import { FlexRow, Transition, hexa, zIndex } from '../globals';
import Textarea from 'react-textarea-autosize';
import { themed } from 'src/components/theme';

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 12px;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.4px;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  transition: ${Transition.hover.off};
  position: relative;

  a {
    text-decoration: underline;
  }

  &:hover > input,
  &:hover > textarea {
    border-color: ${props =>
      props.disabled ? 
      themed({ light:props.theme.bg.border , dark:props.theme.bgd.border }) : 
      themed({ light: props.theme.text.alt, dark:props.theme.textd.alt })};
    transition: ${Transition.hover.on};
  }

  &:hover > input:focus,
  &:hover > textarea:focus {
    border-color: ${props =>
      props.disabled ? 
      themed({ light: props.theme.bg.inactive, dark:props.theme.bgd.inactive }) : 
      themed({ light: props.theme.brand.alt, dark:props.theme.brandd.alt })};
  }
`;

export const StyledPrefixLabel = styled.label`
  display: flex;
  width: 100%;
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
  white-space: nowrap;
  text-overflow: ellipsis;

  > input {
    margin-left: 2px;
  }

  &:hover > input {
    border-color: ${props =>
      props.disabled ? 
      themed({ light: props.theme.bg.inactive, dark: props.theme.bgd.inactive}) : 
      themed({ light: props.theme.text.alt, dark:props.theme.textd.alt })};
    transition: ${Transition.hover.on};
  }
`;

export const StyledInput = styled.input`
  flex: 1 0 auto;
  background: ${props =>
    props.disabled ? 
    themed({ light: props.theme.bg.wash, dark: props.theme.bgd.wash}) : 
    themed({ light: props.theme.bg.default, dark: props.theme.bgd.default})};
  font-weight: 500;
  width: 100%;
  font-size: 14px;
  border: 2px solid
    ${props =>
      props.disabled ? 
      themed({ light: props.theme.bg.border, dark: props.theme.bgd.border})
       : themed({ light: props.theme.bg.inactive, dark: props.theme.bgd.inactive})
      };
  border-radius: 4px;
  padding: 8px 12px;
  margin-top: 2px;
  box-shadow: none;
  transition: ${Transition.hover.off};

  ${props =>
    props.type === 'checkbox' &&
    css`
      flex: initial;
      width: initial;
      margin-right: 0.5em;
    `} &::placeholder {
    color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
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
    border-color: ${() => themed({ light: theme.brand.default, dark: theme.brandd.default})};
    transition: ${Transition.hover.on};
  }

  &[type='file'] {
    position: absolute;
    left: -9999px;
    top: -9999px;
    visibility: hidden;
  }
`;

export const StyledTextArea = styled(Textarea)`
  flex: 1 0 auto;
  width: 100%;
  background: ${() => themed({ light:theme.bg.default , dark: theme.bgd.default})};
  font-weight: 500;
  font-size: 14px;
  border: 2px solid ${() => themed({ light: theme.bg.inactive, dark: theme.bgd.inactive})};
  border-radius: 4px;
  padding: 12px;
  margin-top: 2px;
  box-shadow: none;
  transition: ${Transition.hover.off};

  &::placeholder {
    color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
  }
  &::-webkit-input-placeholder {
    color: ${() => themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }
  &:-moz-placeholder {
    color: ${() => themed({ light: theme.text.placeholder, dark: theme.textd.placeholder})};
  }
  &:-ms-input-placeholder {
    color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
  }

  &:focus {
    border-color: ${() => themed({ light:theme.brand.default , dark:theme.brandd.default })};
    transition: ${Transition.hover.on};
  }
`;

export const StyledUnderlineInput = styled.input`
  font-size: inherit;
  font-weight: inherit;
  color: ${props =>
    props.disabled ? 
    themed({ light:props.theme.text.alt , dark:props.theme.textd.alt }) : 
    themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
  border-bottom: ${props =>
    props.disabled
      ? '2px solid transparent'
      : `2px solid ${themed({ light: props.theme.bg.inactive, dark:props.theme.bgd.inactive })}`};
  width: 50%;
  transition: ${Transition.hover.off};

  &:hover {
    border-color: ${props => (props.disabled ? 'transparent' : 'inherit')};
    transition: ${Transition.hover.on};
  }

  &:focus {
    border-color: ${() => themed({ light: theme.brand.default, dark:theme.brandd.default })};
    transition: ${Transition.hover.on};
  }
`;

export const StyledHiddenInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
`;

export const StyledCheckboxWrapper = styled(FlexRow)`
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  display: flex;
  align-items: ${props => props.align};
  line-height: 1.4;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    color: ${({ theme, disabled }) =>
      disabled ? themed({ light: theme.text.alt, dark:theme.textd.alt }) 
      : themed({ light: theme.brand.alt, dark: theme.brandd.alt})
      };
  }

  > div {
    margin-left: -6px;
    margin-right: 6px;
  }

  > a {
    text-decoration: none;
    color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
    font-weight: 600;
    border-bottom: 2px solid transparent;
    position: relative;
    padding-bottom: 0px;
    transition: ${Transition.hover.off};

    &:hover {
      border-bottom: 2px solid ${themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
      padding-bottom: 2px;
      transition: ${Transition.hover.on};
    }
  }
`;

export const StyledError = styled.p`
  font-size: 14px;
  color: ${() => themed({ light: theme.warn.default, dark: theme.warnd.default})};
  padding: 8px 0 16px;
  line-height: 1.4;
  font-weight: 600;

  a {
    text-decoration: underline;
  }
`;

export const StyledSuccess = styled.p`
  font-size: 14px;
  color: ${() => themed({ light: theme.success.default, dark: theme.successd.default})};
  padding: 8px 0 16px;
  line-height: 1.4;
  font-weight: 600;
`;

export const PhotoInputLabel = styled.label`
  position: relative;
  height: ${props => `${props.size}px`};
  z-index: ${zIndex.form + 1};
  width: ${props => `${props.size}px`};
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  margin-top: 8px;
  background-color: ${() => themed({ light:theme.bg.reverse , dark: theme.bgd.reverse})};
`;

export const PhotoInputImage = styled.img`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  box-shadow: 0 0 0 2px ${themed({ light: theme.bg.default, dark: theme.bgd.default})};
`;

export const CoverInputLabel = styled.label`
  position: relative;
  height: 114px;
  max-width: 342px;
  z-index: ${zIndex.form};
  width: 100%;
  margin-top: 8px;
  border-radius: 8px;
  background-color: ${() => themed({ light: theme.bg.reverse, dark: theme.bgd.reverse})};
`;

export const ProfileImage = styled.img`
  position: absolute;
  object-fit: cover;
  z-index: ${zIndex.form + 1};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  border: 2px solid ${themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
`;

export const CoverImage = styled.div`
  background-color: ${() => themed({ light:theme.brand.default , dark: theme.brandd.default})};
  background-image: url('${props => props.src}');
  background-position: center;
  background-size: cover;
  position: absolute;
  z-index: ${zIndex.form};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 114px;
  border-radius: 8px;
`;

export const InputOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.form + 2};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  background-color: ${({ theme }) => themed({ light: hexa(theme.bg.reverse, 0.6), dark:hexa(theme.bgd.reverse, 0.6) })};
  padding: 8px;
  border-radius: ${props =>
    props.type === 'user' ? `${props.size}px` : '8px'};
  opacity: ${props => (props.visible ? '1' : '0')};
  transition: ${Transition.hover.off};

  &:hover {
    opacity: 1;
    transition: ${Transition.hover.on};

    + img,
    + div {
      transition: ${Transition.hover.on};
      opacity: 0.25;
    }
  }

  &:hover div {
    transition: ${Transition.hover.on};
  }
`;
