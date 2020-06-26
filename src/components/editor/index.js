import React, { Component } from 'react';
import Editor from './editor'
import TitleInput from './title';


export default class EditorComponent extends Component {

  render() {
    const { innerRef, bodyRef, title,body, changeTitle, changeBody, editorFocus, uploadImage, dispatch, t  } = this.props;
    return (
      <div>
        <TitleInput 
          innerRef={innerRef}
          title={title}
          changeTitle={changeTitle}
        />
        <Editor 
          body={body}
          changeBody={changeBody}
          bodyRef={bodyRef}
          editorFocus={editorFocus}
          uploadImage={uploadImage}
          dispatch={dispatch}
          t={t}
        />
      </div>
    )
  }
}
