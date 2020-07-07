// @flow
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getCommunitySettingsByMatch } from 'shared/graphql/queries/community/getCommunitySettings';
import type { GetCommunityType } from 'shared/graphql/queries/community/getCommunity';
import viewNetworkHandler from 'src/components/viewNetworkHandler';
import Head from 'src/components/head';
import Header from 'src/components/settingsViews/header';
import { SegmentedControl, Segment } from 'src/components/segmentedControl';
import { View } from './style';
import type { ContextRouter } from 'react-router';
import { ErrorView, LoadingView } from 'src/views/viewHelpers';
import { ViewGrid } from 'src/components/layout';
import { setTitlebarProps } from 'src/actions/titlebar';
import Analytics from '../communityAnalytics';
import Members from '../communityMembers';
import Overview from './components/overview';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  t: i18n.TFunction,
  data: {
    community: GetCommunityType,
  },
  isLoading: boolean,
  hasError: boolean,
  ...$Exact<ContextRouter>,
};

class CommunitySettings extends React.Component<Props> {
  componentDidMount() {
    const { dispatch, t } = this.props;
    dispatch(
      setTitlebarProps({
        title: t('Settings'),
      })
    );
  }

  render() {
    const {
      data: { community },
      location,
      match,
      isLoading,
      history,
      t
    } = this.props;

    // this is hacky, but will tell us if we're viewing analytics or the root settings view
    const pathname = location.pathname;
    const lastIndex = pathname.lastIndexOf('/');
    const activeTab = pathname.substr(lastIndex + 1);
    const communitySlug = match.params.communitySlug;

    if (community && community.id) {
      const canViewCommunitySettings =
        community.communityPermissions.isOwner ||
        community.communityPermissions.isModerator;

      if (!canViewCommunitySettings) {
        return <ErrorView />;
      }

      const subnavItems = [
        {
          to: `/${community.slug}/settings`,
          label: t('Overview'),
          activeLabel: 'settings',
          isFirst: true,
          isLast: false,
        },
        {
          to: `/${community.slug}/settings/members`,
          label: t('Members'),
          activeLabel: 'members',
          isFirst: false,
          isLast: false,
        },
        {
          to: `/${community.slug}/settings/analytics`,
          label: t('Analytics'),
          activeLabel: 'analytics',
          isFirst: false,
          isLast: true,
        },
      ];

      const subheading = {
        to: `/${community.slug}`,
        label: t('communitySettings:ReturnToCommunity', {name:community.name}),
      };

      const avatar = {
        profilePhoto: community.profilePhoto,
        community,
      };

      let title = community.name + ` ${t('Settings')}`;

      return (
        <React.Fragment>
          <Head title={title} />

          <ViewGrid>
            <View data-cy="community-settings">
              <Header
                avatar={avatar}
                subheading={subheading}
                heading={t('Settings')}
              />

              <SegmentedControl>
                {subnavItems.map(item => (
                  <Segment
                    isFirst={item.isFirst}
                    isLast={item.isLast}
                    key={item.label}
                    to={item.to}
                    isActive={activeTab === item.activeLabel}
                  >
                    {item.label}
                  </Segment>
                ))}
              </SegmentedControl>

              <Switch>
                <Route path={`${match.url}/analytics`}>
                  {() => <Analytics community={community} id={community.id} />}
                </Route>
                <Route path={`${match.url}/members`}>
                  {() => <Members community={community} history={history} />}
                </Route>
                <Route path={`${match.url}`}>
                  {() => (
                    <Overview
                      community={community}
                      communitySlug={communitySlug}
                    />
                  )}
                </Route>
              </Switch>
            </View>
          </ViewGrid>
        </React.Fragment>
      );
    }

    if (isLoading) {
      return <LoadingView />;
    }

    return <ErrorView />;
  }
}

export default compose(
  connect(),
  getCommunitySettingsByMatch,
  viewNetworkHandler
)(withTranslation(['common','communitySettings'])(CommunitySettings));
