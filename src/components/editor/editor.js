import { withApollo } from 'react-apollo';
import { searchUsersQuery } from 'shared/graphql/queries/search/searchUsers';
import { RichUtils } from 'draft-js';
import Prism from 'prismjs';
import React, { useState, Fragment, Component } from 'react';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  SupButton,
  SubButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createInlineToolbarPlugin,{ Separator } from 'draft-js-inline-toolbar-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';

// custom plugin
import createVideoPlugin from './customPlugins/draft-js-video-plugin';
import createAlignmentPlugin from './customPlugins/alignPlugin';
import createSideToolbarPlugin from './customPlugins/sideToolbarPlugin';
// import createDividerPlugin from './customPlugins/dividerPlugin';
import createImagePlugin from './customPlugins/draft-js-image-plugin';
import createBlockDndPlugin from './customPlugins/draft-js-drag-n-drop-plugin';
import createPrismPlugin from './customPlugins/codeBlockAdd/prismPlugin';
import createCodeEditorTabKeyPlugin from './customPlugins/codeEditorTabKeyPlugin';
import createResizeablePlugin from './customPlugins/draft-js-resizeable-plugin';
import createDndFileUploadPlugin from './customPlugins/draft-js-drag-n-drop-upload-plugin';
import CustomImageComponent from './comp/ImageAdd/CustomImageComponent';



import 'draft-js-mention-plugin/lib/plugin.css';


import inlineButtonDarkStyles from './styles/inlineButtonDarkStyles.module.css';
import inlineToolbarDarkStyles from './styles/inlineToolbarDarkStyles.module.css';
import sideToolbarStyles from './styles/sideToolbarStyles.module.css';
import sideButtonDarkStyles  from './styles/sideButtonDarkStyles.module.css';
import blockTypeSelectDarkStyles  from './styles/blockTypeSelectDarkStyles.module.css';
import dividerStyles from './styles/dividerStyles.module.css';
import linkStyles from './styles/linkStyles.module.css';
import alignButtonDarkStyles from './styles/alignButtonDarkStyles.module.css';
import alignInputDarkStyles from './styles/alignInputStyles.module.css';
import alignmentToolDarkStyles from './styles/alignmentToolDarkStyles.module.css';
import videoStyles from './styles/videoStyles.module.css';
import imageStyles from './styles/imageStyles.module.css';
import mentionsStyles from './styles/mentions.module.css';


// Custom Button and component;
import HeadlinesButton from './comp/HeadlinesButton';
import { BlockquoteButton } from './comp/CustomeButton'

import { themed  } from 'src/components/theme';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

import { EditorInput } from './styled';

const Entry = (props) => {
  const {
    mention,
    theme,
    searchValue, // eslint-disable-line no-unused-vars
    isFocused, // eslint-disable-line no-unused-vars
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <div className={theme.mentionSuggestionsEntryContainer}>
        <div className={theme.mentionSuggestionsEntryContainerLeft}>
          <img
            src={mention.avatar}
            className={theme.mentionSuggestionsEntryAvatar}
            role="presentation"
          />
        </div>

        <div className={theme.mentionSuggestionsEntryContainerRight}>
          <div className={theme.mentionSuggestionsEntryText}>
            {mention.name}
          </div>

          <div className={theme.mentionSuggestionsEntryTitle}>
            {mention.title}
          </div>
        </div>
      </div>
    </div>
  );
};


const positionSuggestions = ({ state, props }) => {
  let transform;
  let transition;

  if (state.isActive && props.suggestions.length > 0) {
    transform = 'scaleY(1)';
    transition = 'all 0.25s cubic-bezier(.3,1.2,.2,1)';
  } else if (state.isActive) {
    transform = 'scaleY(0)';
    transition = 'all 0.25s cubic-bezier(.3,1,.2,1)';
  }

  return {
    transform,
    transition,
  };
};


const mentionPlugin = createMentionPlugin({
  mentions: [],
  entityMutability: 'IMMUTABLE',
  theme: mentionsStyles,
  positionSuggestions,
  mentionPrefix: '@',
  supportWhitespace: true
});

