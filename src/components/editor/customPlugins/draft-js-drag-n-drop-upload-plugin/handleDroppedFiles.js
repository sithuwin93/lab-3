// import replaceBlock from './modifiers/replaceBlock';
// import modifyBlockData from './modifiers/modifyBlockData';
import { EditorState } from 'draft-js';
import { readFiles } from './utils/file';
import { addToastWithTimeout } from 'src/actions/toasts';

// import { getBlocksWhereEntityData } from './utils/block';

/* function defaultHandleBlock(state, selection, data, defaultBlockType) {
  return addBlock(state, selection, defaultBlockType, data);
} */

export default function onDropFile(config) {
  return function onDropFileInner(
    selection,
    files,
    { getEditorState, setEditorState }
  ) {

    // TODO need to make sure the correct image block is added
    // TODO -> addImage must be passed in. content type matching should happen

    // TODO make sure the Form building also works fine with S3 direct upload

    // Get upload function from config or editor props
    const { handleUpload, imagePlugin, dispatch, t } = config;
    const uploading = `![Uploading ${files[0].name}...]()`;

    if (handleUpload) {
      handleUpload({
        image: files[0],
        type: 'threads',
      })
      .then(({ data }) => {
        setEditorState(
          imagePlugin.addImage(
            getEditorState(),
            data.uploadImage,
          )
        );      
      })
      .catch(err => {
        dispatch(
          addToastWithTimeout(
            'error',
            t('UploadingImageFailed', {err: err.message})
          )
        );
      });

      return 'handled';
    }

    return undefined;
  };
}
