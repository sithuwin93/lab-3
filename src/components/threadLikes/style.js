// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { Button } from 'src/components/button';
import { themed } from 'src/components/theme';

export const CurrentCount = styled.b`
  font-size: 13px;
`;

export const LikeButtonWrapper = styled(Button)`
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  border: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  color: ${props =>
    props.hasReacted ?themed({ light: props.theme.brand.alt, dark:props.theme.brandd.alt })  
    :themed({ light: props.theme.text.alt, dark:props.theme.textd.alt }) };
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0;
  padding-left: 16px;

  div + span {
    margin: 0;
    margin-left: 8px;
  }

  ${CurrentCount} {
    background: ${() => themed({ light:theme.bg.wash , dark:theme.bgd.wash })};
    border-left: 1px solid ${() => themed({ light: theme.bg.border, dark:theme.bgd.border })};
    padding: 12px;
    padding-right: 16px;
    margin-left: 12px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    color: ${() => themed({ light:theme.text.secondary , dark: theme.textd.secondary})};
    font-size: 14px;
  }

  &:hover {
    background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
    color: ${props =>
      props.hasReacted ? themed({ light:props.theme.brand.alt , dark:props.theme.brandd.alt }) 
      : themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
  }
`;

export const LikeCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  color: ${props =>
    props.active ?themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse})  
    : themed({ light: props.theme.text.alt, dark: props.theme.textd.alt})};
  pointer-events: none;

  ${CurrentCount} {
    margin-left: 4px;
    font-weight: 500;
  }
`;
