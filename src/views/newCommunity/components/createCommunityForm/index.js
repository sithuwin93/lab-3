// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import slugg from 'slugg';
import { withApollo } from 'react-apollo';
import { Notice } from 'src/components/listItems/style';
import { CommunityAvatar } from 'src/components/avatar';
import { throttle } from 'src/helpers/utils';
import { addToastWithTimeout } from 'src/actions/toasts';
import { COMMUNITY_SLUG_DENY_LIST } from 'shared/slug-deny-lists';
import createCommunityMutation from 'shared/graphql/mutations/community/createCommunity';
import type { CreateCommunityType } from 'shared/graphql/mutations/community/createCommunity';
import { getCommunityBySlugQuery } from 'shared/graphql/queries/community/getCommunity';
import { searchCommunitiesQuery } from 'shared/graphql/queries/search/searchCommunities';
import { PrimaryOutlineButton } from 'src/components/button';
import {
  whiteSpaceRegex,
  oddHyphenRegex,
} from 'src/views/viewHelpers/textValidationHelper';
import Icon from 'src/components/icon';

import {
  Input,
  UnderlineInput,
  // TextArea,
  PhotoInput,
  CoverInput,
  Error,
  Checkbox,
} from 'src/components/formElements';
import {
  ImageInputWrapper,
  Spacer,
  CommunitySuggestionsWrapper,
  CommunitySuggestion,
  CommunitySuggestionsText,
  PrivacySelector,
  PrivacyOption,
  PrivacyOptionLabel,
  PrivacyOptionText,
  DeleteCoverWrapper,
  DeleteCoverButton,
  RadioInput
} from './style';
import { FormContainer, Form, Actions } from '../../style';
import type { Dispatch } from 'redux';
import TextField from 'src/components/textfield';
import TextArea from 'src/components/textarea';
import { LabelWrapper, Label } from './style';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type State = {
  name: ?string,
  slug: string,
  description: string,
  website: string,
  image: string,
  coverPhoto: string,
  file: ?Object,
  coverFile: ?Object,
  slugTaken: boolean,
  slugError: boolean,
  descriptionError: boolean,
  nameError: boolean,
  createError: boolean,
  isLoading: boolean,
  agreeCoC: boolean,
  photoSizeError: boolean,
  communitySuggestions: ?Array<Object>,
  isPrivate: boolean,
};

