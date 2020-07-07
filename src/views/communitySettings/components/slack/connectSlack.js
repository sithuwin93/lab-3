// @flow
import * as React from 'react';
import type { GetSlackSettingsType } from 'shared/graphql/queries/community/getCommunitySlackSettings';
import {
  SectionCard,
  SectionTitleWithIcon,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { OutlineButton } from 'src/components/button';
import Icon from 'src/components/icon';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  community: GetSlackSettingsType,
  isOnboarding: boolean,
  t: i18n.TFunction
};

class ImportSlackTeam extends React.Component<Props> {
  render() {
    const { t, community, isOnboarding = false } = this.props;

    const url = isOnboarding
      ? `https://slack.com/oauth/authorize?client_id=201769987287.271382863153&scope=users:read.email%20users:read%20chat:write:bot%20groups:read%20channels:read&state=${
          community.id
        }&redirect_uri=${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/api/slack/onboarding'
            : 'https://www.parabaik.com/api/slack/onboarding'
        }`
      : `https://slack.com/oauth/authorize?client_id=201769987287.271382863153&scope=users:read.email%20users:read%20chat:write:bot%20groups:read%20channels:read&state=${
          community.id
        }&redirect_uri=${
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3001/api/slack'
            : 'https://www.parabaik.com/api/slack'
        }`;

    return (
      <SectionCard elevation="e200">
        <SectionTitleWithIcon>
          <Icon glyph={'slack-colored'} size={32} />
            {t('ConnectASlackTeam')}
        </SectionTitleWithIcon>
        <SectionSubtitle>
          {t('InviteYourSlackTeamToYourCommunity')}
        </SectionSubtitle>

        <SectionCardFooter>
          <a href={url}>
            {/* <OutlineButton>Connect a Slack team</OutlineButton> */}
            <ThemedButton>{t('ConnectASlackTeam')}</ThemedButton>
          </a>
        </SectionCardFooter>
      </SectionCard>
    );
  }
}

export default withTranslation('newCommunity')(ImportSlackTeam);
