// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { addToastWithTimeout } from 'src/actions/toasts';
import updateUserEmailMutation from 'shared/graphql/mutations/user/updateUserEmail';
import toggleUserNotificationSettingsMutation from 'shared/graphql/mutations/user/toggleUserNotificationSettings';
import { Checkbox } from 'src/components/formElements';
import Icon from 'src/components/icon';
import {
  ListContainer,
  Notice,
  InlineIcon,
  Description,
} from 'src/components/listItems/style';
import { EmailListItem, CheckboxContent } from '../style';
import type { GetCurrentUserSettingsType } from 'shared/graphql/queries/user/getCurrentUserSettings';
import UserEmailConfirmation from 'src/components/userEmailConfirmation';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';
import type { Dispatch } from 'redux';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

const parseNotificationTypes = (notifications,t) => {
  const types = Object.keys(notifications.types).filter(
    type => type !== '__typename'
  );
  return types.map(type => {
    if (!notifications.types[type]) return {};
    switch (type) {
      case 'newMessageInThreads':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:NewMessageInThreadsLabel'),
          display: 'flex-start',
        };
      case 'newDirectMessage':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:NewDirectMessageLabel'),
          display: 'center',
        };
      case 'newThreadCreated':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:NewThreadCreatedLabel'),
          display: 'flex-start',
        };
      case 'dailyDigest':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:DailyDigestLabel'),
          display: 'center',
        };
      case 'weeklyDigest':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:WeeklyDigestLabel'),
          display: 'center',
        };
      case 'newMention':
        return {
          type,
          emailValue: notifications.types[type].email,
          label: t('usersSettings:NewMentionLabel'),
          display: 'flex-start',
        };
      default:
      case 'null':
        return {};
    }
  });
};

type Props = {
  updateUserEmail: Function,
  dispatch: Dispatch<Object>,
  toggleNotificationSettings: Function,
  smallOnly: boolean,
  largeOnly: boolean,
  user: GetCurrentUserSettingsType,
  t: i18n.TFunction
};

class EmailSettings extends React.Component<Props> {
  handleChange = e => {
    let notificationType = e.target.id;
    let deliveryMethod = 'email';
    let input = {
      deliveryMethod,
      notificationType,
    };

    this.props
      .toggleNotificationSettings(input)
      .then(() => {
        return this.props.dispatch(
          addToastWithTimeout('success', this.props.t('Settings saved!'))
        );
      })
      .catch(err => {
        this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  render() {
    const {
      user: {
        settings: { notifications },
      },
      user,
    } = this.props;

    const settings = parseNotificationTypes(notifications,this.props.t).filter(
      notification => notification.hasOwnProperty('emailValue')
    );

    if (!user.email) {
      return (
        <SectionCard
          elevation="e200"
          smallOnly={this.props.smallOnly}
          largeOnly={this.props.largeOnly}
        >
          <SectionTitle>{this.props.t('usersSettings:TurnOnEmailNotifications')}</SectionTitle>
          <ListContainer>
            <Description>
              {this.props.t('usersSettings:TurnOnEmailNotificationsDescription')}
            </Description>

            <UserEmailConfirmation user={user} />
          </ListContainer>
        </SectionCard>
      );
    }

    return (
      <SectionCard
        elevation="e200"
        smallOnly={this.props.smallOnly}
        largeOnly={this.props.largeOnly}
      >
        <SectionTitle>{this.props.t('usersSettings:EmailPreferences')}</SectionTitle>
        <ListContainer>
          {settings.map((setting, i) => {
            return (
              <EmailListItem key={i}>
                <Checkbox
                  checked={setting.emailValue}
                  onChange={this.handleChange}
                  id={setting.type}
                  align={setting.display}>
                  <CheckboxContent>
                    {setting.label}
                    {setting.type === 'newMessageInThreads' && (
                      <Notice>
                        <strong>{this.props.t('usersSettings:newMessageInThreadsNoticeStrong')}</strong>{' '}
                        You can turn off email notifications for individual
                        threads by clicking on the notification icon{' '}
                        <InlineIcon>
                          <Icon glyph="notification" size="16" />
                        </InlineIcon>{' '}
                        at the top of a post.
                      </Notice>
                    )}

                    {setting.type === 'newThreadCreated' && (
                      <Notice>
                        {this.props.t('usersSettings:NewThreadCreatedNotice')}
                      </Notice>
                    )}

                    {setting.type === 'newMention' && (
                      <Notice>
                        {this.props.t('usersSettings:NewMentionNotice')}
                      </Notice>
                    )}
                  </CheckboxContent>
                </Checkbox>
              </EmailListItem>
            );
          })}
        </ListContainer>
      </SectionCard>
    );
  }
}

export default compose(
  toggleUserNotificationSettingsMutation,
  updateUserEmailMutation,
  connect()
)(withTranslation(['common','usersSettings'])(EmailSettings));

