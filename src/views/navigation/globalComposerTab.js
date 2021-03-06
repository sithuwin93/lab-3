// @flow
import React from 'react';
import Icon from 'src/components/icon';
import Tooltip from 'src/components/tooltip';
import { NavigationContext } from 'src/helpers/navigation-context';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';
import { AvatarGrid, AvatarLink, Label, IconWrapper } from './style';
import { useTranslation } from 'react-i18next';

const GlobalComposerTab = () => {
  const { t } = useTranslation('common');
  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;
  return (
    <NavigationContext.Consumer>
      {({ setNavigationIsOpen }) => (
        <Tooltip
          content={t('NewPost')}
          placement={'left'}
          isEnabled={!isWideViewport}
        >
          <AvatarGrid>
            <AvatarLink
              to={{ pathname: '/new/thread', state: { modal: true } }}
              data-cy="navigation-composer"
              onClick={() => setNavigationIsOpen(false)}
            >
              <IconWrapper>
                <Icon glyph="post" />
              </IconWrapper>

              <Label>{t('NewPost')}</Label>
            </AvatarLink>
          </AvatarGrid>
        </Tooltip>
      )}
    </NavigationContext.Consumer>
  );
};

export default GlobalComposerTab;
