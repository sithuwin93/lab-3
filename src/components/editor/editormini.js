import React, { Component } from 'react';
import Editor from './editor'
import { EditorMiniWrapper } from './styled';

export default React.forwardRef((props, ref) => (
  <EditorMiniWrapper 
    style={props.style}
    tabIndex={props.tabIndex} >
    <Editor     
      placeholder={props.placeholder}
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
