// @flow
import React from 'react';
import { withRouter } from 'react-router';
import compose from 'recompose/compose';
import {
  OutlineButton,
  PrimaryButton,
  FacebookButton,
  TwitterButton,
} from 'src/components/button';
import { ButtonRow, InputRow, Input } from './style';
import { Description } from '../../style';
import { Loading } from 'src/components/loading';
import Clipboard from 'react-clipboard.js';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

const Share = ({ community, onboarding, t }) => {
  if (!community) return <Loading />;

  return (
    <div>
      <ButtonRow>
        <FacebookButton
          href={`https://www.facebook.com/sharer/sharer.php?u=https://parabaik.com/${encodeURIComponent(
            community.slug
          )}&t=Come hang out with me in the ${
            community.name
          } community on Parabaik!`}
        >
          {t('newCommunity:ShareOnFacebook')}
        </FacebookButton>

        <TwitterButton
          href={`https://twitter.com/share?text=Come hang out with me in the ${
            community.name
          } community on @parabaik!&url=https://parabaik.com/${encodeURIComponent(
            community.slug
          )}`}
        >
          {t('newCommunity:ShareOnTwitter')}
        </TwitterButton>
      </ButtonRow>

      <Clipboard
        component="div"
        data-clipboard-text={`https://www.parabaik.com/${community.slug}`}
      >
        <InputRow>
          <Input>{`https://www.parabaik.com/${community.slug}`}</Input>
        </InputRow>
      </Clipboard>

      {onboarding && (
        <ButtonRow>
          <Description style={{width: '100%'}} centered>
            {t('newCommunity:YoureReadyToStartBuildingYourCommunity')}
          </Description>
          {/* <OutlineButton to={`/${community.slug}/settings`}>
            View community settings
          </OutlineButton> */}
          <ThemedButton
            type='link'
            to={`/${community.slug}/settings`}
            appearance="subtle">
            {t('newCommunity:ViewCommunitySettings')}
          </ThemedButton>
          {/* <PrimaryButton to={`/${community.slug}`}>
            Go to my community
          </PrimaryButton> */}
          <ThemedButton
            type='link'
            to={`/${community.slug}`}
            appearance="primary">
            {t('newCommunity:GoToMyCommunity')}
          </ThemedButton>
        </ButtonRow>
      )}
    </div>
  );
};

export default compose(withRouter)(withTranslation(['common','newCommunity'])(Share));
