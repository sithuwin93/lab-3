// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { addToastWithTimeout } from 'src/actions/toasts';
import {
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { Notice } from 'src/components/listItems/style';
import {
  getCurrentUserCommunityConnection,
  type GetUserCommunityConnectionType,
} from 'shared/graphql/queries/user/getUserCommunityConnection';
import viewNetworkHandler from 'src/components/viewNetworkHandler';
import {
  HoverWarnOutlineButton,
  WarnButton,
  OutlineButton,
} from 'src/components/button';
import deleteCurrentUserMutation from 'shared/graphql/mutations/user/deleteCurrentUser';
import { SERVER_URL } from 'src/api/constants';
import { Link } from 'react-router-dom';
import { Loading } from 'src/components/loading';
import type { Dispatch } from 'redux';
import { ThemedButton } from 'src/components/button-new';
import Icon from 'src/components/icon';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type State = {
  isLoading: boolean,
  deleteInited: boolean,
  ownsCommunities: boolean,
};

type Props = {
  isLoading: boolean,
  deleteCurrentUser: Function,
  dispatch: Dispatch<Object>,
  data: {
    user: GetUserCommunityConnectionType,
  },
  t: i18n.TFunction
};

class DeleteAccountForm extends React.Component<Props, State> {
  state = {
    isLoading: false,
    deleteInited: false,
    ownsCommunities: false,
  };

  componentDidUpdate(prevProps) {
    const curr = this.props;
    if (!prevProps.data.user && curr.data.user && curr.data.user.id) {
      if (curr.data.user && curr.data.user.communityConnection) {
        return this.setState({
          ownsCommunities: curr.data.user.communityConnection.edges.some(
            c => c && c.node.communityPermissions.isOwner
          ),
        });
      }
    }
  }

  initDelete = () => {
    this.setState({ deleteInited: true });
  };

  cancelDelete = () => this.setState({ deleteInited: false });

  confirmDelete = () => {
    this.setState({
      isLoading: true,
    });

    this.props
      .deleteCurrentUser()
      .then(() =>
        this.props.dispatch(addToastWithTimeout('success', this.props.t('usersSettings:AccountDeleted')))
      )
      .then(() => (window.location.href = `${SERVER_URL}/auth/logout`))
      .catch(err =>
        this.props.dispatch(addToastWithTimeout('error', err.message))
      );
  };

  render() {
    const { isLoading, ownsCommunities, deleteInited } = this.state;
    const {
      data: { user },
      t,
    } = this.props;

    if (user) {
      return (
        <SectionCard elevation="e200" data-cy="delete-account-container">
          <SectionTitle>{t('usersSettings:DeleteMyAccount')}</SectionTitle>
          <SectionSubtitle>
            {t('usersSettings:YouCanDeleteYourAccountAtAnyTime')}{' '}
            <Link to={'/faq'}>{t('usersSettings:ReadMoreAboutHowWeDeleteAccounts')}</Link>.
          </SectionSubtitle>

          {ownsCommunities && (
            <Notice data-cy="owns-communities-notice">
              {t('usersSettings:OwnsCommunitiesDescription')}
            </Notice>
          )}

          <SectionCardFooter>
            {deleteInited ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                {!isLoading && (
                  <ThemedButton
                    shouldFitContainer
                    data-cy="delete-account-cancel-button"
                    onClick={this.cancelDelete}
                    style={{ marginBottom: '16px', alignSelf: 'stretch' }}>
                    {t('Cancel')}
                  </ThemedButton>
                  // <OutlineButton
                  //   data-cy="delete-account-cancel-button"
                  //   onClick={this.cancelDelete}
                  //   style={{ marginBottom: '16px', alignSelf: 'stretch' }}
                  // >
                  //   {t('Cancel')}
                  // </OutlineButton>
                )}
                {/* <WarnButton
                  data-cy="delete-account-confirm-button"
                  loading={isLoading}
                  onClick={this.confirmDelete}
                >
                  {isLoading ? t('Deleting') : t('usersSettings:ConfirmAndDeleteMyAccount')}
                </WarnButton> */}
                <ThemedButton
                  appearance="danger"
                  shouldFitContainer
                  data-cy="delete-account-confirm-button"
                  isLoading={isLoading}
                  onClick={this.confirmDelete}>
                  {isLoading ? t('Deleting') : t('usersSettings:ConfirmAndDeleteMyAccount')}
                </ThemedButton>
              </div>
            ) : (
              // <HoverWarnOutlineButton
              //   data-cy="delete-account-init-button"
              //   color={'warn.default'}
              //   onClick={this.initDelete}
              // >
              //   Delete my account
              // </HoverWarnOutlineButton>
              <ThemedButton
                iconBefore={
                <Icon 
                  glyph={'delete'} 
                  size={24} />            
                }
                appearance="danger"
                onClick={this.initDelete}
                data-cy="delete-account-init-button">
                {t('usersSettings:DeleteMyAccount')}
              </ThemedButton>
            )}
          </SectionCardFooter>
        </SectionCard>
      );
    }

    if (this.props.isLoading) {
      return (
        <SectionCard elevation="e200">
          <Loading />
        </SectionCard>
      );
    }

    return null;
  }
}

export default compose(
  connect(),
  deleteCurrentUserMutation,
  getCurrentUserCommunityConnection,
  viewNetworkHandler
)(withTranslation(['common','usersSettings'])(DeleteAccountForm));
