// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import queryString from 'query-string';
import { Button, TextButton } from 'src/components/button';
import SlackConnection from '../communitySettings/components/slack';
import { CommunityInvitationForm } from 'src/components/emailInvitationForm';
import CreateCommunityForm from './components/createCommunityForm';
import EditCommunityForm from './components/editCommunityForm';
import Stepper from './components/stepper';
import Share from './components/share';
import Head from 'src/components/head';
import Login from 'src/views/login';
import { setTitlebarProps } from 'src/actions/titlebar';
import { getCommunityByIdQuery } from 'shared/graphql/queries/community/getCommunity';
import type { GetCommunityType } from 'shared/graphql/queries/community/getCommunity';
import getCurrentUserSettings, {
  type GetCurrentUserSettingsType,
} from 'shared/graphql/queries/user/getCurrentUserSettings';
import UserEmailConfirmation from 'src/components/userEmailConfirmation';
import { LoadingView } from 'src/views/viewHelpers';
import {
  Actions,
  Container,
  Title,
  Description,
  Divider,
  ContentContainer,
} from './style';
import viewNetworkHandler, {
  type ViewNetworkHandlerType,
} from 'src/components/viewNetworkHandler';
import { ViewGrid, SingleColumnGrid } from 'src/components/layout';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type State = {
  activeStep: number,
  isLoading: boolean,
  community: any,
  existingId: ?string,
  hasInvitedPeople: boolean,
};

type Props = {
  dispatch: Function,
  ...$Exact<ViewNetworkHandlerType>,
  client: Object,
  history: Object,
  data: {
    user: ?GetCurrentUserSettingsType,
  },
  t: i18n.TFunction
};

class NewCommunity extends React.Component<Props, State> {
  constructor() {
    super();

    const parsed = queryString.parse(window.location.search);
    let step = parsed.s;
    const id = parsed.id;

    step = step ? parseInt(step, 10) : 1;

    this.state = {
      activeStep: step,
      isLoading: false,
      community: null,
      existingId: id || null,
      hasInvitedPeople: false,
    };
  }

  componentDidMount() {
    const { existingId } = this.state;
    const { dispatch, t } = this.props;

    dispatch(setTitlebarProps({ title: t('NewCommunity') }));

    if (!existingId) return;

    this.props.client
      .query({
        query: getCommunityByIdQuery,
        variables: {
          id: existingId,
        },
      })
      .then(
        ({
          data: { community },
        }: {
          data: { community: GetCommunityType },
        }) => {
          if (!community) return;
          return this.setState({
            community,
          });
        }
      )
      .catch(err => {
        console.error('error creating community', err);
      });
  }

  step = direction => {
    const { activeStep, community } = this.state;
    let newStep = direction === 'next' ? activeStep + 1 : activeStep - 1;
    this.props.history.replace(
      `/new/community?s=${newStep}${community &&
        community.id &&
        `&id=${community.id}`}`
    );
    this.setState({
      activeStep: newStep,
    });
  };

  title = () => {
    const { t } = this.props;
    const { activeStep, community } = this.state;
    switch (activeStep) {
      case 1: {
        return community ? t('newCommunity:UpdateYourCommunity'): t('newCommunity:CreateACommunity');
      }
      case 2: {
        return community? t('newCommunity:InvitePeopleToTheCommunity',{name:community.name}):
        t('newCommunity:InvitePeopleToYourCommunity');
      }
      case 3: {
        return t('newCommunity:Done');
      }
      default: {
        return t('newCommunity:CreateACommunity');
      }
    }
  };

  description = () => {
    const { t } = this.props;
    const { activeStep, community } = this.state;
    switch (activeStep) {
      case 1: {
        return t('newCommunity:CreateACommunityDescription');
      }
      case 2: {
        return community ? t('newCommunity:KickstartTheCommunity',{name:community.name}):
          t('newCommunity:KickstartYourCommunity');
      }
      case 3: {
        return t('newCommunity:YoureAllSet');
      }
      default: {
        return t('newCommunity:CreateACommunity');
      }
    }
  };

