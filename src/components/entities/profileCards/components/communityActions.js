// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { CommunityInfoType } from 'shared/graphql/fragments/community/communityInfo';
// import { PrimaryButton, OutlineButton } from 'src/components/button';
import { openModal } from 'src/actions/modals';
import JoinCommunity from 'src/components/joinCommunityWrapper';
import { ActionsRowContainer } from '../style';
import { ThemedButton } from 'src/components/button-new';
import Icon from 'src/components/icon';

type Props = {
  community: CommunityInfoType,
  dispatch: Dispatch<Object>,
};

export const UnconnectedCommunityActions = (props: Props) => {
  const { community, dispatch } = props;

  const [isHovering, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  const leaveCommunity = () =>
    dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: community.id,
        entity: 'team-member-leaving-community',
        message: 'Are you sure you want to leave this community?',
        buttonLabel: 'Leave Community',
      })
    );

  const { isMember, isOwner, isModerator } = community.communityPermissions;
  const isTeamMember = isOwner || isModerator;

  if (isMember) {
    return (
      <ActionsRowContainer>
        {isTeamMember && (
          // <OutlineButton to={`/${community.slug}/settings`}>
          //   Settings
          // </OutlineButton>
          <ThemedButton
            to={`/${community.slug}/settings`}
            type="link"
            shouldFitContainer
            appearance="default">
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
        )}

        {!isOwner && (
          // <OutlineButton
          //   onMouseEnter={onMouseEnter}
          //   onMouseLeave={onMouseLeave}
          //   onClick={leaveCommunity}
          //   data-cy="leave-community-button"
          // >
          //   {isHovering ? 'Leave community' : 'Member'}
          // </OutlineButton>
          <ThemedButton
            shouldFitContainer
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={leaveCommunity}
            data-cy="leave-community-button">
            {isHovering ? 'Leave community' : 'Member'}
          </ThemedButton>
        )}
      </ActionsRowContainer>
    );
  }

  return (
    <ActionsRowContainer>
      <JoinCommunity
        community={community}
        render={({ isLoading }) => (
          // <PrimaryButton
          //   data-cy="profile-join-button"
          //   isLoading={isLoading}
          //   icon={'door-enter'}
          // >
          //   {isLoading ? 'Joining...' : 'Join community'}
          // </PrimaryButton>
          <ThemedButton
            shouldFitContainer
            data-cy="profile-join-button"
            isLoading={isLoading}
            appearance="primary">
            <Icon 
              style={{
                  position: 'relative',
                  top: 6,
                  left: 5,
                  marginRight: 8
              }}
              glyph={'door-enter'} 
              size={24} />

            {isLoading ? 'Joining...' : 'Join community'}
          </ThemedButton>

        )}
      />
    </ActionsRowContainer>
  );
};

export const CommunityActions = connect()(UnconnectedCommunityActions);
