// @flow
import theme from 'shared/theme';
import * as React from 'react';
import styled from 'styled-components';
import {
  SectionCard,
  SectionTitle,
  SectionSubtitle,
  SectionCardFooter,
} from 'src/components/settingsViews/style';
import { themed } from 'src/components/theme';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

const Link = styled.a`
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${() => themed({ light: theme.brand.default, dark:theme.brandd.default })};
  padding: 12px 16px;

  &:hover {
    color: ${() => themed({ light: theme.brand.alt, dark: theme.brandd.alt})};
  }
`;

type Props = {
  user: Object,
  t: i18n.TFunction
};

class DownloadDataForm extends React.Component<Props> {
  render() {
    const { user, t } = this.props;

    if (!user) return null;

    return (
      <SectionCard elevation="e200" data-cy="download-data-container">
        <SectionTitle>{t('usersSettings:DownloadMyData')}</SectionTitle>
        <SectionSubtitle>
          {t('usersSettings:YouCanDownloadYourPersonalDataAtAnyTime')}
        </SectionSubtitle>

        <SectionCardFooter>
          <Link
            href={
              process.env.NODE_ENV === 'production'
                ? '/api/user.json'
                : 'http://localhost:3001/api/user.json'
            }
            download
          >
            {t('usersSettings:DownloadMyData')}
          </Link>
        </SectionCardFooter>
      </SectionCard>
    );
  }
}

export default withTranslation(['common','usersSettings'])(DownloadDataForm);
