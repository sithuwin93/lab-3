// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getCommunityById,
  type GetCommunityType,
} from 'shared/graphql/queries/community/getCommunity';
import { Loading } from 'src/components/loading';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from 'src/components/viewNetworkHandler';
import {
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { Link } from 'react-router-dom';
import { TextButton, OutlineButton } from 'src/components/button';
import enableCommunityWatercooler from 'shared/graphql/mutations/community/enableCommunityWatercooler';
import disableCommunityWatercooler from 'shared/graphql/mutations/community/disableCommunityWatercooler';
import { addToastWithTimeout } from 'src/actions/toasts';
import type { Dispatch } from 'redux';
import type { History } from 'react-router';
import { ThemedButton } from 'src/components/button-new';
import { useTranslation } from 'react-i18next';

type Props = {
  data: {
    community: GetCommunityType,
  },
  ...$Exact<ViewNetworkHandlerType>,
  enableCommunityWatercooler: Function,
  disableCommunityWatercooler: Function,
  dispatch: Dispatch<Object>,
  history: History,
};

const Watercooler = (props: Props) => {
  // $FlowIssue
  const { t } = useTranslation(['common','communitySettings']);

  const [saving, setSaving] = React.useState(false);
  const {
    dispatch,
    data: { community },
    isLoading,
  } = props;

  const enable = () => {
    setSaving(true);
    props
      .enableCommunityWatercooler({
        id: community.id,
      })
      .then(() => {
        setSaving(false);
        dispatch(addToastWithTimeout('success', t('communitySettings:OpenChatEnabled')));
      });
  };

  const disable = () => {
    setSaving(true);
    props
      .disableCommunityWatercooler({
        id: community.id,
      })
      .then(() => {
        dispatch(addToastWithTimeout('neutral', t('communitySettings:OpenChatDisabled')));
        setSaving(false);
      });
  };

  if (community) {
    const buttonLabel =
      community && community.watercoolerId ? 'Disable' : 'Enable';
    return (
      <SectionCard elevation="e200" data-cy="community-settings-branded-login">
        <SectionTitle>{t('communitySettings:OpenChat')}</SectionTitle>
        <SectionSubtitle>
          {t('communitySettings:DisplayAnOpenChatFeedOnYourCommunitysProfile')}
        </SectionSubtitle>
        <SectionCardFooter>
          {community && community.watercoolerId && (
            <Link
              style={{ marginRight: '8px' }}
              to={`/${community.slug}?tab=chat`}
            >
              <ThemedButton
                appearance="subtle">
                {t('communitySettings:GoToOpenChat')}
              </ThemedButton>
              {/* <TextButton>Go to open chat</TextButton> */}
            </Link>
          )}
          {/* <OutlineButton
            loading={saving}
            onClick={community.watercoolerId ? disable : enable}
            type="submit"
          >
            {saving ? 'Saving...' : buttonLabel}
          </OutlineButton> */}
          <ThemedButton
            isLoading={saving}
            onClick={community.watercoolerId ? disable : enable}
            type="submit">
            {saving ? t('Saving') : buttonLabel}
          </ThemedButton>
        </SectionCardFooter>
      </SectionCard>
    );
  }

  if (isLoading) {
    return (
      <SectionCard elevation="e200">
        <Loading />
      </SectionCard>
    );
  }

  return null;
};

export default compose(
  getCommunityById,
  viewNetworkHandler,
  enableCommunityWatercooler,
  disableCommunityWatercooler,
  withRouter,
  connect()
)(Watercooler);
