// @flow
import * as React from 'react';
import Tooltip from 'src/components/tooltip';
import Icon from 'src/components/icon';
import { Loading } from 'src/components/loading';
import {
  PRO_USER_MAX_IMAGE_SIZE_STRING,
  PRO_USER_MAX_IMAGE_SIZE_BYTES,
} from 'src/helpers/images';
import { MediaLabel, MediaInput, Form } from './style';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

type Props = {
  onValidated: Function,
  onError: Function,
  currentUser: ?Object,
  isSendingMediaMessage: boolean,
  t: i18n.TFunction
};

class Embedd extends React.Component<Props> {
  form: any;

  validate = (validity: Object, file: ?Object) => {
    const { currentUser, t } = this.props;

    if (!currentUser) return  t('YouMustBeSignedInToUploadImages');
    if (!file) return this.props.onError('');
    if (!validity.valid)
      return t('WeCouldntValidateThisUploadPleaseTryUploadingAnotherFile');

    if (file && file.size > PRO_USER_MAX_IMAGE_SIZE_BYTES) {
      return t('TryUploadingAFileLessThanMb', {size:PRO_USER_MAX_IMAGE_SIZE_STRING});
    }

    // if it makes it this far, there is not an error we can detect
    return null;
  };

  validatePreview = (validity: Object, file: ?Object) => {
    const validationResult = this.validate(validity, file);
    if (validationResult !== null) {
      return this.props.onError(validationResult);
    }
    this.props.onError('');
    // clear the form so that another image can be uploaded
    this.clearForm();
    // send back the validated file
    return this.props.onValidated(file);
  };

  onChange = (e: any) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;

    if (!file) return;

    return this.validatePreview(validity, file);
  };

  clearForm = () => {
    if (this.form) {
      this.form.reset();
    }
  };

  componentDidMount() {
    document.addEventListener('paste', this.onPaste, true);
    return this.clearForm();
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.onPaste);
    return this.clearForm();
  }

  onPaste = (event: any) => {
    // Ensure that the image is only pasted if user focuses input
    if (!event || !this.props.inputFocused) {
      return;
    }
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    if (!items) {
      return;
    }
    for (let item of items) {
      if (item.kind === 'file' && item.type.includes('image/')) {
        this.validatePreview({ valid: true }, item.getAsFile());
        break;
      }
    }
  };

  render() {
    const { isSendingMediaMessage } = this.props;

    if (isSendingMediaMessage) {
      return (
        <MediaLabel>
          <Loading />
        </MediaLabel>
      );
    }

    return (
      <Form
        onSubmit={e => e.preventDefault()}
        ref={c => (this.form = c)}
        data-cy="chat-input-media-uploader"
      >
        <Tooltip content={'Embedd'}>
          <MediaLabel>
            <MediaInput
              type="file"
              accept={'.png, .jpg, .jpeg, .gif, .mp4'}
              multiple={false}
              onChange={this.onChange}
            />
            <Icon glyph="embed" />
          </MediaLabel>
        </Tooltip>
      </Form>
    );
  }
}

export default withTranslation('common')(Embedd);
