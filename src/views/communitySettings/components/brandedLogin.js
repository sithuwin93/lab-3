// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
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
import BrandedLoginToggle from './brandedLoginToggle';
import { TextButton, OutlineButton } from 'src/components/button';
// import { TextArea, Error } from 'src/components/formElements';
import { Error } from 'src/components/formElements';
import saveBrandedLoginSettings from 'shared/graphql/mutations/community/saveBrandedLoginSettings';
import { addToastWithTimeout } from 'src/actions/toasts';
import type { Dispatch } from 'redux';
import { ThemedButton } from 'src/components/button-new';
import TextArea from 'src/components/textarea';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  data: {
    community: GetCommunityType,
  },
  ...$Exact<ViewNetworkHandlerType>,
  saveBrandedLoginSettings: Function,
  dispatch: Dispatch<Object>,
  t: i18n.TFunction
};

type State = {
  messageValue: ?string,
  messageLengthError: boolean,
  isLoading: boolean,
};

class BrandedLogin extends React.Component<Props, State> {
  state = {
    messageValue: null,
    messageLengthError: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    const curr = this.props;
    if (!prevProps.data.community && curr.data.community) {
      return this.setState({
        messageValue: curr.data.community.brandedLogin.message,
      });
    }
  }

  handleChange = e => {
    return this.setState({
      messageValue: e.target.value,
      messageLengthError: e.target.value.length > 280 ? true : false,
    });
  };

  saveCustomMessage = e => {
    e.preventDefault();
    const { messageValue } = this.state;

    if (messageValue && messageValue.length > 280) {
      return this.setState({
        messageLengthError: true,
      });
    }

    this.setState({
      isLoading: true,
    });

    return this.props
      .saveBrandedLoginSettings({
        message: messageValue,
        id: this.props.data.community.id,
      })
      .then(() => {
        this.setState({ messageLengthError: false, isLoading: false });
        return this.props.dispatch(addToastWithTimeout('success', this.props.t('Saved')));
      })
      .catch(err => {
        this.setState({ messageLengthError: false, isLoading: false });
        return this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  render() {
    const {
      data: { community },
      isLoading,
      t
    } = this.props;
    const { messageLengthError } = this.state;

    if (community) {
      const { brandedLogin } = community;
      return (
        <SectionCard elevation="e200" data-cy="community-settings-branded-login">
          <SectionTitle>{t('communitySettings:BrandedLogin')}</SectionTitle>
          <SectionSubtitle>
            {t('communitySettings:BrandedLoginDescription')}
            
          </SectionSubtitle>

          <BrandedLoginToggle settings={brandedLogin} id={community.id} />

          <form onSubmit={this.saveCustomMessage}>
            {brandedLogin.isEnabled && (
              <TextArea
                defaultValue={brandedLogin.message}
                placeholder={t('communitySettings:SetACustomMessageForTheLoginScreen')}
                onChange={this.handleChange}
                dataCy="community-settings-branded-login-input"
              />
            )}

            {messageLengthError && (
              <Error>
                {t('communitySettings:CustomLoginMessagesShouldBeUnder280Characters')}
              </Error>
            )}

            {brandedLogin.isEnabled && (
              <SectionCardFooter
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                }}
              >
                {/* <OutlineButton
                  style={{ alignSelf: 'flex-start', marginLeft: '8px' }}
                  onSubmit={this.saveCustomMessage}
                  onClick={this.saveCustomMessage}
                  disabled={messageLengthError}
                  loading={this.state.isLoading}
                  data-cy="community-settings-branded-login-save"
                >
                  {this.state.isLoading ? 'Saving...' : 'Save'}
                </OutlineButton> */}
                <ThemedButton
                  style={{ alignSelf: 'flex-start', marginLeft: '8px' }}
                  onSubmit={this.saveCustomMessage}
                  onClick={this.saveCustomMessage}
                  disabled={messageLengthError}
                  loading={this.state.isLoading}
                  data-cy="community-settings-branded-login-save">
                  {this.state.isLoading ? t('Saving') : t('Save')}
                </ThemedButton>
                {/* <TextButton
                  to={`/${community.slug}/login`}
                  style={{ alignSelf: 'flex-start', marginRight: '8px' }}
                  data-cy="community-settings-branded-login-preview"
                >
                  Preview
                </TextButton> */}
                <ThemedButton
                  appearance="subtle"
                  type='link'
                  to={`/${community.slug}/login`}
                  style={{ alignSelf: 'flex-start', marginRight: '8px' }}
                  data-cy="community-settings-branded-login-preview">
                  {t('Preview')}
                </ThemedButton>
              </SectionCardFooter>
            )}
          </form>
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
  }
}

export default compose(
  getCommunityById,
  viewNetworkHandler,
  saveBrandedLoginSettings,
  connect()
)(withTranslation(['common','communitySettings'])(BrandedLogin));
