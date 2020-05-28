// @flow
import styled, { css } from 'styled-components';
import theme from 'shared/theme';
import { Link } from 'react-router-dom';
import { Truncate, tint } from 'src/components/globals';
import { MEDIA_BREAK } from 'src/components/layout';
import { CardStyles } from 'src/views/viewHelpers';
import { themed } from 'src/components/theme';

const listItemStyles = css`
  padding: 12px 12px 12px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${themed({ light: theme.bg.divider, dark:theme.bgd.divider })};

  &:last-of-type {
    border-bottom: 0;
  }

  &:hover {
    background: ${() => themed({ light: theme.bg.wash, dark:theme.bgd.wash })};
  }

  .icon {
    color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  }
`;
export const ListItem = styled.div`
  ${listItemStyles};
`;
export const ListItemLink = styled(Link)`
  ${listItemStyles};
`;

export const ListItemContent = styled.div`
  display: flex;
  align-items: center;

  .icon {
    color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
    margin-right: 6px;
    position: relative;
    top: 1px;
  }
`;

export const ListItemLabel = styled.div`
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  vertical-align: middle;
  display: flex;
  align-items: center;
  display: inline-block;
  ${Truncate};
`;

export const SidebarSection = styled.section`
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  border: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  margin-top: 24px;
  border-radius: 4px;

  @media (max-width: ${MEDIA_BREAK}px) {
    border: 0;
    margin-top: 0;

    &:last-of-type {
      border-bottom: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
    }

    &:not(:first-of-type) {
      border-top: 1px solid ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
    }
  }
`;

export const SidebarSectionHeader = styled.div`
  display: flex;
  border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  position: sticky;
  top: 0;
  background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  z-index: 11;
  border-radius: 4px 4px 0 0;

  a {
    display: flex;
    flex: none;
    align-items: center;
    color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};

    &:hover {
      color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
    }
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    z-index: 1;
    background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
    border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    padding: 24px 16px 8px 16px;
    position: relative;
  }
`;

export const SidebarSectionHeading = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};
  display: flex;
  flex: 1 0 auto;
  padding-right: 16px;

  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 14px;
    font-weight: 600;
    color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
  }
`;

export const FeedsContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: ${() => themed({ light:theme.bg.default , dark: theme.bgd.default})};
`;

export const Row = styled.div`
  display: flex;
`;

export const ToggleNotificationsContainer = styled.div`
  display: flex;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

export const Name = styled.div`
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  vertical-align: middle;
  display: flex;
  align-items: center;
  display: inline-block;
  ${Truncate};
`;

export const NameWarn = styled.div`
  color: ${() => themed({ light: theme.warn.default, dark:theme.warnd.default })};
  font-size: 15px;
  font-weight: 500;
  line-height: 1.2;
  vertical-align: middle;
  display: flex;
  align-items: center;
  display: inline-block;
  ${Truncate};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
`;

export const PrivateCommunityWrapper = styled.div`
  ${CardStyles};
  padding: 16px;
`;

export const ActionsRow = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 32px;

  button {
    display: flex;
    flex: 1 0 auto;
    width: 100%;
  }
`;

export const Emoji = styled.span`
  font-size: 40px;
  margin-bottom: 16px;
`;

export const Heading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};
`;
export const Description = styled.p`
  margin-top: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
`;

export const PostsFeedsSelectorContainer = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid ${themed({ light:theme.bg.border , dark: theme.bgd.border})};
  background: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  display: flex;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  font-size: 15px;
  border: none;
  border: 1px solid ${themed({ light:theme.bg.border , dark:theme.bgd.border })};
  -webkit-appearance: none;
  border-radius: 32px;
  padding: 8px 16px;
  color: ${() => themed({ light:theme.text.default , dark:theme.textd.default })};
  font-weight: 600;
  width: 100%;
  max-width: 240px;
  transition: all 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })}, 0 0 0 4px ${themed({ light: theme.bg.border, dark:theme.bgd.border })};
    transition: all 0.2s ease-in-out;
  }

  &:active {
    box-shadow: 0 0 0 2px ${themed({ light:theme.bg.default , dark:theme.bgd.default })},
      0 0 0 4px ${themed({ light:tint(theme.bg.border, -24) , dark: tint(theme.bgd.border, -24)})})
    transition: box-shadow 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    font-size: 16px;
  }
`;

export const FeedsStretch = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;

  display: grid;
  grid-template-columns: minmax(min-content, 1fr);
  grid-template-rows: 1fr;
  width: 100%;
  align-items: flex-end;

  @media (max-width: ${MEDIA_BREAK}px) {
    /* account for fixed position chat input */
    padding-bottom: 56px;
    grid-template-rows: 1fr;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${() => themed({ light:theme.bg.wash , dark:theme.bgd.wash })};
  padding-bottom: 64px;
`;

export const NewActivityDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: ${() => themed({ light: theme.warn.default, dark:theme.warnd.default })};
  align-self: center;
  margin-right: 16px;
`;
