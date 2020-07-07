// @flow
import styled from 'styled-components';
import theme from 'shared/theme';
import { Truncate } from 'src/components/globals';
import { MEDIA_BREAK, MAX_SECONDARY_COLUMN_WIDTH } from 'src/components/layout';
import { themed, elevation as AkElevations, } from 'src/components/theme';
const elevations = { ...AkElevations };

export const ProfileContainer = styled.div`
  ${({ elevation }) => elevations[elevation]}
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  @media (max-width: ${MEDIA_BREAK}px) {
    border-radius: 0;
    margin-top: 0;
    border: 0;
  }
`;

export const CoverPhoto = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${MAX_SECONDARY_COLUMN_WIDTH / 3}px;
  max-height: ${MAX_SECONDARY_COLUMN_WIDTH / 3}px;
  background-color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  overflow: hidden;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  border-radius: 20px 20px 0 0;

  @media (max-width: ${MEDIA_BREAK}px) {
    border-radius: 0;
  }
`;

export const ProfileAvatarContainer = styled.div`
  position: relative;
  top: -36px;
  width: 68px;
  height: 68px;
  margin-left: 12px;
  border-radius: 10px;
  background: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  border: 4px solid ${themed({ light: theme.bg.default, dark:theme.bgd.default })};
  margin-bottom: -44px;
`;

export const RoundProfileAvatarContainer = styled.div`
  position: relative;
  top: -36px;
  width: 68px;
  height: 68px;
  margin-left: 12px;
  border-radius: 34px;
  background: ${() => themed({ light: theme.bg.default, dark: theme.bgd.default})};
  border: 4px solid ${themed({ light:theme.bg.default , dark: theme.bgd.default})};
  margin-bottom: -48px;
`;

export const ActionsRowContainer = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 12px;
  padding: 16px 16px 20px;
  margin-top: 8px;

  button {
    flex: 1;
  }

  @media (max-width: ${MEDIA_BREAK}px) {
    border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
    margin-top: 0;
    padding-bottom: 16px;
  }
`;

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin-top: 16px;
`;

export const Name = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
  word-break: break-word;
  line-height: 1.2;
`;

export const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.4;
  color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
  word-break: break-word;

  a {
    color: ${() => themed({ light:theme.text.default , dark: theme.textd.default})};
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const MetaLinksContainer = styled.div`
  margin-top: 4px;
`;

export const MetaRow = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 400;
  color: ${() => themed({ light: theme.text.secondary, dark: theme.textd.secondary})};
  align-items: center;
  margin-top: 8px;
  word-break: break-word;

  &:first-of-type {
    margin-top: 8px;
  }

  a {
    display: flex;
    align-items: center;
  }

  a:hover {
    color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  }

  .icon {
    margin-right: 8px;
  }
`;

export const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${() => themed({ light: theme.success.default, dark: theme.successd.default})};
  margin-right: 16px;
  margin-left: 6px;
`;

export const ChannelCommunityMetaRow = styled.div`
  display: flex;
  padding: 16px;
  margin-bottom: -12px;
  align-items: center;
  border-bottom: 1px solid ${themed({ light: theme.bg.border, dark: theme.bgd.border})};
  background: transparent;

  &:hover {
    background: ${() => themed({ light:theme.bg.wash , dark:theme.bgd.wash })};
  }
`;

export const ChannelCommunityName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  margin-left: 16px;
  ${Truncate};
`;

export const Username = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  margin-bottom: 4px;
  word-break: break-all;
  margin-top: 2px;
`;
