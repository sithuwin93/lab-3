// import React, { Fragment, Component } from 'react';
// import Editor from 'draft-js-plugins-editor';

// // offical plugins
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
//   SupButton,
//   SubButton,
//   CodeButton,
//   UnorderedListButton,
//   OrderedListButton,
//   CodeBlockButton,
// } from 'draft-js-buttons';
// import createHashtagPlugin from 'draft-js-hashtag-plugin';
// import createLinkifyPlugin from 'draft-js-linkify-plugin';
// import createInlineToolbarPlugin,{ Separator } from 'draft-js-inline-toolbar-plugin';

// import { EditorWrapper } from './styled';
// import editorStyles from './styles/editorStyles.module.css';
// import './draft.css';
// import './draft-js-inline-toolbar-plugin.css';
// import inlineButtonStyles from './styles/inlineButtonStyles.module.css';
// import inlineButtonDarkStyles from './styles/inlineButtonDarkStyles.module.css';
// import inlineToolbarStyles from './styles/inlineToolbarStyles.module.css';
// import inlineToolbarDarkStyles from './styles/inlineToolbarDarkStyles.module.css';

// const hashtagPlugin = createHashtagPlugin();
// const linkifyPlugin = createLinkifyPlugin();

// const plugins = [
//   linkifyPlugin,
//   hashtagPlugin,
// ];

// let SideToolbar,AlignmentTool,DividerButton,InlineToolbar,EmojiSuggestions,LinkButton,imagePlugin,videoPlugin;

// const theme = 'light'
// export default class UnicornEditor extends Component {

//   constructor(props) {
//     super(props);
//     this.editor = React.createRef();

//     const inlineToolbarPlugin = createInlineToolbarPlugin({
//       theme: { 
//         buttonStyles:theme === 'light' ? inlineButtonStyles:inlineButtonDarkStyles, 
//         toolbarStyles:theme === 'light' ? inlineToolbarStyles: inlineToolbarDarkStyles,
//       }
//     });


//     InlineToolbar = inlineToolbarPlugin.InlineToolbar;
//     this.state = {
//       plugins : [
//         linkifyPlugin,
//         hashtagPlugin,
//         inlineToolbarPlugin,
//       ]
      
//     }
//   }
//   focus = () => this.editor.focus();

//   render() {

//     const editorProps = {
//       spellCheck:true,
//       autoFocus:true,
//       placeholder:" Tell your story... ",
//       editorState: this.props.body,          
//       plugins:this.state.plugins,
//       onChange:this.props.changeBody,
//       // customStyleMap:styleMap,
//       // onTab:this.onTab,
//       // keyBindingFn:this.keyBindingFn,
//       // blockStyleFn:this.getBlockStyle,
//       // handleReturn:this.handleReturn,
//       // handleKeyCommand:this.handleKeyCommand,
//       ref:comp => this.editor = comp,
//       // handlePastedText={() => 'handled'}
//     }


//     return (
//       <EditorWrapper>
//         <div className={editorStyles.editor} onClick={this.focus}>
//           <Editor
//             {...editorProps}
//           />
//            <InlineToolbar />
//           {/* <InlineToolbar>
//             {(externalProps) => (
//               <Fragment>
//                 <BoldButton {...externalProps} />
//                 <ItalicButton {...externalProps} />
//               </Fragment>
//             )}
//           </InlineToolbar> */}
//         </div>
//       </EditorWrapper>
//     );
//   }
// }


import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import editorStyles from './editorStyles.css';
import './draft.css';
import './draft-js-inline-toolbar-plugin.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class SimpleInlineToolbarEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    );
  }
}
