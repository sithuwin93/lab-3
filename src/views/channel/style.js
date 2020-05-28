// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import Card from 'src/components/card';
import { Transition, zIndex, Truncate } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';

export const ColumnHeading = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 1;
  font-weight: 500;
  padding: 8px 16px 12px;
  margin-top: 24px;
  border-bottom: 2px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
`;

export const SearchContainer = styled(Card)`
  border-bottom: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
  position: relative;
  z-index: ${zIndex.search};
  width: 100%;
  display: flex;
  padding: 8px 12px;
  transition: ${Transition.hover.off};
  display: flex;
  align-items: center;

  @media (max-width: ${MEDIA_BREAK}px) {
    border-radius: 0;
    pointer-events: all;
    margin-bottom: 0;
  }
`;

export const SearchInput = styled.input`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  transition: ${Transition.hover.off};
  font-size: 16px;
  font-weight: 500;
  border-radius: 100px;
  background: ${() => themed({ light:theme.bg.default , dark:theme.bgd.default })};
  border: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};

  &:focus {
    border: 1px solid ${themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
  }
`;

export const MessageIconContainer = styled.div`
  color: ${() => themed({ light:theme.text.alt , dark: theme.textd.alt})};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${() => themed({ light: theme.brand.alt, dark:theme.brandd.alt })};
  }
`;

export const UserListItemContainer = styled.div`
  border-bottom: 1px solid ${themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
`;

export const CommunityContext = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: 32px;
  display: flex;
  align-items: center;

  @media (max-width: ${MEDIA_BREAK}px) {
    margin-top: 16px;
  }
`;

export const CommunityName = styled.h5`
  font-size: 18px;
  font-weight: 500;
  margin-left: 16px;
  color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};

  ${Truncate};
`;

export const ChannelName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  margin-left: 32px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};

  @media (max-width: ${MEDIA_BREAK}px) {
    margin-left: 0;
  }
`;

export const ChannelDescription = styled.h4`
  font-size: 18px;
  font-weight: 400;
  margin-left: 32px;
  margin-bottom: 16px;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};

  @media (max-width: ${MEDIA_BREAK}px) {
    margin-left: 0;
  }
`;

export const MetadataContainer = styled.div`
  margin-left: 32px;

  @media (max-width: ${MEDIA_BREAK}px;) {
    margin-left: 8px;
  }
`;

export const FeedsContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
`;
