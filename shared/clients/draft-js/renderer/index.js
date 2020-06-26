// @flow
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Line, Paragraph, BlockQuote } from 'src/components/message/style';
import {
  AspectRatio,
  EmbedContainer,
  EmbedComponent,
} from 'src/components/rich-text-editor/style';
import ThreadAttachment from 'src/components/message/threadAttachment';
import { getStringElements } from '../utils/getStringElements';
import { hasStringElements } from '../utils/hasStringElements';
import mentionsDecorator from '../mentions-decorator';
import linksDecorator from '../links-decorator';
import type { Node } from 'react';
import { SPECTRUM_URLS } from 'shared/regexps';
import type { KeyObj, KeysObj, DataObj } from '../message/types';
import type {
  EmbedData,
  ExternalEmbedData,
  InternalEmbedData,
} from '../../../draft-utils/add-embeds-to-draft-js';
import redraft, { createStylesRenderer, createBlockRenderer } from 'redraft';
import Prism from 'prismjs';
import PrismDecorator from 'draft-js-prism';
import Zoom from 'src/components/image-zoom'
import 'src/components/image-zoom/styles.css'
// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'

import styled from 'styled-components';

const VideoWrapper = styled.div`
  max-width: 480px;
  margin: auto;
`

const ExternalEmbed = (props: { ...ExternalEmbedData, src?: string }) => {
  let { aspectRatio, url, src, width = '100%', height = 200 } = props;

  if (!src && url) src = url;
  if (typeof src !== 'string') return null;

  // if an aspect ratio is passed in, we need to use the EmbedComponent which does some trickery with padding to force an aspect ratio. Otherwise we should just use a regular iFrame
  if (aspectRatio && aspectRatio !== undefined) {
    return (
      <AspectRatio style={{ height }} ratio={aspectRatio}>
        <EmbedComponent
          title={`iframe-${src}`}
          width={width}
          height={height}
          allowFullScreen={true}
          frameBorder="0"
          src={src}
        />
      </AspectRatio>
    );
  } else {
    return (
      <EmbedContainer style={{ height }}>
        <iframe
          title={`iframe-${src}`}
          width={width}
          height={height}
          allowFullScreen={true}
          frameBorder="0"
          src={src}
        />
      </EmbedContainer>
    );
  }
};

const InternalEmbed = (props: InternalEmbedData) => {
  if (props.entity !== 'thread') return null;

  return <ThreadAttachment id={props.id} />;
};

const Embed = (props: EmbedData) => {
  if (props.type === 'internal') {
    return <InternalEmbed {...props} />;
  }

  return <ExternalEmbed {...props} />;
};

const EMPTY_THEME = {
  plain: {},
  styles: [],
};

type Options = {
  headings: boolean,
};

const styleMap = {
  BOLD: {
    fontWeight: 'bold',
  },
  ITALIC: {
    fontStyle: 'italic',
  },
  UNDERLINE: {
    textDecoration: 'underline',
  },
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
  SUBSCRIPT: { fontSize: '0.6em', verticalAlign: 'sub' },
  SUPERSCRIPT: { fontSize: '0.6em', verticalAlign: 'super' }
};


const InlineWrapper = ({ children, style, key }) => <span key={key} style={style}>{children}</span>

