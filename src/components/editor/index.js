import React, { Component } from 'react';
import Editor from './editor'
import TitleInput from './title';
import { EditorWrapper } from './styled'


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
        <EditorWrapper>
          <Editor 
            body={body}
            changeBody={changeBody}
            bodyRef={bodyRef}
            editorFocus={editorFocus}
            uploadImage={uploadImage}
            dispatch={dispatch}
            t={t}
          />
        </EditorWrapper>
      </div>
    )
  }
}
