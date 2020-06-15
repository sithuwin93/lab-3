import React from 'react';
import { withTranslation } from 'react-i18next';
import { Step, Line, Container } from './style';

const Stepper = ({ activeStep, t }) => {
  return (
    <Container>
      <Line />
      <Step active={activeStep === 1}>{t('newCommunity:1')}</Step>
      <Step active={activeStep === 2}>{t('newCommunity:2')}</Step>
      <Step active={activeStep === 3}>{t('newCommunity:3')}</Step>
    </Container>
  );
};

export default withTranslation('newCommunity')(Stepper);
