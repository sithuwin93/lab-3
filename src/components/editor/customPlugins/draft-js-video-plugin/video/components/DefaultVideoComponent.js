import React from 'react';
import PropTypes from 'prop-types';
import utils from '../utils';
import styled from 'styled-components';

const VideoWrapper = styled.div`
  max-width: 480px;
  margin: auto;
`
const YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
const VIMEO_PREFIX = 'https://player.vimeo.com/video/';

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


const DefaultVideoCompoent = ({ blockProps, className, style, theme }) => {
  const src = getSrc(blockProps);
  if (src) {
    return (
      <VideoWrapper>
        <div style={{...style,margin:12, clear: 'both'}}>
          <div className={`${theme.iframeContainer} ${className}`}>
            <iframe
              className={theme.iframe}
              src={src}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </VideoWrapper>
    );
  }

  return <div className={theme.invalidVideoSrc}>invalid video source</div>;
};

DefaultVideoCompoent.propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
};
export default DefaultVideoCompoent;