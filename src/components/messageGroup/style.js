// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { Transition, HorizontalRule } from '../globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';

export const MessagesWrapper = styled.div`
  flex: 1 0 auto;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  justify-content: flex-end;
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};

  @media (max-width: ${MEDIA_BREAK}px) {
    padding-bottom: 72px;
  }
`;

export const MessageGroupContainer = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-top: 8px;
`;

export const Timestamp = styled(HorizontalRule)`
  margin: 24px 0;
  text-align: center;
  user-select: none;

  hr {
    border-color: ${() => themed({ light: theme.bg.divider, dark: theme.bgd.divider})};
  }
`;

export const UnseenRobotext = styled(Timestamp)`
  hr {
    border-color: ${() => themed({ light:theme.warn.alt , dark: theme.warnd.alt})};
    opacity: 0.1;
  }
`;

export const Time = styled.span`
  text-align: center;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  font-size: 14px;
  font-weight: 500;
  margin: 0 24px;
`;

export const UnseenTime = styled(Time)`
  color: ${() => themed({ light:theme.warn.alt , dark:theme.warnd.alt })};

  &:hover {
    color: ${() => themed({ light:theme.warn.alt , dark:theme.warnd.alt })};
    transiton: ${Transition.hover.on};
  }
`;

export const MessageLink = styled.a`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 12px;
  top: 0;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  left: calc(100% + 4px);
`;

export const MessageNonLink = MessageLink.withComponent('span');
