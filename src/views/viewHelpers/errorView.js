// @flow
import React from 'react';
import { OutlineButton, PrimaryButton } from 'src/components/button';
import { Emoji, Heading, Description, ActionsRow, Card } from './style';
import { ViewGrid, CenteredGrid } from 'src/components/layout';
import { ThemedButton } from 'src/components/button-new';
import { useTranslation } from 'react-i18next';

type Props = {
  emoji?: string,
  heading?: string,
  subheading?: string,
};

export const ErrorView = (props: Props) => {
  const { t } = useTranslation('error');

  const {
    emoji = '😣',
    heading = t('error:WeRanIntoTroubleLoadingThisPage'),
    subheading = t('error:WeRanIntoTroubleLoadingThisPageDescription'),
    ...rest
  } = props;

  return (
    <ViewGrid {...rest}>
      <CenteredGrid>
        <Card elevation="e200">
          <Emoji role="img" aria-label="Oops">
            {emoji}
          </Emoji>
          <Heading>{heading}</Heading>
          <Description>{subheading}</Description>
          <ActionsRow>
            {/* <OutlineButton href={'mailto:hi@spectrum.chat'}>
              Contact us
            </OutlineButton> */}
            <ThemedButton
              shouldFitContainer
              type="a"
              href={'mailto:hi@parabaik.com'}
              >
              {t('error:ContactUs')}
            </ThemedButton>
            {/* <PrimaryButton to={'/'}>Go home</PrimaryButton> */}
            <ThemedButton  
              shouldFitContainer
              appearance="primary"
              type="link"
              to={'/'}>
              {t('error:GoHome')}
            </ThemedButton>
          </ActionsRow>
        </Card>
      </CenteredGrid>
    </ViewGrid>
  );
};
