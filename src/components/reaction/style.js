// @flow
import styled from 'styled-components';
import { themed } from 'src/components/theme';

export const ReactionWrapper = styled.span`
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2px 8px;
  margin-top: 4px;
  background: ${props =>
    props.hasReacted ? 
    themed({ light:props.theme.warn.wash , dark:props.theme.warnd.wash }) : 
    themed({ light: props.theme.bg.wash, dark:props.theme.bgd.wash })};
  border: 1px solid
    ${props =>
      props.hasReacted ? 
      themed({ light:props.theme.warn.border , dark:props.theme.warnd.border }) : 
      themed({ light: props.theme.bg.border, dark:props.theme.bgd.border })};
  color: ${props =>
    props.hasReacted ? 
    themed({ light: props.theme.warn.alt, dark:props.theme.warnd.alt }) : 
    themed({ light:props.theme.text.alt , dark: props.theme.textd.alt})};
  align-self: flex-start;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;

  &:hover {
    color: ${props =>
      props.hasReacted ? 
      themed({ light: props.theme.warn.alt, dark:props.theme.warnd.alt }) : 
      themed({ light: props.theme.text.secondary, dark: props.theme.textd.secondary})};
  }

  .icon {
    color: ${props =>
      props.hasReacted ? 
      themed({ light: props.theme.warn.alt, dark: props.theme.warnd.alt}) : 
      themed({ light: props.theme.text.alt, dark: props.theme.textd.alt})};
    margin-right: 4px;
    margin-top: -1px;
  }
`;
