// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import renderTextWithLinks from 'src/helpers/render-text-with-markdown-links';
import addProtocolToString from 'shared/normalize-url';
import Icon from 'src/components/icon';
import {
  MetaContainer,
  Name,
  Description,
  MetaLinksContainer,
  MetaRow,
  OnlineDot,
} from '../style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  // TODO: Properly type this
  community: Object,
  t: i18n.TFunction
};

const Meta = (props: Props) => {
  const { community, t } = props;
  const { description, website } = community;
  const formattedDescription = description && renderTextWithLinks(description);
  const formattedWebsite = website && addProtocolToString(website);

  return (
    <MetaContainer>
      <Link to={`/${community.slug}`}>
        <Name>{community.name}</Name>
      </Link>

      {formattedDescription && (
        <Description>{formattedDescription}</Description>
      )}

      <MetaLinksContainer>
        {formattedWebsite && (
          <MetaRow>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={formattedWebsite}
            >
              <Icon glyph={'link'} size={20} /> {website}
            </a>
          </MetaRow>
        )}

        {community.metaData && (
          <React.Fragment>
            <MetaRow as={Link} to={`/${community.slug}?tab=members`}>
              <Icon glyph={'person'} size={20} />{' '}
              {t('community:Members',{member: community.metaData.members.toLocaleString()})}
            </MetaRow>

            <MetaRow as={Link} to={`/${community.slug}?tab=members`}>
              <OnlineDot /> 
              {t('community:MembersOnline',{member:community.metaData.onlineMembers.toLocaleString()})}
            </MetaRow>
          </React.Fragment>
        )}
      </MetaLinksContainer>
    </MetaContainer>
  );
};
export const CommunityMeta = withTranslation(['common','community'])(Meta)