import React, { Component } from 'react';
import Editor from './editor'
import { EditorMiniWrapper } from './styled';

// export default class EditorMiniComponent extends Component {

//   render() {
//     const { bodyRef, body, changeBody, editorFocus, uploadImage, dispatch, t  } = this.props;
//     return (
//       <EditorMiniWrapper>
//         <Editor 
//           body={body}
//           changeBody={changeBody}
//           bodyRef={bodyRef}
//           editorFocus={editorFocus}
//           uploadImage={uploadImage}
//           dispatch={dispatch}
//           t={t}
//         />
//       </EditorMiniWrapper>
//     )
//   }
// }
export default React.forwardRef((props, ref) => (
  <EditorMiniWrapper>
    <Editor 
      body={props.body}
      changeBody={props.changeBody}
      bodyRef={ref}
      editorFocus={props.editorFocus}
      uploadImage={props.uploadImage}
      dispatch={props.dispatch}
      t={props.t}
    />
  </EditorMiniWrapper>
))