const { MentionSuggestions } = mentionPlugin;
const emojiPlugin = createEmojiPlugin();

const prismPlugin = createPrismPlugin({
  prism: Prism
})

const codeEditorTabKeyPlugin = createCodeEditorTabKeyPlugin()


const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin({
  horizontal: 'relative',
  vertical: 'auto'
});
const blockDndPlugin = createBlockDndPlugin();


const linkPlugin = createLinkPlugin({
  theme: linkStyles,
  placeholder: 'http://…'
});

const inlineToolbarPlugin = createInlineToolbarPlugin({
  theme: { 
    buttonStyles:inlineButtonDarkStyles, 
    toolbarStyles: inlineToolbarDarkStyles,
  }
});
const sideToolbarPlugin = createSideToolbarPlugin({
  position: 'left',
  theme: { 
    buttonStyles: sideButtonDarkStyles, 
    toolbarStyles: sideToolbarStyles, 
    blockTypeSelectStyles: blockTypeSelectDarkStyles
  },
  options : { // add new options object to handle toolbar
    onlyShowOnEmptyBlock: false, // if it's true, toolbar only shows when it's empty block
  },
});
const alignmentPlugin = createAlignmentPlugin({
  theme:{
    inputStyles: alignInputDarkStyles,
    buttonStyles: alignButtonDarkStyles,
    alignmentToolStyles: alignmentToolDarkStyles,
  }
});

const ImgDecorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  alignmentPlugin.decorator,
  blockDndPlugin.decorator
);


const VideoDecorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  alignmentPlugin.decorator,
  blockDndPlugin.decorator
);

const videoPlugin = createVideoPlugin({
  theme:videoStyles, 
  decorator:VideoDecorator 
});

const imagePlugin = createImagePlugin({
  theme:imageStyles,
  decorator:ImgDecorator,
  // imageComponent: CustomImageComponent,
});


const { SideToolbar } = sideToolbarPlugin;
const { InlineToolbar } = inlineToolbarPlugin;
const { LinkButton } = linkPlugin;
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  focusPlugin.decorator,
);

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  linkifyPlugin,
  linkPlugin,
  focusPlugin,
  resizeablePlugin,
  blockDndPlugin,
  videoPlugin,
  imagePlugin,
  alignmentPlugin,
  prismPlugin,
  codeEditorTabKeyPlugin,
  emojiPlugin,
  mentionPlugin
]
/* eslint-disable */


const cleanSuggestionUserObject = (user: ?Object) => {
  if (!user) return null;
  return {
    ...user,
    name: user.name.toLowerCase(),
    link: user.username,
    avatar: user.profilePhoto,
  };
};


class CustomImageEditor extends Component {

