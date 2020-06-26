import styled from 'styled-components';
import React, { Component } from 'react';
import clsx from 'clsx';
// import mediumZoom from 'medium-zoom';
// import { ORG_PHOTO_URL } from '@config';

const  ORG_PHOTO_URL = "bl"
const Caption = styled.figcaption`
  text-align: center;
  font-size: 14px;
  user-select: none;
  @media only screen and (max-width: 900px) {
    font-size: 10px;
  }
`

export default class CustomImageComponent extends Component {
  render() {
    const { block, className, theme = {}, ...otherProps } = this.props;
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
    return (
      <div 
        className={combinedClassName}
        {...elementProps}
        role="presentation">
        <img
          alt={alt}
          title={alt}
          src={`${ORG_PHOTO_URL}/${src}`}  
          style={{ height:'100%', width:'100%'}} 
          />
        <Caption>{cap}</Caption>
      </div>
    );
  }
}