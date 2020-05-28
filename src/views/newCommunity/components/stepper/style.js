// @flow
import theme from 'shared/theme';
// $FlowFixMe
import styled from 'styled-components';
import { zIndex } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 24px;
`;

export const Line = styled.span`
  position: absolute;
  height: 2px;
  background: ${() => themed({ light:theme.bg.border , dark:theme.bgd.border })};
  top: 50%;
  left: 24px;
  right: 24px;
  transform: translateY(-50%);
  z-index: ${zIndex.base};
`;

export const Step = styled.div`
  width: 32px;
  height: 32px;
  font-size: 16px;
  color: ${props =>
    props.active ? 
    themed({ light: props.theme.brand.default, dark:props.theme.brandd.default }) : 
    themed({ light:props.theme.text.alt , dark:props.theme.textd.alt })};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 2px solid
    ${props =>
      props.active ? 
      themed({ light:props.theme.brand.default , dark:props.theme.brandd.default }) 
      : themed({ light:props.theme.bg.border, dark: props.theme.bgd.border})};
  box-shadow: 0 0 0 4px #fff;
  font-weight: 700;
  z-index: ${zIndex.base + 1};
  position: relative;
`;