export const createRenderer = (options: Options) => {
  return {
    styles: createStylesRenderer(InlineWrapper, styleMap),
    inline: {
      BOLD: (children: Array<Node>, { key }: KeyObj) => (
        <span style={{ fontWeight: 700 }} key={key}>
          {children}
        </span>
      ),
      ITALIC: (children: Array<Node>, { key }: KeyObj) => (
        <em key={key}>{children}</em>
      ),
      UNDERLINE: (children, { key }) => <u style={{ textDecoration: 'underline' }} key={key}>{children}</u>,
      CODE: (children: Array<Node>, { key }: KeyObj) => (
        <code key={key}>{children}</code>
      ),
    },
    blocks: {
      unstyled: (children: Array<Node>, { keys }: KeysObj) => {
        // If the children are text, render a paragraph
        // if (hasStringElements(children)) {
          return children.map((child, index) => (
            <Paragraph key={keys[index]}>{child}</Paragraph>
          ));
        // }

        // return children;
      },
      // 'code-block': (children: Array<any>, { keys, data }: KeysObj) => {
      //   return children.map((child, index) => (
      //     <Highlight
      //       {...defaultProps}
      //       code={getStringElements(child).join('\n')}
      //       language={Array.isArray(data) && data[0].language}
      //       theme={EMPTY_THEME}
      //       key={keys[index]}
      //     >
      //       {({ className, style, tokens, getLineProps, getTokenProps }) => (
      //         <Line className={className} style={style}>
      //           {tokens.map((line, i) => (
      //             <div key={i} {...getLineProps({ line, key: i })}>
      //               {line.map((token, key) => (
      //                 <span key={key} {...getTokenProps({ token, key })} />
      //               ))}
      //             </div>
      //           ))}
      //         </Line>
      //       )}
      //     </Highlight>
      //   ));
      // },


      'code-block': (children, { keys, data }) => {
        return (
          <pre className="language-javascript" 
            key={keys[0]} 
            dangerouslySetInnerHTML={handlePrismRenderer(data.syntax, children)}>
            {/*addBreaklines(children)*/}
          </pre>
        )
      },

      blockquote: (children: Array<Node>, { keys }: KeysObj) =>
        children.map((child, index) => (
          <BlockQuote key={keys[index] || index}>
            <div key={keys[index] || index}>
              <span data-text="true">
                {child}
              </span>
            </div>
          </BlockQuote>
        )),
      ...(!options.headings
        ? {}
        : {
            'header-one': (children: Array<Node>, { keys }: KeysObj) =>
              children.map((child, index) => (
                <h1 key={keys[index]}>{child}</h1>
              )),
            'header-two': (children: Array<Node>, { keys }: KeysObj) =>              
              children.map((child, index) => (
                <h2 key={keys[index]}>{child}</h2>
              )),
            'header-three': (children: Array<Node>, { keys }: KeysObj) =>
              children.map((child, index) => (
                <h3 key={keys[index]}>{child}</h3>
              )),
          }),
          'unordered-list-item': (children: Array<Node>, { depth,keys }: KeysObj) => {
            return(
            
            <ul className="public-DraftStyleDefault-ul" key={keys.join('|')}>
              {children.map((child, index) => (
                <li style={{marginLeft:'1.5em'}} key={keys[index]}>{child}</li>
              ))}
            </ul>
          )},
          'ordered-list-item': (children, { depth, keys }) => 
            <ol className="public-DraftStyleDefault-ol" key={keys.join('|')} className={`ol-level-${depth}`}>
              {children.map((child, index) => (
                <li style={{marginLeft:'1.5em'}} key={keys[index]}>{child}</li>
              ))}
            </ol>,
    },
    entities: {
      LINK: (children: Array<Node>, data: DataObj, { key }: KeyObj) => {
        const link = data.url || data.href;

        if (link) {
          const regexp = new RegExp(SPECTRUM_URLS, 'ig');
          const match = regexp.exec(link);
          if (match && match[0] && match[1]) {
            return <Link to={match[1]}>{children}</Link>;
          }
        }

        return (
          <a key={key} href={link} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },
      IMAGE: (
        children: Array<Node>,
        data: { src?: string, width?:number, alignment?:string, alt?: string },
        { key }: KeyObj
      ) => {
        return (
          <Zoom 
            width={data.width}
            alignment={data.alignment}
            // wrapStyle={style}
            overlayBgColorStart={'black'}
            overlayBgColorEnd={'black'}>      
            <img style={{width:'100%'}}  key={key} src={data.src} alt={data.alt || 'Image'} />      
          </Zoom>
        )
      },
      embed: (children: Array<Node>, data: Object, { key }: KeyObj) => (
        <Embed key={key} {...data} />
      ),
      'draft-js-video-plugin-video': (children: Array<Node>, data: Object, { key }: KeyObj) => (
        <VideoWrapper>
          <div className="iframeContainer___jiElf">
            <iframe
              className="iframe___1Zknv"
              key={key}
              // className={theme.iframe}
              src={getSrc(data)}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </VideoWrapper>
      ),
      mention: (children: Array<Node>, data: Object, { key }: KeyObj) => {
        console.log("children",children, data.mention.link)
        return (
          <a href={`/users/${data.mention.link}`} 
            className="mention___vYNmB" 
            spellcheck="false">
            <span data-offset-key={key}>
              <span data-text="true">
                {children}
              </span>
            </span>
          </a>
        )
      },
    },
    decorators: [linksDecorator],
  };
};
//mentionsDecorator, 

const handlePrismRenderer = (syntax, children)=>{
  const code = children.map((o)=> o.flat() ).join("")
  const formattedCode =  Prism.highlight(code, Prism.languages.javascript, 'javascript');
  return {__html: formattedCode }
}


const YOUTUBEMATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
const VIMEOMATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/; // eslint-disable-line no-useless-escape
const YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
const VIMEO_PREFIX = 'https://player.vimeo.com/video/';


const utils =  {
  isYoutube: url => YOUTUBEMATCH_URL.test(url),
  isVimeo: url => VIMEOMATCH_URL.test(url),
  getYoutubeSrc: url => {
    const id = url && url.match(YOUTUBEMATCH_URL)[1];
    return {
      srcID: id,
      srcType: 'youtube',
      url,
    };
  },
  getVimeoSrc: url => {
    const id = url.match(VIMEOMATCH_URL)[3];
    return {
      srcID: id,
      srcType: 'vimeo',
      url,
    };
  },
};

const getSrc = ({ src }) => {
  const { isYoutube, getYoutubeSrc, isVimeo, getVimeoSrc } = utils;
  if (isYoutube(src)) {
    const { srcID } = getYoutubeSrc(src);
    return `${YOUTUBE_PREFIX}${srcID}`;
  }
  if (isVimeo(src)) {
    const { srcID } = getVimeoSrc(src);
    return `${VIMEO_PREFIX}${srcID}`;
  }
  return undefined;
};




const GetImageStyle = (width?:number = 96, alignment?:string) => {
  switch (alignment) {
    case "left":
      
      return {
        padding: '0 32px',
        position: 'relative',
        width: `${width}%`,
        height: 'auto',
        cursor: 'default',
        float: 'left'
      };
    case "center":
      return {
        padding: '0 32px',
        position: 'relative',
        width: `${width}%`,
        height: 'auto',
        cursor: 'default',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',

      };
    case "right":
      return {
        padding: '0 32px',
        position: 'relative',
        width: `${width}%`,
        height: 'auto',
        cursor: 'default',
        float: 'right'
      };        
    default:
      return {
        padding: '0 32px',
        position: 'relative',
        width: `${width}%`,
        height: 'auto',
        cursor: 'default',
      };
  }
}

