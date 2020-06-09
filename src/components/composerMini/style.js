// @flow
import styled from 'styled-components';
import theme from 'shared/theme';
import { MEDIA_BREAK } from 'src/components/layout';
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
  font-size: 16px;
  color: inherit;
`

export const Container = styled.div`
  border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 12px 20px 12px 12px;
  position: relative;

  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`;

export const BodyContainer = styled.div`
  width: 100%;
  padding-left: 48px;
  padding-right: 8px;
  margin-top: 8px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div,
  textarea {
    line-height: 1.4 !important;
    word-break: break-word;
  }
`;
