// @flow
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AvatarImage from 'src/components/avatar/image';
import { Link } from 'react-router-dom';
import { Button, OutlineButton } from 'src/components/button';
import ToggleChannelMembership from 'src/components/toggleChannelMembership';
import renderTextWithLinks from 'src/helpers/render-text-with-markdown-links';
import type { GetChannelType } from 'shared/graphql/queries/channel/getChannel';
import type { Dispatch } from 'redux';
import { withCurrentUser } from 'src/components/withCurrentUser';
import {
  HoverWrapper,
  ProfileCard,
  ChannelCommunityRow,
  ChannelCommunityLabel,
  Content,
  Title,
  Description,
  Actions,
} from './style';
import { ThemedButton } from 'src/components/button-new';

type ProfileProps = {
  channel: GetChannelType,
  dispatch: Dispatch<Object>,
  currentUser: ?Object,
  ref: (?HTMLElement) => void,
  style: CSSStyleDeclaration,
};

class HoverProfile extends Component<ProfileProps> {
  render() {
    const { channel, ref, style } = this.props;

    const {
      isOwner: isChannelOwner,
      isMember: isChannelMember,
    } = channel.channelPermissions;
    const { communityPermissions } = channel.community;
    const {
      isOwner: isCommunityOwner,
      isModerator: isCommunityModerator,
    } = communityPermissions;
    const isGlobalOwner = isChannelOwner || isCommunityOwner;
    const isGlobalModerator = isCommunityModerator;

    return (
      <HoverWrapper popperStyle={style} ref={ref}>
        <ProfileCard>
          <ChannelCommunityRow to={`/${channel.community.slug}`}>
            <AvatarImage
              size={24}
              src={channel.community.profilePhoto}
              type={'community'}
              alt={channel.community.name}
            />
            <ChannelCommunityLabel>
              {channel.community.name}
            </ChannelCommunityLabel>
          </ChannelCommunityRow>

          <Content>
            <Link to={`/${channel.community.slug}/${channel.slug}`}>
              <Title>{channel.name}</Title>
            </Link>
            {channel.description && (
              <Description>
                {renderTextWithLinks(channel.description)}
              </Description>
            )}
          </Content>

          <Actions>
            {!isGlobalModerator && !isGlobalOwner && (
              <ToggleChannelMembership
                channel={channel}
                render={state => {
                  if (isChannelMember) {
                    return (
                      // <OutlineButton
                      //   isMember={true}
                      //   icon={'checkmark'}
                      //   loading={state.isLoading}
                      // >
                      //   {state.isLoading ? 'Leaving...' : 'Joined'}
                      // </OutlineButton>
                      <ThemedButton
                        isMember={true}
                        isLoading={state.isLoading}>
                        <Icon 
                          style={{
                            position: 'relative',
                            top: 6,
                            left: 5,
                            marginRight: 8
                          }}
                          glyph={'checkmark'} 
                          size={24} />
                        {state.isLoading ? 'Leaving...' : 'Joined'}
                      </ThemedButton>

                    );
                  } else {
                    return (
                      <Button loading={state.isLoading}>
                        {state.isLoading ? 'Joining...' : 'Join channel'}
                      </Button>
                    );
                  }
                }}
              />
            )}

            {(isGlobalModerator || isGlobalOwner) && (
              <Link to={`/${channel.community.slug}/${channel.slug}/settings`}>
                {/* <OutlineButton icon={'settings'}>Settings</OutlineButton> */}
                <ThemedButton>
                  <Icon 
                    style={{
                      position: 'relative',
                      top: 6,
                      left: 5,
                      marginRight: 8
                    }}
                    glyph={'settings'} 
                    size={24} />
                  Settings
                </ThemedButton>
              </Link>
            )}
          </Actions>
        </ProfileCard>
      </HoverWrapper>
    );
  }
}

export default compose(
  withCurrentUser,
  withRouter,
  connect()
)(HoverProfile);
