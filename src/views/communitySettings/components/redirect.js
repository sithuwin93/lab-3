// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { type GetCommunityType } from 'shared/graphql/queries/community/getCommunity';
import {
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { OutlineButton } from 'src/components/button';
import toggleCommunityRedirect from 'shared/graphql/mutations/community/toggleCommunityRedirect';
import toggleCommunityNoindex from 'shared/graphql/mutations/community/toggleCommunityNoindex';
import { addToastWithTimeout } from 'src/actions/toasts';
import type { Dispatch } from 'redux';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  community: GetCommunityType,
  toggleCommunityRedirect: Function,
  toggleCommunityNoindex: Function,
  dispatch: Dispatch<Object>,
  t: i18n.TFunction
};

type State = {
  isLoadingRedirect: boolean,
  isLoadingNoindex: boolean,
};

class RedirectSettings extends React.Component<Props, State> {
  state = {
    isLoadingRedirect: false,
    isLoadingNoindex: false,
  };

  toggleRedirect = e => {
    e.preventDefault();

    this.setState({
      isLoadingRedirect: true,
    });

    return this.props
      .toggleCommunityRedirect(this.props.community.id)
      .then(() => {
        this.setState({ isLoadingRedirect: false });
        return this.props.dispatch(
          addToastWithTimeout('success', 'Community redirect setting saved')
        );
      })
      .catch(err => {
        this.setState({ isLoadingRedirect: false });
        return this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  toggleNoindex = e => {
    e.preventDefault();

    this.setState({
      isLoadingNoindex: true,
    });

    return this.props
      .toggleCommunityNoindex(this.props.community.id)
      .then(() => {
        this.setState({ isLoadingNoindex: false });
        return this.props.dispatch(
          addToastWithTimeout('success', t('communitySettings:CommunitySettingSaved'))
        );
      })
      .catch(err => {
        this.setState({ isLoadingNoindex: false });
        return this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  render() {
    const { community,t } = this.props;

    if (community) {
      return (
        <SectionCard elevation="e200" data-cy="community-settings-redirect">
          <SectionTitle>{t('communitySettings:MigrateYourCommunityElsewhere')}</SectionTitle>
          <SectionSubtitle style={{ marginTop: '8px' }}>
            {t('communitySettings:MigrateYourCommunityElsewhereDescription1')}
          </SectionSubtitle>
          <SectionSubtitle style={{ marginTop: '8px' }}>
            {t('communitySettings:MigrateYourCommunityElsewhereDescription2')}            
          </SectionSubtitle>
          <SectionSubtitle style={{ marginTop: '8px' }}>
            {/* {t('communitySettings:MigrateYourCommunityElsewhereDescription3')} */}
            We recommend redirecting to a page that explains why users were
            redirected from Spectrum. For example, you can include a query param
            in your community website setting (e.g.{' '}
            <code>community.acme.com/?spectrum=true</code>) to show a special
            notice to users arriving there.
          </SectionSubtitle>
          <SectionCardFooter>
            {/* <OutlineButton
              disabled={this.state.isLoadingRedirect}
              onClick={this.toggleRedirect}
              style={{ alignSelf: 'flex-start' }}
            >
              {this.state.isLoadingRedirect
                ? 'Loading...'
                : this.props.community.redirect
                ? 'Disable'
                : 'Enable'}
            </OutlineButton> */}
            <ThemedButton
              isDisabled={this.state.isLoadingRedirect}
              onClick={this.toggleRedirect}
              style={{ alignSelf: 'flex-start' }}
            >
              {this.state.isLoadingRedirect
                ? t('Loading')
                : this.props.community.redirect
                ? t('Disable')
                : t('Enable')}
            </ThemedButton>
          </SectionCardFooter>
          {this.props.community.redirect && (
            <React.Fragment>
              <SectionCardFooter
                style={{ marginTop: '24px', paddingTop: '24px' }}
              >
                <SectionSubtitle>
                  {t('communitySettings:OptionalPreventThreadsInMyCommunityFromBeingIndexed')}
                </SectionSubtitle>
              </SectionCardFooter>
              <SectionCardFooter style={{ borderTop: '0', paddingTop: '0' }}>
                {/* <OutlineButton
                  disabled={this.state.isLoadingNoindex}
                  onClick={this.toggleNoindex}
                  style={{ alignSelf: 'flex-start' }}
                >
                  {this.state.isLoadingNoindex
                    ? 'Loading...'
                    : this.props.community.noindex
                    ? 'Disable'
                    : 'Enable'}
                </OutlineButton> */}
                <ThemedButton
                  isDisabled={this.state.isLoadingNoindex}
                  onClick={this.toggleNoindex}
                  style={{ alignSelf: 'flex-start' }}>
                  {this.state.isLoadingNoindex
                    ? t('Loading')
                    : this.props.community.noindex
                    ? t('Disable')
                    : t('Enable')}
                </ThemedButton>
              </SectionCardFooter>
            </React.Fragment>
          )}
        </SectionCard>
      );
    }

    return null;
  }
}

export default compose(
  toggleCommunityRedirect,
  toggleCommunityNoindex,
  connect()
)(withTranslation(['common','communitySettings'])(RedirectSettings));