  state = {
    suggestions: [],
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'CODE': return 'short-code';
      case 'code-block': return 'language-javascript';
      case 'blockquote': return 'superFancyBlockquote';
      default: return null;
    }
  }

  onSearchChange = async ({ value = "" }) => {
    const {
      data: { search },
    } = await this.props.client.query({
      query: searchUsersQuery,
      variables: {
        queryString: value,
        type: 'USERS',
      },
    });

    if (!search || !search.searchResultsConnection) {
      this.setState({
        suggestions: [],
      });
      return;
    }

    let searchUsers = search.searchResultsConnection.edges
      .filter(Boolean)
      .filter(edge => edge.node.username)
      .map(edge => {
        const user = edge.node;
        return cleanSuggestionUserObject(user)
      });
    this.setState({
      suggestions: searchUsers,
    });
  };

  onAddMention = () => {
    // get the mention object selected
  }



  // searchUsers = async (queryString, callback) => {
  //   console.log("SpectrumMentionsInput", queryString)

  //   const {
  //     data: { search },
  //   } = await props.client.query({
  //     query: searchUsersQuery,
  //     variables: {
  //       queryString,
  //       type: 'USERS',
  //     },
  //   });
  //   console.log("search",search)

  //   if (!search || !search.searchResultsConnection) {
  //     if (staticSuggestions && staticSuggestions.length > 0)
  //       return staticSuggestions;
  //     return;
  //   }

  //   let searchUsers = search.searchResultsConnection.edges
  //     .filter(Boolean)
  //     .filter(edge => edge.node.username)
  //     .map(edge => {
  //       const user = edge.node;
  //       return cleanSuggestionUserObject(user);
  //     });

  //   // Prepend the filtered participants in case a user is tabbing down right now
  //   const fullResults = [...staticSuggestions, ...searchUsers];
  //   const uniqueResults = [];
  //   const done = [];

  //   fullResults.forEach(item => {
  //     if (done.indexOf(item.username) === -1) {
  //       uniqueResults.push(item);
  //       done.push(item.username);
  //     }
  //   });

  //   return callback(uniqueResults.slice(0, 8));
  // };


   
  render() {

    const uploadPlugin = createDndFileUploadPlugin({
      handleUpload: this.props.uploadImage,
      imagePlugin: imagePlugin,
      dispatch: this.props.dispatch,
      t: this.props.t,
    });
    const newPlugin = [...plugins, uploadPlugin]



    // const _mapKeyToEditorCommand = (e) => {
    //   switch (e.keyCode) {
    //    case 9: // TAB
    //     const newEditorState = RichUtils.onTab(e,this.props.body,4);
    //     if (newEditorState !== this.props.body) {
    //       this.props.changeBody(newEditorState);
    //     }
    //     return;
    //   }
    //   return getDefaultKeyBinding(e);
    // }

    const changeIndent = (e, indentDirection) => {
      e.preventDefault()
      if(indentDirection && indentDirection === 'decrease'){
        e.shiftKey = true
      }
      const currentBlockType = RichUtils.getCurrentBlockType(this.props.body)
      if(currentBlockType === 'ordered-list-item' || currentBlockType === 'unordered-list-item'){
        this.props.changeBody(RichUtils.onTab(e, this.props.body, 4))
      }
    }
  
  
    // const onKeyPressed = (event) => {
    //   if (event.key === 'Tab') {
    //     const newEditorState = RichUtils.onTab(
    //       event,
    //       this.props.body,
    //       4 /* maxDepth */
    //     );
    //     if (newEditorState !== this.props.body) {
    //       this.props.changeBody(newEditorState);
    //     }
    //     event.preventDefault();
    //   }
    // }
  
    return (
      <EditorInput onClick={this.focus}>  
        <Editor
          onTab={changeIndent}
          editorState={this.props.body}
          onChange={this.props.changeBody}
          plugins={newPlugin}
          ref={this.props.ref}
          placeholder={this.props.placeholder}
          blockStyleFn={this.getBlockStyle}
          customStyleMap={{
            CODE: {
              background: '#091E42',
              color: "#FFFFFF",
              textShadow: '0 1px white',
              fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
              fontSize: "1em",
              textAlign: "left",
              wordSpacing: "normal",
              wordBreak: "normal",
              wordWrap: "normal",
              lineHeight: 1.5,
              tabSize: 4,
              hyphens: "none",
              textShadow: "none",
              padding: 2,
              margin: ".5em",
              overflow: "auto",
              borderRadius: 3,
            },
            blockquote: {
              fontFamily: "Hoefler Text, Georgia, serif",
              fontSize: "1.2em",
              margin: 0,
              borderLeft: "4px solid rgba(9, 30, 66, 0.64)",
              backgroundColor: "rgba(9, 30, 66, 0.08)",
            },
      
            SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
            SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' }
          }}     
        />
          <InlineToolbar>
             {(externalProps) => (
              <Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <SupButton {...externalProps} />
                <SubButton {...externalProps} />
                <CodeButton {...externalProps} />
                <HeadlinesButton {...externalProps}/>
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <LinkButton {...externalProps} />
              </Fragment>
            )}
          </InlineToolbar>
          {/* <SideToolbar>
            {(externalProps) => (
              <Fragment>
                <DividerButton {...externalProps} />
              </Fragment>
            )}
          </SideToolbar> */}
          <AlignmentTool />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={this.onAddMention}
            entryComponent={Entry}
          />

      </EditorInput>
    );
  }
}

export default withApollo(CustomImageEditor)


