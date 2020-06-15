// @flow
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { UserInfoType } from 'shared/graphql/fragments/user/userInfo';
import { openModal } from 'src/actions/modals';
import { withCurrentUser } from 'src/components/withCurrentUser';
// import {
//   PrimaryOutlineButton,
//   HoverWarnOutlineButton,
//   OutlineButton,
// } from 'src/components/button';
import InitDirectMessageWrapper from 'src/components/initDirectMessageWrapper';
import { ActionsRowContainer } from '../style';
import { isAdmin } from 'src/helpers/is-admin';
import { ThemedButton } from 'src/components/button-new';
import Icon from 'src/components/icon';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  user: UserInfoType,
  currentUser: ?UserInfoType,
  dispatch: Dispatch<Object>,
  t: i18n.TFunction
};

export const UnconnectedUserActions = (props: Props) => {
  const { user, currentUser, dispatch, t } = props;

  if (!user) return null;

  const initReport = () => {
    return dispatch(openModal('REPORT_USER_MODAL', { user }));
  };

  const initBan = () => {
    return dispatch(openModal('BAN_USER_MODAL', { user }));
  };

  return (
    <ActionsRowContainer>
      {currentUser && currentUser.id === user.id && (
        // <OutlineButton to={`/users/${user.username}/settings`}>
        //   Settings
        // </OutlineButton>
        <ThemedButton 
          type="link"
          appearance="default"
          shouldFitContainer 
          to={`/users/${user.username}/settings`}>
          <Icon 
            style={{
              position: 'relative',
              top: 6,
              left: 5,
              marginRight: 8
            }}
            glyph={'settings'} 
            size={24} />

          {t('Settings')}
        </ThemedButton>     
      )}

      <InitDirectMessageWrapper
        user={user}
        render={
          // <PrimaryOutlineButton data-cy="message-user-button">
          //   Message
          // </PrimaryOutlineButton>
          <ThemedButton
            data-cy="message-user-button"
            shouldFitContainer
            appearance={'primary'}>            
            {t('Message')}
          </ThemedButton>
        }
      />

      {currentUser && user.id !== currentUser.id && (
        // <HoverWarnOutlineButton onClick={initReport}>
        //   Report
        // </HoverWarnOutlineButton>
        <ThemedButton
          shouldFitContainer
          onClick={initReport}
          appearance={'danger'}>
          {t('Report')}
        </ThemedButton>
      
      )}

      {currentUser && user.id !== currentUser.id && isAdmin(currentUser.id) && (
        // <HoverWarnOutlineButton 
        // onClick={initBan}>Ban</HoverWarnOutlineButton>
        <ThemedButton
          shouldFitContainer
          onClick={initBan}
          appearance={'danger'}>
          {t('Ban')}
        </ThemedButton>
      )}
    </ActionsRowContainer>
  );
};

export const UserActions = compose(
  withCurrentUser,
  connect()
)(withTranslation(['common','community'])(UnconnectedUserActions));
