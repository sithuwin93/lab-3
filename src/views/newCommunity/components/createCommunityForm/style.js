// @flow
import theme from 'shared/theme';
import styled, { css } from 'styled-components';
import { FlexCol, FlexRow } from 'src/components/globals';
import { themed } from 'src/components/theme';
import { subtleHeading } from 'src/components/theme/colors';
import { fontSize, gridSize } from 'src/components/theme/constants';
import { headingSizes } from 'src/components/theme/typography';

export const LabelWrapper = styled.div`
  margin-top: 12px;
`

export const Label = styled.label`
  font-size: ${headingSizes.h400.size / fontSize()}em;
  font-style: inherit;
  line-height: ${headingSizes.h200.lineHeight /headingSizes.h200.size};
  color: ${subtleHeading()};
  font-weight: 600px;
  margin-top: ${gridSize() * 2}px;
`

export const DeleteCoverWrapper = styled(FlexRow)`
  justify-content: flex-end;
  flex-grow: 1;
  height: 0px;
`;

export const DeleteCoverButton = styled.button`
  position: relative;
  top: 7px;
  left: 10px;
  background-color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};
  color: ${() => themed({ light: theme.text.reverse, dark: theme.textd.reverse})};
  border: none;
  border-radius: 50%;
  outline: none;
  padding: 4px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  z-index: 50;
  &:hover {
    background-color: ${() => themed({ light: theme.warn.alt, dark: theme.warnd.alt})};
  }
`;

export const ImageInputWrapper = styled(FlexCol)`
  position: relative;
  flex: 0 0 auto;
  margin-top: 8px;
  margin-bottom: 24px;

  > label:nth-of-type(2) {
    position: absolute;
    bottom: -24px;
    left: 16px;
  }
`;

export const Spacer = styled.div`
  height: ${props => (props.height ? `${props.height}px` : 'auto')};
  width: ${props => (props.width ? `${props.width}px` : 'auto')};
  display: block;
`;

export const CommunitySuggestionsText = styled.p`
  margin: 16px 0px 8px;
  font-size: 14px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
`;

export const CommunitySuggestionsWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 24px;
  width: 100%;
`;

export const CommunitySuggestion = styled.li`
  padding: 8px 12px;
  font-size: 14px;
  background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  border-left: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  border-right: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  display: flex;
  align-items: center;
  flex: 1 0 auto;

  strong {
    margin-left: 8px;
    margin-right: 8px;
    font-weight: 500;
  }

  &:hover {
    color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};
  }

  &:first-of-type {
    padding-top: 8px;
    border-top: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  }

  &:last-of-type {
    padding-bottom: 8px;
    border-bottom: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  }
`;

export const PrivacySelector = styled.div`
  display: flex;
  border-radius: 4px;
  border: 2px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  margin-top: 16px;
  overflow: hidden;
`;

export const PrivacyOption = styled.label`
  display: flex;
  flex-direction: column;
  flex: 1 0 50%;
  padding: 16px;
  background: ${props =>
    props.selected ? 
    themed({ light: props.theme.bg.default, dark:props.theme.bgd.default }) 
    : themed({ light: props.theme.bg.wash, dark: props.theme.bgd.wash})};
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    border-radius: 24px;
    border: 2px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  }

  input:checked {
    box-shadow: inset 0 0 0 4px ${themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
    border: 2px solid ${themed({ light:theme.brand.alt , dark: theme.brandd.alt})};
  }

  ${props =>
    props.selected
      ? css`
          p {
            color: ${() => themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
          }
        `
      : css`
          p {
            color: ${() => themed({ light:props.theme.text.alt , dark:props.theme.textd.alt })};
          }
        `} &:first-of-type {
    border-right: 2px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  }
`;

export const PrivacyOptionLabel = styled.p`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 500;

  input {
    margin-right: 8px;
  }
`;

export const PrivacyOptionText = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
  line-height: 1.4;
`;
