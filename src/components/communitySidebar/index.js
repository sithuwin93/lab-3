// @flow
import React from 'react';
import { SidebarSection } from 'src/views/community/style';
import { TeamMembersList } from 'src/views/community/components/teamMembersList';
import { ChannelsList } from 'src/views/community/components/channelsList';
import { CommunityProfileCard } from 'src/components/entities';
import { ErrorBoundary } from 'src/components/error';

type Props = {
  community: Object,
};

export default ({ community }: Props) => (
  <React.Fragment>
    <SidebarSection elevation="e200">
      <CommunityProfileCard community={community} />
    </SidebarSection>

    <ErrorBoundary>
      <SidebarSection elevation="e200">
        <ChannelsList id={community.id} communitySlug={community.slug} />
      </SidebarSection>
    </ErrorBoundary>

    <ErrorBoundary>
      <SidebarSection elevation="e200">
        <TeamMembersList
          community={community}
          id={community.id}
          first={100}
          filter={{ isModerator: true, isOwner: true }}
        />
      </SidebarSection>
    </ErrorBoundary>
  </React.Fragment>
);
