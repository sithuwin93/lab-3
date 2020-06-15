// @flow
import React from 'react';
import { SERVER_URL } from 'src/api/constants';
import { OutlineButton } from 'src/components/button';
import { LogoutWrapper } from '../style';
import { SectionCard } from 'src/components/settingsViews/style';
import { ThemedButton } from 'src/components/button-new';
import { withRouter, type History } from 'react-router';
import Icon from 'src/components/icon';
import { useTranslation } from 'react-i18next';


export default () => {
  const { t } = useTranslation('common');

  return (
    <LogoutWrapper>
      <SectionCard elevation="e200">
        {/* <OutlineButton href={`${SERVER_URL}/auth/logout`} target="_self">
          Log out
        </OutlineButton> */}
        <ThemedButton
          type='a'
          shouldFitContainer
          href={`${SERVER_URL}/auth/logout`}
          target="_self"
          >
          <Icon 
            style={{
                position: 'relative',
                top: 9,
                left: 5,
                marginRight: 8
            }}
            glyph={'sign-out'} 
            size={24} />

          {t('LogOut')}
        </ThemedButton>
      </SectionCard>
    </LogoutWrapper>
  );
}

