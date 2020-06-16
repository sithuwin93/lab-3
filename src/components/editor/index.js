import React, { Component } from 'react';
import Editor from './editor'
import TitleInput from './title';


export default class EditorComponent extends Component {

  render() {
    const { innerRef, title,body, changeTitle, changeBody  } = this.props;
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
        />
      </div>
    )
  }
}
