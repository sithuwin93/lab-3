// @flow
import React from 'react';
import { NullMessagesWrapper, NullCopy, Stretch } from '../style';
import { useTranslation } from 'react-i18next';

const NullMessages = () => {
  const { t } = useTranslation('common');
  return (
    <Stretch>
      <NullMessagesWrapper>
        <NullCopy>{t('NoMessagesYet')}</NullCopy>
      </NullMessagesWrapper>
    </Stretch>
  );

} 

export default NullMessages;
