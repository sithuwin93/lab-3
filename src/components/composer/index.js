// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import { withRouter, type History, type Location } from 'react-router';
import { connect } from 'react-redux';
import debounce from 'debounce';
import Icon from 'src/components/icon';
import { openModal, closeModal } from 'src/actions/modals';
import getThreadLink from 'src/helpers/get-thread-link';
import { addToastWithTimeout } from 'src/actions/toasts';
import getComposerCommunitiesAndChannels from 'shared/graphql/queries/composer/getComposerCommunitiesAndChannels';
import type { GetComposerType } from 'shared/graphql/queries/composer/getComposerCommunitiesAndChannels';
import publishThread from 'shared/graphql/mutations/thread/publishThread';
import { setTitlebarProps } from 'src/actions/titlebar';
import uploadImage, {
  type UploadImageInput,
  type UploadImageType,
} from 'shared/graphql/mutations/uploadImage';
import Head from 'src/components/head';
import { TextButton } from 'src/components/button';
import { PrimaryButton } from 'src/components/button';
import Tooltip from 'src/components/tooltip';
import {
  MediaLabel,
  MediaInput,
} from 'src/components/chatInput/components/style';
import type { Dispatch } from 'redux';
import {
  Overlay,
  Container,
  Actions,
  DisabledWarning,
  InputHints,
  DesktopLink,
  ButtonRow,
  Wrapper,
} from './style';
import { ESC, ENTER } from 'src/helpers/keycodes';
import Inputs from './inputs';
import ComposerLocationSelectors from './LocationSelectors';
import {
  getDraftThread,
  storeDraftThread,
  clearDraftThread,
} from 'src/helpers/thread-draft-handling';
import { ThemedButton } from 'src/components/button-new';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import Editor from 'src/components/editor';
import {
  convertToRaw,
  convertFromRaw,
  EditorState,
} from 'draft-js';

import {
  InputsGrid,
} from './style';
import createImagePlugin from 'src/components/editor/customPlugins/draft-js-image-plugin';
import InlineDialog from 'src/components/inline-dialog';
import Button from 'src/components/button-new'
import Modal, { ModalTransition } from 'src/components/modal-dialog';
import EmbedInputComponent from 'src/components/editor/customPlugins/draft-js-video-plugin/EmbedInput'
import createVideoPlugin from  'src/components/editor/customPlugins/draft-js-video-plugin';
import { moveSelectionToEnd } from 'src/components/editor/utils';

type State = {
  title: string,
  body: string,
  isLoading: boolean,
  postWasPublished: boolean,
  preview: boolean,
  selectedChannelId: ?string,
  selectedCommunityId: ?string,
};

type Props = {
  data: {
    user: GetComposerType,
    refetch: Function,
    loading: boolean,
  },
  uploadImage: (input: UploadImageInput) => Promise<UploadImageType>,
  dispatch: Dispatch<Object>,
  publishThread: Function,
  history: History,
  location: Location,
  websocketConnection: string,
  networkOnline: boolean,
  isEditing: boolean,
  isModal?: boolean,
  previousLocation?: Location,
  t: i18n.TFunction
};
const imagePlugin = createImagePlugin();
const videoPlugin = createVideoPlugin();

export const DISCARD_DRAFT_MESSAGE =
  'Are you sure you want to discard this draft?';

// We persist the body and title to localStorage
// so in case the app crashes users don't loose content



