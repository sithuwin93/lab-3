// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import editCommunityMutation from 'shared/graphql/mutations/community/editCommunity';
import type { EditCommunityType } from 'shared/graphql/mutations/community/editCommunity';
import type { GetCommunityType } from 'shared/graphql/queries/community/getCommunity';
import { openModal } from 'src/actions/modals';
import Tooltip from 'src/components/tooltip';
import { addToastWithTimeout } from 'src/actions/toasts';
import { PrimaryOutlineButton } from 'src/components/button';
import { Notice } from 'src/components/listItems/style';
import Icon from 'src/components/icon';
import {
  Input,
  UnderlineInput,
  // TextArea,
  PhotoInput,
  Error,
  CoverInput,
} from 'src/components/formElements';
import {
  Form,
  FormTitle,
  Description,
  Actions,
  TertiaryActionContainer,
  ImageInputWrapper,
  DeleteCoverWrapper,
  DeleteCoverButton,
} from 'src/components/editForm/style';
import { SectionCard, SectionTitle } from 'src/components/settingsViews/style';
import type { Dispatch } from 'redux';
import { ThemedButton } from 'src/components/button-new';
import TextField from 'src/components/textfield';
import TextArea from 'src/components/textarea';
import { LabelWrapper, Label } from '../style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';


type State = {
  name: string,
  slug: string,
  description: string,
  communityId: string,
  website: string,
  image: string,
  coverPhoto: string,
  file: ?Object,
  coverFile: ?Object,
  communityData: Object,
  photoSizeError: boolean,
  nameError: boolean,
  isLoading: boolean,
  t: i18n.TFunction
};

type Props = {
  community: GetCommunityType,
  dispatch: Dispatch<Object>,
  editCommunity: Function,
};

class EditForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const { community } = this.props;
    this.state = {
      name: community.name,
      slug: community.slug,
      description: community.description ? community.description : '',
      communityId: community.id,
      website: community.website ? community.website : '',
      image: community.profilePhoto,
      coverPhoto: community.coverPhoto,
      file: null,
      coverFile: null,
      nameError: false,
      communityData: community,
      photoSizeError: false,
      isLoading: false,
    };
  }

  changeName = e => {
    const name = e.target.value;

    if (name.length > 20) {
      this.setState({
        name,
        nameError: true,
      });

      return;
    }

    this.setState({
      name,
      nameError: false,
    });
  };

  changeDescription = e => {
    const description = e.target.value;
    this.setState({
      description,
    });
  };

  changeSlug = e => {
    const slug = e.target.value;
    this.setState({
      slug,
    });
  };

  changeWebsite = e => {
    const website = e.target.value;
    this.setState({
      website,
    });
  };

  setCommunityPhoto = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (!file) return;

    this.setState({
      isLoading: true,
    });

    if (file && file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
        isLoading: false,
      });
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        // $FlowFixMe
        image: reader.result,
        photoSizeError: false,
        isLoading: false,
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

    this.setState({
      isLoading: true,
    });

    if (file && file.size > 3000000) {
      return this.setState({
        photoSizeError: true,
        isLoading: false,
      });
    }

    reader.onloadend = () => {
      this.setState({
        coverFile: file,
        // $FlowFixMe
        coverPhoto: reader.result,
        photoSizeError: false,
        isLoading: false,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  save = e => {
    e.preventDefault();
    const {
      name,
      description,
      website,
      file,
      coverFile,
      coverPhoto,
      communityId,
      photoSizeError,
    } = this.state;
    const input = {
      name,
      description,
      website,
      file,
      coverFile,
      coverPhoto,
      communityId,
    };

    if (photoSizeError) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    this.props
      .editCommunity(input)
      .then(({ data }: EditCommunityType) => {
        const { editCommunity: community } = data;

        this.setState({
          isLoading: false,
        });

        // community was returned
        if (community !== undefined) {
          this.props.dispatch(
            addToastWithTimeout('success', this.props.t('communitySettings:CommunitySaved'))
          );
        }
        return;
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });

        this.props.dispatch(addToastWithTimeout('error', err.message));
      });
  };

  triggerDeleteCommunity = (e, communityId) => {
    e.preventDefault();
    const { community } = this.props;
    const { name, communityData } = this.state;
    const message = (
      <div>
        <p>
          {t('communitySettings:AreYouSureYouWantToDeleteYourCommunity')}<b>{name}</b>?
        </p>{' '}
        <p>
          <b>{communityData.metaData.members} members</b> will be removed from
          the community and the channels you’ve created will be deleted.
        </p>
        <p>
          All threads, messages, reactions, and media shared in your community
          will be deleted.
        </p>
        <p>This cannot be undone.</p>
      </div>
    );

    return this.props.dispatch(
      openModal('DELETE_DOUBLE_CHECK_MODAL', {
        id: communityId,
        entity: 'community',
        message,
      })
    );
  };

  deleteCoverPhoto = e => {
    e.preventDefault();
    this.setState({ coverPhoto: '', coverFile: null });
  };

  render() {
    const {
      name,
      slug,
      description,
      image,
      coverPhoto,
      website,
      photoSizeError,
      nameError,
      isLoading,
    } = this.state;
    const { community } = this.props;

    if (!community) {
      return (
        <SectionCard elevation="e200">
          <FormTitle>This community doesn’t exist yet.</FormTitle>
          <Description>Want to make it?</Description>
          <Actions>
            {/* <PrimaryOutlineButton>Create</PrimaryOutlineButton> */}
            <ThemedButton
              appearance="primary">
              {t('Create')}
            </ThemedButton>
          </Actions>
        </SectionCard>
      );
    }

    return (
      <SectionCard elevation="e200">
        <SectionTitle>Community Settings</SectionTitle>
        <Form onSubmit={this.save}>
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

          {/* <Input
            dataCy="community-settings-name-input"
            defaultValue={name}
            onChange={this.changeName}
          >
            Name
          </Input> */}
          <LabelWrapper>
            <Label htmlFor="name">
              Name
            </Label>
            <TextField 
              name="name"
              dataCy="community-settings-name-input"
              defaultValue={name}
              onChange={this.changeName}            
            />
          </LabelWrapper>

          <UnderlineInput defaultValue={slug} disabled>
            parabaik.com/
          </UnderlineInput>

          {nameError && (
            <Error>Community names can be up to 20 characters long.</Error>
          )}


          <LabelWrapper>
            <Label htmlFor="description">
              Description
            </Label>
            <TextArea
              name="description"
              defaultValue={description}
              onChange={this.changeDescription}
              dataCy="community-settings-description-input"
            />
          </LabelWrapper>
          {/* <TextArea
            defaultValue={description}
            onChange={this.changeDescription}
            dataCy="community-settings-description-input"
          >
            Description
          </TextArea> */}

          {/* <Input
            defaultValue={website}
            onChange={this.changeWebsite}
            dataCy="community-settings-website-input">
            Optional: Add your community’s website
          </Input> */}

          <LabelWrapper>
            <Label htmlFor="website">
              Optional: Add your community’s website
            </Label>
            <TextField
              name="website"
              defaultValue={website}
              onChange={this.changeWebsite}
              dataCy="community-settings-website-input"
            />
          </LabelWrapper>

          <Actions>
            {/* <PrimaryOutlineButton
              loading={isLoading}
              onClick={this.save}
              disabled={photoSizeError}
              type="submit"
              data-cy="community-settings-edit-save-button"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </PrimaryOutlineButton> */}

            <ThemedButton
              appearance="primary"
              isLoading={isLoading}
              onClick={this.save}
              isDisabled={photoSizeError}
              type="submit"
              data-cy="community-settings-edit-save-button">
              {isLoading ? 'Saving...' : 'Save'}
            </ThemedButton>

            <TertiaryActionContainer>
              {community.communityPermissions.isOwner && (
                <Tooltip content={`Delete ${name}`}>
                  <span>
                    <Icon
                      glyph="delete"
                      color="text.placeholder"
                      hoverColor={'warn.alt'}
                      onClick={e =>
                        this.triggerDeleteCommunity(e, community.id)
                      }
                    />
                  </span>
                </Tooltip>
              )}
            </TertiaryActionContainer>
          </Actions>

          {photoSizeError && (
            <Notice style={{ marginTop: '16px' }}>
              Photo uploads should be less than 3mb
            </Notice>
          )}
        </Form>
      </SectionCard>
    );
  }
}

export default compose(
  connect(),
  editCommunityMutation,
  withRouter
)(withTranslation(['common','usersSettings'])(EditForm));
