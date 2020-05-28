import styled from 'styled-components';
import theme from 'shared/theme';
import { Link } from 'react-router-dom';
import { FlexCol, FlexRow, Transition, Gradient, zIndex } from '../globals';
import { themed } from 'src/components/theme';

export const StyledThreadFeedCard = styled.div`
  padding: 16px;
  transition: ${Transition.hover.off};

  &:hover {
    background-color: ${() => themed({ light: theme.bg.wash, dark: theme.bgd.wash})};
  }
  
  &:first-of-type {
    border-top: 2px: ${themed({ light:theme.bg.default , dark:theme.bgd.default })};
  }
`;

export const CardLink = styled(Link)`
  position: absolute;
  display: inline-block;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.card};
`;

export const CardContent = styled(FlexCol)`
  align-self: flex-start;
  position: relative;
  z-index: ${zIndex.card + 1};
  align-items: flex-start;
  pointer-events: none;
  width: 100%;
`;

export const Title = styled.h2`
  font-weight: 800;
  font-size: 20px;
  line-height: 1.2;
  flex: 0 0 auto;
  color: ${() => themed({ light:theme.text.default , dark: theme.textd.default})};
  pointer-events: all;
`;

export const MessageCount = styled(FlexRow)`
  align-self: flex-end;
  align-items: center;
  justify-content: flex-start;

  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  vertical-align: middle;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};

  div {
    margin-right: 4px;
  }
`;

export const AuthorName = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
  line-height: 1;
`;

export const ThreadContext = styled(FlexRow)`
  align-items: center;
  margin-bottom: 8px;
`;

export const ThreadContextAvatar = styled(FlexRow)`
  margin-right: 8px;
  align-items: center;
`;

export const ThreadContextMeta = styled(FlexCol)`
  justify-content: space-between;
  align-items: flex-start;
`;

export const Meta = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  vertical-align: middle;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  div {
    margin-right: 4px;
  }
`;

export const MetaNew = styled(Meta)`
  color: ${() => themed({ light: theme.success.default, dark:theme.successd.default })};
  align-self: flex-end;
`;

export const Location = styled.span`
  display: inline-block;
  flex: 0 0 auto;
  font-size: 13px;
  font-weight: 500;
  color: ${() => themed({ light: theme.text.alt, dark:theme.textd.alt })};
  line-height: 1;
  margin-bottom: 2px;

  > a {
    pointer-events: all;
  }

  > a:hover {
    color: ${() => themed({ light: theme.brand.alt, dark:theme.brandd.alt })};
    text-decoration: underline;
  }
`;

export const Lock = styled.span`
  position: relative;
  color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  top: 1px;
`;

export const Pinned = styled.span`
  position: absolute;
  top: -16px;
  right: -16px;
  width: 64px;
  height: 64px;
  overflow: hidden;
`;

export const PinnedBanner = styled.span`
  position: absolute;
  width: 72px;
  height: 72px;
  background-color: ${() => themed({ light:theme.special.default , dark:theme.speciald.default })};
  background-image: ${props =>
    themed({ 
      light:Gradient(props.theme.special.alt, props.theme.special.default) ,
       dark: Gradient(props.theme.speciald.alt, props.theme.speciald.default)})
    };
  transform: rotate(45deg);
  top: -36px;
  right: -36px;
`;

export const PinnedIconWrapper = styled.span`
  position: relative;
  right: -36px;
  top: 4px;
  color: ${() => themed({ light: theme.text.reverse, dark:theme.text.reverse })};
`;

export const ParticipantHeads = styled(FlexRow)`
  align-items: center;

  > *:not(:first-child) {
    margin-left: 4px;
    pointer-events: auto;
  }
`;

export const ParticipantCount = styled.span`
  display: inline-block;
  border-radius: 100%;
  height: 32px;
  width: 32px;
  color: ${() => themed({ light:theme.text.reverse , dark:theme.textd.reverse })};
  background-color: ${() => themed({ light: theme.text.alt, dark: theme.textd.alt})};
  font-size: 11px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  text-overflow: clip;
`;

export const Author = styled.div`
  padding: 2px;
  border-radius: 100%;
  border: 2px solid ${themed({ light:theme.brand.alt , dark: theme.brandd.alt})};
  pointer-events: all;
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;

  > div:after,
  > a > div:after {
    right: -3px;
    bottom: -2px;
  }
`;

export const ContentInfo = styled(FlexRow)`
  margin-top: 8px;
  justify-content: space-between;
  flex: none;
  align-self: stretch;
  align-items: center;
`;
