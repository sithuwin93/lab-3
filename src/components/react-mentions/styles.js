import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import { themed } from 'src/components/theme';

export const StyledInput = styled.input`
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
  border: ${props => props.titleWarning? 
    themed({ light:theme.warn.default , dark: theme.warnd.default}):
    themed({ light: theme.bg.border, dark:theme.bgd.border })
  };
  border-radius: 8px;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  color: inherit;
`

export const StyledTextArea = styled.textarea`
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
  border: ${props => props.titleWarning? 
    themed({ light:theme.warn.default , dark: theme.warnd.default}):
    themed({ light: theme.bg.border, dark:theme.bgd.border })
  };
  color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};  // font-size: 16px;
  font-size: 18px;

  // border-radius: 8px;
  // width: 100%;
  // padding: 12px;
  // margin-left: 12px;
  // margin-bottom: 12px;
  
`