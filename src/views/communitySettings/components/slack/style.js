// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { hexa } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const SlackChannelRow = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -16px;
  width: calc(100% + 32px);
  padding: 12px 16px;

  &:nth-of-type(odd) {
    background: ${props =>themed({ light: hexa(props.theme.bg.wash, 0.8), dark:hexa(props.theme.bgd.wash, 0.8) }) };
  }
`;

export const ChannelName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  flex: 1 0 auto;
`;

export const StyledSelect = styled.div`
  border: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
  border-radius: 4px;
  overflow: hidden;
`;

export const Select = styled.select`
  padding: 4px 12px;
  width: 130%;
  border: none;
  box-shadow: none;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  background-image: none;
  -webkit-appearance: none;
  font-weight: 400;
  font-size: 14px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
`;

export const SendsTo = styled.div`
  font-size: 14px;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  flex: none;
  margin-right: 12px;
  margin-left: 4px;
`;
export const ChannelListContainer = styled.div`
  margin-top: 16px;
  margin-bottom: -16px;
`;
