// @flow
import React from 'react';
import compose from 'recompose/compose';
import type { CommunityInfoType } from 'shared/graphql/fragments/community/communityInfo';
import type { ChannelInfoType } from 'shared/graphql/fragments/channel/channelInfo';
import type { UserInfoType } from 'shared/graphql/fragments/user/userInfo';
import Icon from 'src/components/icon';
import {
  WhiteIconButton,
  PrimaryButton,
  OutlineButton,
} from 'src/components/button';
import InitDirectMessageWrapper from 'src/components/initDirectMessageWrapper';
import getComposerLink from 'src/helpers/get-composer-link';
import JoinChannel from 'src/components/joinChannelWrapper';
import JoinCommunity from 'src/components/joinCommunityWrapper';
import { withCurrentUser } from 'src/components/withCurrentUser';
import { ThemedButton } from 'src/components/button-new';

type CommunityProps = {
  community: CommunityInfoType,
};

export const MobileCommunityAction = (props: CommunityProps) => {
  const { community } = props;
  const { isMember } = community.communityPermissions;
  const { pathname, search } = getComposerLink({ communityId: community.id });

  if (isMember) {
    return (
      <ThemedButton
        type='link'
        to={{pathname,search}}
        spacing="compact">
        New post
      </ThemedButton>
      // <OutlineButton
      //   size={'small'}
      //   to={{
      //     pathname,
      //     search,
      //   }}
      // >
      //   New post
      // </OutlineButton>
    );
  }

  return (
    <JoinCommunity
      community={community}
      render={({ isLoading }) => (
        // <PrimaryButton size={'small'} isLoading={isLoading}>
        //   {isLoading ? 'Joining...' : 'Join'}
        // </PrimaryButton>
        <ThemedButton
          appearance="primary"
          isLoading={isLoading}
          spacing="compact">
          {isLoading ? 'Joining...' : 'Join'}
        </ThemedButton>
      )}
    />
  );
};

type ChannelProps = {
  channel: ChannelInfoType,
};

export const MobileChannelAction = (props: ChannelProps) => {
  const { channel } = props;
  const { isMember } = channel.channelPermissions;
  const { pathname, search } = getComposerLink({
    communityId: channel.community.id,
    channelId: channel.id,
  });

  if (isMember) {
    return (
      // <OutlineButton
      //   size={'small'}
      //   to={{
      //     pathname,
      //     search,
      //   }}
      // >
      //   New post
      // </OutlineButton>
      <ThemedButton
        spacing="compact"
        type='link'
        to={{ pathname,search }}>
        New post
      </ThemedButton>
    );
  }

  return (
    <JoinChannel
      channel={channel}
      render={({ isLoading }) => (
        // <PrimaryButton size={'small'} isLoading={isLoading}>
        //   {isLoading ? 'Joining...' : 'Join'}
        // </PrimaryButton>
        <ThemedButton
          appearance="primary"
          spacing="compact"
          isLoading={isLoading}>
          {isLoading ? 'Joining...' : 'Join'}
        </ThemedButton>
      )}
    />
  );
};

type UserProps = {
  user: UserInfoType,
  currentUser: ?UserInfoType,
};

const User = (props: UserProps) => {
  const { user, currentUser } = props;

  if (currentUser && currentUser.id === user.id) {
    return (
      // <OutlineButton
      //   size={'small'}
      //   to={`/users/${currentUser.username}/settings`}
      // >
      //   Settings
      // </OutlineButton>
      <ThemedButton
        type='link'
        spacing="compact"
        to={`/users/${currentUser.username}/settings`}>
        Settings
      </ThemedButton>
    );
  }

  return (
    <InitDirectMessageWrapper
      user={user}
      render={
        <WhiteIconButton>
          <Icon glyph={'message-simple-new'} size={28} />
        </WhiteIconButton>
      }
    />
  );
};

export const MobileUserAction = compose(withCurrentUser)(User);
