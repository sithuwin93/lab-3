// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { ChannelInfoType } from 'shared/graphql/fragments/channel/channelInfo';
import {
  OutlineButton,
  PrimaryOutlineButton,
  HoverWarnOutlineButton,
} from 'src/components/button';
import JoinChannel from 'src/components/joinChannelWrapper';
import LeaveChannel from 'src/components/leaveChannelWrapper';
import { ActionsRowContainer } from '../style';
import { ThemedButton } from 'src/components/button-new';
import Icon from 'src/components/icon';

type Props = {
  channel: ChannelInfoType,
};

export const UnconnectedChannelActions = (props: Props) => {
  const { channel } = props;
  const { community } = channel;
  const { isOwner, isModerator } = community.communityPermissions;
  const isTeamMember = isOwner || isModerator;
  const { channelPermissions } = channel;

  if (channelPermissions.isMember) {
    return (
      <ActionsRowContainer>
        {isTeamMember && (
          // <OutlineButton
          //   data-cy="channel-settings-button"
          //   to={`/${community.slug}/${channel.slug}/settings`}
          // >
          //   Settings
          // </OutlineButton>
          <ThemedButton
            type='link'
            data-cy="channel-settings-button"
            to={`/${community.slug}/${channel.slug}/settings`}>
            Settings
          </ThemedButton>
        )}

        <LeaveChannel
          channel={channel}
          render={({ isLoading, isHovering }) => (
            // <HoverWarnOutlineButton isLoading={isLoading} icon={'door-enter'}>
            //   {isLoading
            //     ? 'Leaving...'
            //     : isHovering
            //     ? 'Leave channel'
            //     : 'Member'}
            // </HoverWarnOutlineButton>
            <ThemedButton
              isLoading={isLoading}
              appearance="danger">
                <Icon 
                  style={{
                      position: 'relative',
                      top: 6,
                      left: 5,
                      marginRight: 8
                  }}
                  glyph={'door-enter'} 
                  size={24} />
              {isLoading
                ? 'Leaving...'
                : isHovering
                ? 'Leave channel'
                : 'Member'}
            </ThemedButton>
          )}
        />
      </ActionsRowContainer>
    );
  }

  return (
    <ActionsRowContainer>
      {isTeamMember && (
        // <OutlineButton to={`/${community.slug}/${channel.slug}/settings`}>
        //   Settings
        // </OutlineButton>
        <ThemedButton 
          type="link"
          to={`/${community.slug}/${channel.slug}/settings`}>
          Settings
        </ThemedButton>
      )}

      <JoinChannel
        channel={channel}
        render={({ isLoading }) => (
          <ThemedButton 
            appearance="primary"
            isLoading={isLoading}>
            <Icon 
              style={{
                position: 'relative',
                top: 6,
                left: 5,
                marginRight: 8
              }}
              glyph={'door-enter'} 
              size={24} />
            {isLoading ? 'Joining...' : 'Join channel'}
          </ThemedButton>
          // <PrimaryOutlineButton isLoading={isLoading} icon={'door-enter'}>
          //   {isLoading ? 'Joining...' : 'Join channel'}
          // </PrimaryOutlineButton>
        )}
      />
    </ActionsRowContainer>
  );
};

export const ChannelActions = connect()(UnconnectedChannelActions);