type Props = {
  client: Object,
  createCommunity: Function,
  communityCreated: Function,
  dispatch: Dispatch<Object>,
  name: string,
  t: i18n.TFunction
};
class CreateCommunityForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name || '',
      slug: '',
      description: '',
      website: '',
      image: '',
      coverPhoto: '',
      file: null,
      coverFile: null,
      slugTaken: false,
      slugError: false,
      descriptionError: false,
      nameError: false,
      createError: false,
      isLoading: false,
      agreeCoC: false,
      photoSizeError: false,
      communitySuggestions: null,
      isPrivate: false,
    };

    this.checkSlug = throttle(this.checkSlug, 500);
  }

  changeName = e => {
    const { communitySuggestions } = this.state;
    if (communitySuggestions) {
      this.setState({
        communitySuggestions: null,
      });
    }

    const name = e.target.value;
    // replace any non alpha-num characters to prevent bad community slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseName = name
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    let slug = slugg(lowercaseName);

    let hasInvalidChars = name.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = name.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || name.length > 20) {
      this.setState({
        nameError: true,
      });

      return;
    }

    if (COMMUNITY_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        name,
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        name,
        slug,
        nameError: false,
        slugTaken: false,
      });

      // $FlowIssue
      this.checkSlug(slug);
    }
  };

  changeSlug = e => {
    let slug = e.target.value;
    // replace any non alpha-num characters to prevent bad community slugs
    // (/[\W_]/g, "-") => replace non-alphanum with hyphens
    // (/-{2,}/g, '-') => replace multiple hyphens in a row with one hyphen
    let lowercaseSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[\W_]/g, '-')
      .replace(/-{2,}/g, '-');
    slug = slugg(lowercaseSlug);

    if (slug.length >= 24) {
      this.setState({
        slug,
        slugError: true,
      });

      return;
    }

    if (COMMUNITY_SLUG_DENY_LIST.indexOf(slug) > -1) {
      this.setState({
        slug,
        slugTaken: true,
      });
    } else {
      this.setState({
        slug,
        slugError: false,
        slugTaken: false,
      });

      // $FlowIssue
      this.checkSlug(slug);
    }
  };

  checkSlug = slug => {
    // check the db to see if this channel slug exists
    this.props.client
      .query({
        query: getCommunityBySlugQuery,
        variables: {
          slug,
        },
      })
      .then(({ data }) => {
        if (COMMUNITY_SLUG_DENY_LIST.indexOf(this.state.slug) > -1) {
          return this.setState({
            slugTaken: true,
          });
        }
        // if the community exists
        if (!data.loading && data && data.community && data.community.id) {
          return this.setState({
            slugTaken: true,
          });
        } else {
          return this.setState({
            slugTaken: false,
          });
        }
      })
      .catch(err => {
        return this.props.dispatch(addToastWithTimeout('success', err.message));
      });
  };

  checkSuggestedCommunities = () => {
    const { name, slug, slugError } = this.state;
    if (name && name.length > 1 && slug && slug.length > 1 && !slugError) {
      // if the user has found a valid url, do a community search to see if they might be creating a duplicate community
      this.props.client
        .query({
          // TODO: @BRIAN SWITCH THIS AFTER SEARCH IS MERGED IN
          query: searchCommunitiesQuery,
          variables: {
            queryString: slug,
            type: 'COMMUNITIES',
          },
        })
        .then(({ data: { search } }) => {
          if (
            !search ||
            !search.searchResultsConnection ||
            search.searchResultsConnection.edges.length === 0
          ) {
            return this.setState({
              communitySuggestions: null,
            });
          }

          const communitySuggestions = search.searchResultsConnection.edges.map(
            c => c.node
          );

          const filtered =
            communitySuggestions &&
            communitySuggestions
              .slice()
              .sort((a, b) => b.metaData.members - a.metaData.members)
              .slice(0, 5);

          if (filtered && filtered.length > 0) {
            return this.setState({
              communitySuggestions: filtered,
            });
          } else {
            return this.setState({
              communitySuggestions: null,
            });
          }
        })
        .catch(err => {
          return this.props.dispatch(
            addToastWithTimeout('success', err.message)
          );
        });
    }
  };

  changeDescription = e => {
    const description = e.target.value;

    let hasInvalidChars = description.search(whiteSpaceRegex) >= 0;
    let hasOddHyphens = description.search(oddHyphenRegex) >= 0;
    if (hasInvalidChars || hasOddHyphens || description.length >= 140) {
      this.setState({
        descriptionError: true,
      });
      return;
    }

    this.setState({
      description,
      descriptionError: false,
    });
  };

  changeWebsite = e => {
    const website = e.target.value;
    this.setState({
      website,
    });
  };

  changeCoC = () => {
    const value = this.state.agreeCoC;
    this.setState({
      agreeCoC: !value,
    });
  };

  setCommunityPhoto = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) return;

    if (file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
      });
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        // $FlowFixMe
        image: reader.result,
        photoSizeError: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  setCommunityCover = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) return;

    if (file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
      });
    }

    reader.onloadend = () => {
      this.setState({
        coverFile: file,
        // $FlowFixMe
        coverPhoto: reader.result,
        photoSizeError: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  deleteCoverPhoto = e => {
    e.preventDefault();
    this.setState({ coverPhoto: '', coverFile: null });
  };

  create = e => {
    e.preventDefault();
    const {
      name,
      slug,
      description,
      website,
      file,
      coverFile,
      slugTaken,
      slugError,
      nameError,
      descriptionError,
      photoSizeError,
      agreeCoC,
      isPrivate,
    } = this.state;

    // if an error is present, ensure the client cant submit the form
    if (
      slugTaken ||
      nameError ||
      descriptionError ||
      slugError ||
      photoSizeError ||
      !name ||
      !slug ||
      !agreeCoC
    ) {
      this.setState({
        createError: true,
      });

      return;
    }

    // clientside checks have passed
    this.setState({
      createError: false,
      isLoading: true,
    });

    // create the mutation input
    const input = {
      name,
      slug,
      description,
      website,
      file,
      coverFile,
      isPrivate,
    };

    // create the community
    this.props
      .createCommunity(input)
      .then(({ data }: CreateCommunityType) => {
        const { createCommunity } = data;
        this.props.communityCreated(createCommunity);
        this.props.dispatch(
          addToastWithTimeout('success', this.props.t('newCommunity:CommunityCreated'))
        );
        return;
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  setPrivate = () => {
    return this.setState({
      isPrivate: true,
    });
  };

  setPublic = () => {
    return this.setState({
      isPrivate: false,
    });
  };

  render() {
    const {
      name,
      slug,
      description,
      image,
      coverPhoto,
      website,
      slugTaken,
      slugError,
      nameError,
      descriptionError,
      createError,
      isLoading,
      agreeCoC,
      photoSizeError,
      communitySuggestions,
      isPrivate,
    } = this.state;

    const suggestionString = slugTaken
      ? communitySuggestions && communitySuggestions.length > 0
        ? this.props.t('newCommunity:WereYouLookingForOneOfTheseCommunities')
        : null
      : this.props.t('newCommunity:ThisCommunityNameAndUrlAreAvailable');

    return (
      <FormContainer data-cy="create-community-form">
        <Form>
          <ImageInputWrapper>
            {coverPhoto && !/default_images/.test(coverPhoto) && (
              <DeleteCoverWrapper>
                <DeleteCoverButton onClick={e => this.deleteCoverPhoto(e)}>
                  <Icon glyph="view-close-small" size={'16'} />
                </DeleteCoverButton>
              </DeleteCoverWrapper>
            )}
            <CoverInput
              onChange={this.setCommunityCover}
              defaultValue={coverPhoto}
              preview={true}
              allowGif
            />

            <PhotoInput
              type={'community'}
              onChange={this.setCommunityPhoto}
              defaultValue={image}
            />
          </ImageInputWrapper>

          {photoSizeError && (
            <Notice style={{ marginTop: '32px' }}>
              {this.props.t('newCommunity:PhotoUploadsShouldBeLessThan3mb')}
            </Notice>
          )}

          <Spacer height={8} />

          {/* <Input
            defaultValue={name}
            onChange={this.changeName}
            autoFocus={!(window.innerWidth < 768)}
            onBlur={this.checkSuggestedCommunities}
            dataCy="community-name-input">
            What is your community called?
          </Input> */}
          <LabelWrapper>
            <Label htmlFor="name">
              {this.props.t('newCommunity:WhatIsYourCommunityCalled')}
            </Label>
            <TextField 
              name="name"
              defaultValue={name}
              onChange={this.changeName}
              autoFocus={!(window.innerWidth < 768)}
              onBlur={this.checkSuggestedCommunities}
              dataCy="community-name-input"
            />

            {nameError && (
              <Error>
                {this.props.t('newCommunity:CommunityNameError')}
              </Error>
            )}
          </LabelWrapper>

          <UnderlineInput
            defaultValue={slug}
            onChange={this.changeSlug}
            onBlur={this.checkSuggestedCommunities}
            dataCy="community-slug-input"
          >
            parabaik.com/
          </UnderlineInput>

          {slugTaken && (
            <Error>
              {this.props.t('CommunityURLError',{name:name})}
            </Error>
          )}

          {slugError && <Error>{this.props.t('SlugError')}</Error>}

          {suggestionString &&
            !nameError &&
            !slugError &&
            communitySuggestions &&
            communitySuggestions.length > 0 && (
              <CommunitySuggestionsText>
                {suggestionString}
              </CommunitySuggestionsText>
            )}

          <CommunitySuggestionsWrapper>
            {!nameError &&
              !slugError &&
              communitySuggestions &&
              communitySuggestions.length > 0 &&
              communitySuggestions.map(suggestion => {
                return (
                  <Link to={`/${suggestion.slug}`} key={suggestion.id}>
                    <CommunitySuggestion>
                      <CommunityAvatar
                        size={20}
                        community={suggestion}
                        isClickable={false}
                        showHoverProfile={false}
                      />
                      <strong>{suggestion.name}</strong>{' '}
                      {suggestion.metaData.members.toLocaleString()} members
                    </CommunitySuggestion>
                  </Link>
                );
              })}
          </CommunitySuggestionsWrapper>

          <LabelWrapper>
            <Label htmlFor="description">
              {this.props.t('newCommunity:DescribeItIn140CharactersOrLess')}
            </Label>

            <TextArea
              name="description"
              defaultValue={description}
              onChange={this.changeDescription}
              dataCy="community-description-input"
            />
            {descriptionError && (
              <Error>
                {this.props.t('newCommunity:DescriptionError')}
              </Error>
            )}
              
          </LabelWrapper>
          {/* <TextArea
            defaultValue={description}
            onChange={this.changeDescription}
            dataCy="community-description-input"
          >
            Describe it in 140 characters or less
          </TextArea>

          {descriptionError && (
            <Error>
              Oops, there may be some invalid characters or the text is too big
              (max: 140 characters) - try trimming that up.
            </Error>
          )} */}

          {/* <Input
            defaultValue={website}
            onChange={this.changeWebsite}
            dataCy="community-website-input"
          >
            Optional: Add your community’s website
          </Input> */}

        <LabelWrapper>
          <Label htmlFor="website">
            {this.props.t('newCommunity:OptionalAddYourCommunityWebsite')}
          </Label>
          <TextField 
            name="website"
            defaultValue={website}
            onChange={this.changeWebsite}
            dataCy="community-website-input"
          />
        </LabelWrapper>

          <PrivacySelector>
            <PrivacyOption selected={!isPrivate} onClick={this.setPublic}>
              <PrivacyOptionLabel>
                <input
                  type="radio"
                  value="public"
                  checked={!isPrivate}
                  onChange={this.setPublic}
                  data-cy="community-public-selector-input"
                />
                {this.props.t('Public')}
              </PrivacyOptionLabel>
              <PrivacyOptionText>
                {this.props.t('newCommunity:publicDescription')}
              </PrivacyOptionText>
            </PrivacyOption>

            <PrivacyOption selected={isPrivate} onClick={this.setPrivate}>
              <PrivacyOptionLabel>
                <input
                  type="radio"
                  checked={isPrivate}
                  value="private"
                  onChange={this.setPrivate}
                  data-cy="community-private-selector-input"
                />                
                {this.props.t('Private')}
              </PrivacyOptionLabel>
              <PrivacyOptionText>
                {this.props.t('newCommunity:privateDescription')}
              </PrivacyOptionText>
            </PrivacyOption>
          </PrivacySelector>

          <Checkbox
            id="isPrivate"
            checked={agreeCoC}
            onChange={this.changeCoC}
            dataCy="community-coc-input"
          >
            <span>
              I have read the{' '}
              <a
                href="https://github.com/withspectrum/code-of-conduct"
                target="_blank"
                rel="noopener noreferrer"
              >
                Parabaik Code of Conduct
              </a>{' '}
              and agree to enforce it in my community.
            </span>
          </Checkbox>

          {createError && (
            <Error>
              {this.props.t('newCommunity:CreateError')}
            </Error>
          )}
        </Form>

        <Actions>
          <div />
          <ThemedButton
            appearance="primary"
            onClick={this.create}
            isDisabled={
              slugTaken ||
              slugError ||
              nameError ||
              createError ||
              descriptionError ||
              !name ||
              !agreeCoC
            }
            isLoading={isLoading}
            data-cy="community-create-button">
            {isLoading ? this.props.t('Creating') : this.props.t('CreateCommunityContinue')}
          </ThemedButton>
          {/* <PrimaryOutlineButton
            onClick={this.create}
            disabled={
              slugTaken ||
              slugError ||
              nameError ||
              createError ||
              descriptionError ||
              !name ||
              !agreeCoC
            }
            loading={isLoading}
            data-cy="community-create-button"
          >
            {isLoading ? 'Creating...' : 'Create Community & Continue'}
          </PrimaryOutlineButton> */}
        </Actions>
      </FormContainer>
    );
  }
}

export default compose(
  createCommunityMutation,
  withRouter,
  connect(),
  withApollo
)(withTranslation(['common','newCommunity'])(CreateCommunityForm));
