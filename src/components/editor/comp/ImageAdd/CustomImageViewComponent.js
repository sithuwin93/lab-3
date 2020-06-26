import styled from 'styled-components';
import React, { Component } from 'react';
import clsx from 'clsx';
// import { getBgPhotoUrl } from '@utils/func';
import Zoom from 'react-medium-image-zoom'


const Caption = styled.figcaption`
  text-align: center;
  font-size: 14px;
  user-select: none;
  @media only screen and (max-width: 900px) {
    font-size: 10px;
  }
`

export default class CustomImageViewComponent extends Component {
  render() {
    const { iswebp, block, className, theme = {}, ...otherProps } = this.props;
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;
    


    const combinedClassName = clsx(theme.image, className);
    const { alt, cap, src } = contentState.getEntity(block.getEntityAt(0)).getData();
    // const coverUrl = getBgPhotoUrl(iswebp,src)
    const allImageProps = {
      src,
      alt,
      title:alt,
      style:{ width:'100%',height:'100%',zIndex:2000},      
    }

    console.log("src",src)
  
    return (
      <div
        className={`${combinedClassName} image-over`}     
        {...elementProps}
        role="presentation">
        <Zoom 
          wrapStyle={{width:'100% !important'}}
          overlayBgColorStart={'black'}
          overlayBgColorEnd={'black'}>
          <div style={{width: '100% !important'}}>
            <img {...allImageProps}/>
          </div>
        </Zoom>
        <Caption>{cap}</Caption>
      </div>
    );
  }
}