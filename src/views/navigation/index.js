// @flow
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter, Route, type History } from 'react-router-dom';
import Tooltip from 'src/components/tooltip';
import { UserAvatar } from 'src/components/avatar';
import { isViewingMarketingPage } from 'src/helpers/is-viewing-marketing-page';
import { withCurrentUser } from 'src/components/withCurrentUser';
import {
  Overlay,
  NavigationWrapper,
  NavigationGrid,
  AvatarGrid,
  AvatarBottomGrid,
  AvatarLink,
  AvatarDiv,
  Label,
  IconWrapper,
  Divider,
  DesktopMenuIconsCover,
  NavigationGridListScroller,
  Fixed,
  ThemeButtonWrapper
} from './style';
import Icon from 'src/components/icon';
import NavHead from './navHead';
import DirectMessagesTab from './directMessagesTab';
import NotificationsTab from './notificationsTab';
import GlobalComposerTab from './globalComposerTab';
import { Skip, getAccessibilityActiveState } from './accessibility';
import CommunityList from './communityList';
import { NavigationContext } from 'src/helpers/navigation-context';
import { MIN_WIDTH_TO_EXPAND_NAVIGATION } from 'src/components/layout';
import { changeTheme } from 'src/actions/theme'
import LightbulbFilledIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  history: History,
  currentUser?: Object,
  isLoadingCurrentUser: boolean,
  t: i18n.TFunction
};