  communityCreated = community => {
    this.setState({
      community: { ...community },
    });
    this.props.history.replace(`/new/community?id=${community.id}`);
    return this.step('next');
  };

  hasInvitedPeople = () => {
    this.setState({
      hasInvitedPeople: true,
    });
  };

  render() {
    const {
      isLoading,
      data: { user },
      t
    } = this.props;
    const { activeStep, community, hasInvitedPeople } = this.state;
    const title = this.title();
    const description = this.description();
    if (user && user.email) {
      return (
        <ViewGrid>
          <Head
            title={t('newCommunity:NewCommunity')}
            description={t('newCommunity:CreateACommunity')}
          />
          <SingleColumnGrid elevation="e200">
            <Container bg={activeStep === 3 ? 'onboarding' : null} repeat>
              <Stepper activeStep={activeStep} />
              <Title centered={activeStep === 3}>{title}</Title>
              <Description centered={activeStep === 3}>
                {description}
              </Description>

              {// gather community meta info
              activeStep === 1 && !community && (
                <CreateCommunityForm communityCreated={this.communityCreated} />
              )}

              {activeStep === 1 && community && (
                <EditCommunityForm
                  communityUpdated={this.communityCreated}
                  community={community}
                />
              )}

              {activeStep === 2 && community && community.id && (
                <ContentContainer data-cy="community-creation-invitation-step">
                  <Divider />
                  <SlackConnection isOnboarding={true} id={community.id} />
                  <Divider />
                  <CommunityInvitationForm id={community.id} />
                </ContentContainer>
              )}

              {// connect a slack team or invite via email
              activeStep === 2 && (
                <Actions>
                  {/* <TextButton onClick={() => this.step('previous')}>
                    Back
                  </TextButton> */}
                  <ThemedButton 
                    appearance="subtle"
                    onClick={() => this.step('previous')}>
                    {t('Back')}
                  </ThemedButton>
                  {hasInvitedPeople ? (
                    // <Button onClick={() => this.step('next')}>Continue</Button>
                    <ThemedButton 
                      onClick={() => this.step('next')}>
                      {t('Continue')}
                    </ThemedButton>
                  ) : (
                    // <TextButton onClick={() => this.step('next')}>
                    //   Skip this step
                    // </TextButton>
                    <ThemedButton 
                      onClick={() => this.step('next')}>
                      {t('SkipThisStep')}
                    </ThemedButton>
                  )}
                </Actions>
              )}

              {// share the community
              activeStep === 3 && (
                <ContentContainer>
                  <Share community={community} onboarding={true} />
                </ContentContainer>
              )}
            </Container>
          </SingleColumnGrid>
        </ViewGrid>
      );
    }

    if (user && !user.email) {
      return (
        <ViewGrid>
          <SingleColumnGrid elevation="e200">
            <Container bg={null}>
              <Title>
                {user.pendingEmail ? t('ConfirmYourEmailAddress') :t('AddYourEmailAddress')}
              </Title>
              <Description>
                {user.pendingEmail ?
                  t('newCommunity:BeforeCreatingACommunityPleaseConfirmYourEmailAddress'):
                  t('newCommunity:BeforeCreatingACommunityPleaseAddYourEmailAddress')
                }
              </Description>
              <div style={{ padding: '0 24px 24px' }}>
                <UserEmailConfirmation user={user} />
              </div>
            </Container>
          </SingleColumnGrid>
        </ViewGrid>
      );
    }

    if (isLoading) return <LoadingView />;

    return (
      <Login
        dispatch={this.props.dispatch}
        redirectPath={`${window.location.href}`}
      />
    );
  }
}

export default compose(
  withApollo,
  // $FlowIssue
  connect(),
  getCurrentUserSettings,
  viewNetworkHandler
)(withTranslation(['common','newCommunity'])(NewCommunity));
