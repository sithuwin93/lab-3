// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { Truncate } from 'src/components/globals';
import { Link } from 'react-router-dom';
import { themed } from 'src/components/theme';

export const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  color: ${() => themed({ light:theme.text.secondary , dark:theme.textd.secondary })};
  min-width: 0;

  border-top: 1px solid ${themed({ light: theme.bg.wash, dark:theme.bgd.wash })};

  &:first-of-type {
    border-top: 0;
  }

  &:hover {
    color: ${() => themed({ light:theme.text.default , dark: theme.textd.default})};
  }

  .icon {
    color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  }
`;

export const ChannelNameLink = styled(Link)`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 8px 0;
  min-width: 0;
`;

export const ChannelName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};

  ${Truncate};
`;

export const ChannelActions = styled.div`
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  min-width: 0;

  a {
    display: flex;
    align-items: center;
  }
`;