const Navigation = (props: Props) => {
  const { t, dispatch, currentUser, history, isLoadingCurrentUser } = props;
  const isMarketingPage = isViewingMarketingPage(history, currentUser);
  if (isMarketingPage) return null;
  const isWideViewport =
    window && window.innerWidth > MIN_WIDTH_TO_EXPAND_NAVIGATION;

  const [ isOpen, setIsOpen ] = React.useState(false)
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggleMenuOpen = () => setIsOpen(!isOpen)

  if (!isLoadingCurrentUser && !currentUser) {
    return (
      <NavigationContext.Consumer>
        {({ navigationIsOpen, setNavigationIsOpen }) => (
          <NavigationWrapper data-cy="navigation-bar" isOpen={navigationIsOpen}>
            <Overlay
              elevation="e200"
              isOpen={navigationIsOpen}
              onClick={() => setNavigationIsOpen(false)}
            />

            <NavigationGrid elevation="e200" isOpen={navigationIsOpen}>
              <NavigationGridListScroller>
                <DesktopMenuIconsCover />
                <Route path="/about">
                  {({ match }) => (
                    <Tooltip
                      content={t('Home')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/about'}
                          data-cy="navigation-home"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="logo" />
                          </IconWrapper>

                          <Label>{t('Home')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Route path="/features">
                  {({ match }) => (
                    <Tooltip
                      content={t('Features')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/features'}
                          data-cy="navigation-features"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="announcement" />
                          </IconWrapper>

                          <Label>{t('Features')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Route path="/support">
                  {({ match }) => (
                    <Tooltip
                      content={t('Support')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/support'}
                          data-cy="navigation-support"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="support" />
                          </IconWrapper>

                          <Label>{t('Support')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Route path="/apps">
                  {({ match }) => (
                    <Tooltip
                      content={t('Apps')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/apps'}
                          data-cy="navigation-apps"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="download" />
                          </IconWrapper>

                          <Label>{t('Apps')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Route path="/explore">
                  {({ match }) => (
                    <Tooltip
                      content={t('Explore')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/explore'}
                          data-cy="navigation-explore"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="explore" />
                          </IconWrapper>

                          <Label>{t('Explore')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Divider />

                <Route path="/login">
                  {({ match }) => (
                    <Tooltip
                      content={t('LogIn')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid isActive={!!match}>
                        <AvatarLink
                          to={'/login'}
                          data-cy="navigation-login"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(!!match)}
                        >
                          <IconWrapper>
                            <Icon glyph="door-enter" />
                          </IconWrapper>

                          <Label>{t('LogIn')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>
              </NavigationGridListScroller>
              <Fixed>
                <Tooltip
                  content="Switch Theme"
                  placement={'top'}>
                  <AvatarBottomGrid>
                    <AvatarDiv
                      data-cy="navigation-new-community"
                      onClick={() => dispatch(changeTheme())}>
                      <IconWrapper>
                        <LightbulbFilledIcon size="large" />
                      </IconWrapper>
                    </AvatarDiv>
                  </AvatarBottomGrid>
                </Tooltip>
                <Tooltip
                  content="Change Language"
                  placement={'top'}>
                  <AvatarBottomGrid onClick={toggleMenuOpen}>
                    <AvatarDiv data-cy="navigation-new-community">
                      <IconWrapper>
                        {isOpen ? <span style={{fontSize:20}}>🇲🇲</span> : <span style={{fontSize:20}}>🇬🇧</span> } 
                      </IconWrapper>
                    </AvatarDiv>
                  </AvatarBottomGrid>
                </Tooltip>
              </Fixed>
            </NavigationGrid>
          </NavigationWrapper>
        )}
      </NavigationContext.Consumer>
    );
  }


  if (currentUser) {
    return (
      <NavigationContext.Consumer>
        {({ navigationIsOpen, setNavigationIsOpen }) => (
          <NavigationWrapper data-cy="navigation-bar" isOpen={navigationIsOpen}>
            <NavHead {...props} />
            <Skip />

            <Overlay
              isOpen={navigationIsOpen}
              onClick={() => setNavigationIsOpen(false)}
            />

            <NavigationGrid elevation="e200" isOpen={navigationIsOpen}>
              <NavigationGridListScroller>
                <DesktopMenuIconsCover />
                <GlobalComposerTab />
                <Route path="/messages">
                  {({ match }) => <DirectMessagesTab isActive={!!match} />}
                </Route>
                <Route path="/notifications">
                  {({ match }) => <NotificationsTab isActive={!!match} />}
                </Route>

                <Route path="/explore">
                  {({ match }) => (
                    <Tooltip
                      content={t('Explore')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid
                        isActive={
                          match && match.url === '/explore' && match.isExact
                        }
                      >
                        <AvatarLink
                          to={'/explore'}
                          data-cy="navigation-explore"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(
                            match && match.url === '/explore' && match.isExact
                          )}
                        >
                          <IconWrapper>
                            <Icon glyph="explore" />
                          </IconWrapper>

                          <Label>{t('Explore')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Route path="/users/:username">
                  {({ match }) => (
                    <Tooltip
                      content={t('Profile')}
                      placement={'left'}
                      isEnabled={!isWideViewport}
                    >
                      <AvatarGrid
                        isActive={
                          match &&
                          match.params &&
                          match.params.username === currentUser.username
                        }
                        style={{ marginTop: '4px' }}
                      >
                        <AvatarLink
                          to={'/me'}
                          data-cy="navigation-profile"
                          onClick={() => setNavigationIsOpen(false)}
                          {...getAccessibilityActiveState(
                            history.location.pathname ===
                              `/users/${currentUser.username}`
                          )}
                        >
                          <UserAvatar
                            size={32}
                            showOnlineStatus={false}
                            user={currentUser}
                            isClickable={false}
                            showHoverProfile={false}
                          />
                          <Label>{t('Profile')}</Label>
                        </AvatarLink>
                      </AvatarGrid>
                    </Tooltip>
                  )}
                </Route>

                <Divider />

                <CommunityList
                  setNavigationIsOpen={setNavigationIsOpen}
                  navigationIsOpen={navigationIsOpen}
                  {...props}
                />

                {currentUser && (
                  <React.Fragment>
                    <Divider />
                    <Route path="/new/community">
                      {({ match }) => (
                        <Tooltip
                          content={t('CreateACommunity')}
                          placement={'left'}
                          isEnabled={!isWideViewport}
                        >
                          <AvatarGrid
                            isActive={
                              match &&
                              match.url === '/new/community' &&
                              match.isExact
                            }
                          >
                            <AvatarLink
                              to={'/new/community'}
                              data-cy="navigation-new-community"
                              {...getAccessibilityActiveState(
                                match &&
                                  match.url === '/new/community' &&
                                  match.isExact
                              )}
                            >
                              <IconWrapper>
                                <Icon glyph="plus" />
                              </IconWrapper>

                              <Label>{t('CreateACommunity')}</Label>
                            </AvatarLink>
                          </AvatarGrid>
                        </Tooltip>
                      )}
                    </Route>
                  </React.Fragment>
                )}
              </NavigationGridListScroller>
              <Fixed>
                <Tooltip
                  content="Switch Theme"
                  placement={'top'}>
                  <AvatarBottomGrid>
                    <AvatarDiv
                      data-cy="navigation-new-community"
                      onClick={() => dispatch(changeTheme())}>
                      <IconWrapper>
                        <LightbulbFilledIcon size="large" />
                      </IconWrapper>
                    </AvatarDiv>
                  </AvatarBottomGrid>
                </Tooltip>
                <Tooltip
                  content="Change Language"
                  placement={'top'}>
                  <AvatarBottomGrid onClick={toggleMenuOpen}>
                    <AvatarDiv data-cy="navigation-new-community">
                      <IconWrapper>
                        {isOpen ? <span style={{fontSize:20}}>🇲🇲</span> : <span style={{fontSize:20}}>🇬🇧</span> } 
                      </IconWrapper>
                    </AvatarDiv>
                  </AvatarBottomGrid>
                </Tooltip>
              </Fixed>
            </NavigationGrid>
          </NavigationWrapper>
        )}
      </NavigationContext.Consumer>
    );
  }

  return <NavigationWrapper />;
};

//iconBefore={<LightbulbIcon label="switch theme"/>}
export default compose(
  withCurrentUser,
  withRouter,
  connect()
)(withTranslation('common')(Navigation));