class ComposerWithData extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.bodyEditor = React.createRef();

    this.state = {
      title: '',
      body: EditorState.createEmpty(),
      isLoading: false,
      postWasPublished: false,
      preview: false,
      selectedChannelId: '',
      selectedCommunityId: '',
      embedding: false
    };

    this.persistBodyToLocalStorageWithDebounce = debounce(
      this.persistBodyToLocalStorageWithDebounce,
      500
    );
    this.persistTitleToLocalStorageWithDebounce = debounce(
      this.persistTitleToLocalStorageWithDebounce,
      500
    );
  }

  embToggleDialog = () => this.setState({ embDialogOpen: !this.state.embDialogOpen });
  removeStorage = async () => {
    await clearDraftThread();
  };

  getTitleAndBody = () => {
    const { body: storedBody, title: storedTitle } = getDraftThread();
    return {
      storedBody,
      storedTitle,
    };
  };

  componentDidMount(){
    this.titleInput.focus();
    this.titleInput.style.height = 'inherit';
    this.titleInput.style.height = `${this.titleInput.scrollHeight}px`;
  }
  
  componentWillMount() {
    let { storedBody, storedTitle } = this.getTitleAndBody();

    const { body } = this.state;
    const content = body.getCurrentContent();
    const isEditorEmpty = content.hasText();
    this.setState({
      title: this.state.title || storedTitle || '',
      // body: this.state.body || storedBody || '',
      body: isEditorEmpty || storedBody || EditorState.createEmpty(),
    });
  }

  componentDidMount() {
    const { dispatch, t } = this.props;
    dispatch(
      setTitlebarProps({
        title: t('NewPost'),
      })
    );

    // $FlowIssue
    document.addEventListener('keydown', this.handleGlobalKeyPress, false);
  }

  componentWillUnmount() {
    // $FlowIssue
    document.removeEventListener('keydown', this.handleGlobalKeyPress, false);
    const { postWasPublished } = this.state;

    // if a post was published, in this session, clear redux so that the next
    // composer open will start fresh
    if (postWasPublished) return;

    // otherwise, clear the composer normally and save the state
    return;
  }

  
  handleGlobalKeyPress = e => {
    const esc = e && e.keyCode === ESC;
    const enter = e.keyCode === ENTER;
    const cmdEnter = e.keyCode === ENTER && e.metaKey;

    // we need to verify the source of the keypress event
    // so that if it comes from the discard draft modal, it should not
    // listen to the events for composer
    const innerText = e.target.innerText;
    const modalIsOpen = innerText.indexOf(DISCARD_DRAFT_MESSAGE) >= 0;

    if (esc && modalIsOpen) {
      e.stopPropagation();
      this.props.dispatch(closeModal());
      return;
    }

    if (enter && modalIsOpen) {
      e.stopPropagation();
      this.discardDraft();
      return;
    }

    const composerHasContent = this.composerHasContent();

    if (esc && composerHasContent) {
      this.discardDraft();
      return;
    }

    if (esc && !composerHasContent) {
      return this.closeComposer();
    }

    if (cmdEnter && !modalIsOpen) return this.publishThread();
  };

  composerHasContent = () => {
    const { title, body } = this.state;
    const content = body.getCurrentContent();
    const isEditorEmpty = !content.hasText();
    // return title !== '' || body !== '';
    return title != '' || isEditorEmpty
  };

  changeTitle = e => {
    const title = e.target.value;
    this.persistTitleToLocalStorageWithDebounce();
    if (/\n$/g.test(title)) {
      this.bodyEditor.focus && this.bodyEditor.focus();
      return;
    }
    this.setState({
      title,
    });
  };

  editorFocus = () => this.bodyEditor.focus();
  // changeBody = evt => {
  //   const body = evt.target.value;
  //   this.persistBodyToLocalStorageWithDebounce();
  //   this.setState({
  //     body,
  //   });
  // };

  changeBody = body => {
    this.persistBodyToLocalStorageWithDebounce();
    this.setState({
      body,
    });
  };


  closeComposer = (clear?: any) => {
    this.persistBodyToLocalStorage();
    this.persistTitleToLocalStorage();

    // we will clear the composer if it unmounts as a result of a post
    // being published or draft discarded, that way the next composer open will start fresh
    if (clear) {
      this.clearEditorStateAfterPublish();
      this.setState({
        title: '',
        body: EditorState.createEmpty(),
        preview: false,
      });
    }

    if (this.props.previousLocation)
      return this.props.history.push({
        ...this.props.previousLocation,
        state: { modal: false },
      });

    return this.props.history.goBack({ state: { modal: false } });
  };

  discardDraft = () => {
    const composerHasContent = this.composerHasContent();

    if (!composerHasContent) {
      return this.closeComposer();
    }

    this.props.dispatch(
      openModal('CLOSE_COMPOSER_CONFIRMATION_MODAL', {
        message: DISCARD_DRAFT_MESSAGE,
        closeComposer: () => this.closeComposer('clear'),
      })
    );
  };

  clearEditorStateAfterPublish = () => {
    try {
      this.removeStorage();
    } catch (err) {
      console.error(err);
    }
  };

  onCancelClick = () => {
    this.discardDraft();
  };

  handleTitleBodyChange = (key: 'title' | 'body') => {
    storeDraftThread({
      [key]: this.state[key],
    });
  };

  persistBodyToLocalStorageWithDebounce = () => {
    if (!localStorage) return;
    this.handleTitleBodyChange('body');
  };

  persistTitleToLocalStorageWithDebounce = () => {
    if (!localStorage) return;
    this.handleTitleBodyChange('title');
  };

  persistTitleToLocalStorage = () => {
    if (!localStorage) return;
    this.handleTitleBodyChange('title');
  };

  persistBodyToLocalStorage = () => {
    if (!localStorage) return;
    this.handleTitleBodyChange('body');
  };

  uploadFile = evt => {
    this.uploadFiles(evt.target.files);
  };

  uploadFiles = files => {
    // const uploading = `![Uploading ${files[0].name}...]()`;
    // let caretPos = this.bodyEditor.selectionStart;

    // this.setState(
    //   ({ body }) => ({
    //     isLoading: true,
    //     body:
    //       body.substring(0, caretPos) +
    //       uploading +
    //       body.substring(this.bodyEditor.selectionEnd, this.state.body.length),
    //   }),
    //   () => {
    //     caretPos = caretPos + uploading.length;
    //     this.bodyEditor.selectionStart = caretPos;
    //     this.bodyEditor.selectionEnd = caretPos;
    //     this.bodyEditor.focus();
    //   }
    // );

    return this.props
      .uploadImage({
        image: files[0],
        type: 'threads',
      })
      .then(({ data }) => {
        this.changeBody(
          imagePlugin.addImage(
            this.state.body,
            data.uploadImage,
          )
        );
        // this.setState({
        //   isLoading: false,
        // });
        // this.changeBody({
        //   target: {
        //     value: this.state.body.replace(
        //       uploading,
        //       `![${files[0].name}](${data.uploadImage})`
        //     ),
        //   },
        // });
      })
      .catch(err => {
        // console.error({ err });
        // this.setState({
        //   isLoading: false,
        // });
        // this.changeBody({
        //   target: {
        //     value: this.state.body.replace(uploading, ''),
        //   },
        // });
        this.props.dispatch(
          addToastWithTimeout(
            'error',
            this.props.t('UploadingImageFailed', {err: err.message})
          )
        );
      });
  };


  addEmbedUrl = url => {
    this.changeBody(
      videoPlugin.addVideo(
        moveSelectionToEnd(this.state.body),
        { src: url }
      )
    );
    this.closeEmbedding();
  }

  publishThread = () => {
    // if no title and no channel is set, don't allow a thread to be published
    if (
      !this.state.title ||
      !this.state.selectedCommunityId ||
      !this.state.selectedChannelId
    ) {
      return;
    }

    // isLoading will change the publish button to a loading spinner
    this.setState({
      isLoading: true,
    });

    const { dispatch, networkOnline, websocketConnection } = this.props;

    if (!networkOnline) {
      return dispatch(
        addToastWithTimeout(
          'error',
          this.props.t('NotConnectedToTheInternet')
        )
      );
    }

    if (
      websocketConnection !== 'connected' &&
      websocketConnection !== 'reconnected'
    ) {
      return dispatch(
        addToastWithTimeout(
          'error',
          this.props.t('ErrorConnectingToTheServer')
        )
      );
    }

    // define new constants in order to construct the proper shape of the
    // input for the publishThread mutation
    const { selectedChannelId, selectedCommunityId, title, body } = this.state;
    const channelId = selectedChannelId;
    const communityId = selectedCommunityId;

    const contentState = body.getCurrentContent();
    const raw = convertToRaw(contentState)
    const content = {
      title: title.trim(),
      // workaround react-mentions bug by replacing @[username] with @username
      // @see withspectrum/spectrum#4587
      // body: body.replace(/@\[([a-z0-9_-]+)\]/g, '@$1'),
      body: JSON.stringify(raw),
    };

    // this.props.mutate comes from a higher order component defined at the
    // bottom of this file
    const thread = {
      channelId,
      communityId,
      // NOTE(@mxstbr): On android we send plain text content
      // which is parsed as markdown to draftjs on the server
      type: 'DRAFTJS',
      content,
      // filesToUpload,
    };

    // one last save to localstorage
    this.persistBodyToLocalStorage();
    this.persistTitleToLocalStorage();

    this.props
      .publishThread(thread)
      // after the mutation occurs, it will either return an error or the new
      // thread that was published
      .then(({ data }) => {
        this.clearEditorStateAfterPublish();

        // stop the loading spinner on the publish button
        this.setState({
          isLoading: false,
          postWasPublished: true,
          title: '',
          body: EditorState.createEmpty(),
        });

        // redirect the user to the thread
        // if they are in the inbox, select it
        this.props.dispatch(
          addToastWithTimeout('success', this.props.t('ThreadPublished'))
        );
        if (this.props.location.pathname === '/new/thread') {
          this.props.history.replace(getThreadLink(data.publishThread));
        } else {
          this.props.history.push(getThreadLink(data.publishThread));
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

  setSelectedCommunity = (id: string) => {
    return this.setState({ selectedCommunityId: id });
  };

  setSelectedChannel = (id: string) => {
    return this.setState({ selectedChannelId: id });
  };
  openEmbedding = () => {
    this.setState({ embedding: true })
  }

  closeEmbedding = () => {
    this.setState({ embedding: false })
  }
  render() {
    const {
      title,
      isLoading,
      selectedChannelId,
      selectedCommunityId,
      embedding,
    } = this.state;
    const {
      networkOnline,
      websocketConnection,
      isEditing,
      isModal,
    } = this.props;

    const networkDisabled =
      !networkOnline ||
      (websocketConnection !== 'connected' &&
        websocketConnection !== 'reconnected');

    return (
      <Wrapper data-cy="thread-composer-wrapper">
        <Head title={'New post'} description={'Write a new post'} />
        <Overlay
          isModal={isModal}
          onClick={this.discardDraft}
          data-cy="overlay"
        />

        <Container data-cy="modal-container" isModal={isModal} elevation="e200">
          <ComposerLocationSelectors
            selectedChannelId={selectedChannelId}
            selectedCommunityId={selectedCommunityId}
            onCommunitySelectionChanged={this.setSelectedCommunity}
            onChannelSelectionChanged={this.setSelectedChannel}
          />
          <InputsGrid>
            <Editor 
              title={this.state.title}
              body={this.state.body}
              changeBody={this.changeBody}
              changeTitle={this.changeTitle}
              innerRef={(input) => { this.titleInput = input; }}
              bodyRef={ref => (this.bodyEditor = ref)}
              editorFocus={this.editorFocus}
              uploadImage={this.props.uploadImage}
              dispatch={this.props.dispatch}
              t={this.props.t}/>
          </InputsGrid>
          {/* <Inputs
            title={this.state.title}
            body={this.state.body}
            changeBody={this.changeBody}
            changeTitle={this.changeTitle}
            uploadFiles={this.uploadFiles}
            autoFocus={true}
            bodyRef={ref => (this.bodyEditor = ref)}
            onKeyDown={this.handleGlobalKeyPress}
            isEditing={isEditing}
          /> */}

          {networkDisabled && (
            <DisabledWarning>
              {this.props.t('LostConnectionToTheInternetOrServer')}
            </DisabledWarning>
          )}
          <Actions>
            <InputHints>
              <Tooltip content={this.props.t('UploadPhoto')}>
                <MediaLabel>
                  <MediaInput
                    type="file"
                    accept={'.png, .jpg, .jpeg, .gif, .mp4'}
                    multiple={false}
                    onChange={this.uploadFile}
                  />
                  <Icon glyph="photo" />
                </MediaLabel>
              </Tooltip>
              {!embedding && (
                <Tooltip content={this.props.t('UploadPhoto')}>
                  <MediaLabel>
                    <Icon glyph="embed" onClick={this.openEmbedding}/>
                  </MediaLabel>
                </Tooltip>
              )}
              </InputHints>
              {embedding && (
                <EmbedInputComponent
                  onSubmit={this.addEmbedUrl}
                  close={this.closeEmbedding}
                />
              )}
            {!embedding && (
              <ButtonRow>
                <ThemedButton
                  appearance="subtle"
                  data-cy="composer-cancel-button"
                  onClick={this.discardDraft}>
                  {this.props.t('Cancel')}
                </ThemedButton>
                <ThemedButton
                  style={{marginLeft:8}}
                  shouldFitContainer
                  appearance="primary"
                  data-cy="composer-publish-button"
                  onClick={this.publishThread}
                  isLoading={isLoading}
                  isDisabled={
                    !title ||
                    title.trim().length === 0 ||
                    isLoading ||
                    networkDisabled ||
                    !selectedChannelId ||
                    !selectedCommunityId
                  }>
                  {isLoading ? this.props.t('Publishing') : this.props.t('Publish')}
                </ThemedButton>
              </ButtonRow>
            )}
          </Actions>
        </Container>
      </Wrapper>
    );
  }
}

// $FlowIssue
const mapStateToProps = state => ({
  websocketConnection: state.connectionStatus.websocketConnection,
  networkOnline: state.connectionStatus.networkOnline,
});

export default compose(
  uploadImage,
  getComposerCommunitiesAndChannels,
  publishThread,
  withRouter,
  connect(mapStateToProps)
)(withTranslation('common')(ComposerWithData));
