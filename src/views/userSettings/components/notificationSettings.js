// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Checkbox } from 'src/components/formElements';
import WebPushManager from 'src/helpers/web-push-manager';
import { addToastWithTimeout } from 'src/actions/toasts';
import { subscribeToWebPush } from 'shared/graphql/subscriptions';
import { ListContainer, Notice } from 'src/components/listItems/style';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';
import { EmailListItem } from '../style';
import type { Dispatch } from 'redux';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type State = {
  webPushBlocked: boolean,
  subscription: ?any,
};

type Props = {
  subscribeToWebPush: Function,
  dispatch: Dispatch<Object>,
  smallOnly?: boolean,
  largeOnly?: boolean,
  t: i18n.TFunction
};

class NotificationSettings extends React.Component<Props, State> {
  state = {
    webPushBlocked: false,
    subscription: null,
  };

  componentDidMount() {
    WebPushManager.getPermissionState().then(result => {
      if (result === 'denied') {
        this.setState({
          webPushBlocked: true,
        });
      }
    });
    WebPushManager.getSubscription().then(subscription => {
      this.setState({
        subscription: subscription || false,
      });
    });
  }

  subscribeToWebPush = () => {
    WebPushManager.subscribe()
      .then(subscription => {
        this.setState({
          subscription,
          webPushBlocked: false,
        });
        return this.props.subscribeToWebPush(subscription);
      })
      .catch(err => {
        return this.props.dispatch(
          addToastWithTimeout(
            'error',
            this.props.t('usersSettings:OopsWeCouldntEnableBrowserNotificationsForYou')
          )
        );
      });
  };

  unsubscribeFromWebPush = () => {
    WebPushManager.unsubscribe()
      .then(result => {
        if (result) {
          this.setState({
            subscription: false,
          });
        } else {
          return this.props.dispatch(
            addToastWithTimeout(
              'error',
              this.props.t('usersSettings:OopsWeCouldntEnableBrowserNotificationsForYou')
            )
          );
        }
      })
      .catch(() => {
        return this.props.dispatch(
          addToastWithTimeout(
            'error',
            this.props.t('usersSettings:OopsWeCouldntEnableBrowserNotificationsForYou')
          )
        );
      });
  };

  render() {
    const { t } = this.props;
    const { webPushBlocked, subscription } = this.state;
    const onChange = !subscription
      ? this.subscribeToWebPush
      : this.unsubscribeFromWebPush;

    return (
      <SectionCard
        elevation="e200"
        smallOnly={this.props.smallOnly}
        largeOnly={this.props.largeOnly}
      >
        <SectionTitle>{t('usersSettings:NotificationPreferences')}</SectionTitle>
        <ListContainer>
          <EmailListItem>
            {subscription !== null && (
              <Checkbox
                checked={!!subscription}
                disabled={webPushBlocked}
                onChange={onChange}
              >
                {t('usersSettings:EnableBrowserPushNotifications')}
              </Checkbox>
            )}
            {webPushBlocked && (
              <Notice>
                <strong>
                  You have blocked browser push notifications on this device!
                </strong>{' '}
                Unblock them by following{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://support.sendpulse.com/456261-How-to-Unblock-Web-Push-Notifications"
                >
                  these steps
                </a>
                .
              </Notice>
            )}
          </EmailListItem>
        </ListContainer>
      </SectionCard>
    );
  }
}

export default compose(
  subscribeToWebPush,
  connect()
)(withTranslation(['common','usersSettings'])(NotificationSettings));
