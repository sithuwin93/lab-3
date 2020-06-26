import { EditorState, AtomicBlockUtils } from 'draft-js';
import {
  convertToRaw,
} from 'draft-js';
export default entityType => (editorState, data) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    data
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  console.log("entityKey",entityType)
  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );
  console.log('editorState, data',convertToRaw(newEditorState.getCurrentContent()))

  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getCurrentContent().getSelectionAfter()
  );
};
