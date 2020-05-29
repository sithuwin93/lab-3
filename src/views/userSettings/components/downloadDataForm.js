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
};

class DownloadDataForm extends React.Component<Props> {
  render() {
    const { user } = this.props;

    if (!user) return null;

    return (
      <SectionCard elevation="e200" data-cy="download-data-container">
        <SectionTitle>Download my data</SectionTitle>
        <SectionSubtitle>
          You can download your personal data at any time.
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
            Download my data
          </Link>
        </SectionCardFooter>
      </SectionCard>
    );
  }
}

export default DownloadDataForm;
