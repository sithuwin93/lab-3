// @flow
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { zIndex } from 'src/components/globals';
import { themed } from 'src/components/theme';

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
`;

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const AuthorAvatarContainer = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const TextRow = styled.span`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  align-items: center;
`;

const metaTitleStyles = css`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  color: ${props =>
    props.active ?
    themed({ light: props.theme.text.reverse, dark:props.theme.textd.reverse })
    : themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
  pointer-events: auto;
  position: relative;
  z-index: ${zIndex.card};

  &:hover {
    cursor: pointer;
    color: ${props =>
      props.active ? themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
      : themed({ light: props.theme.text.default, dark: props.theme.textd.default})};
  }
`;

export const MetaTitle = styled(Link)`
  ${metaTitleStyles};
`;

export const MetaTitleText = styled.span`
  ${metaTitleStyles} &:hover {
    cursor: auto;
    color: ${props =>
      props.active ? themed({ light:props.theme.text.reverse , dark: props.theme.textd.reverse}) 
      : themed({ light: props.theme.text.alt, dark: props.theme.textd.alt})};
  }
`;

const metaSubtitleStyles = css`
  font-size: 15px;
  font-weight: 400;
  color: ${props =>
    props.active ? themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
    : themed({ light:props.theme.text.alt , dark: props.theme.textd.alt})};
  line-height: 1.2;
  pointer-events: auto;
  position: relative;
  z-index: ${zIndex.card};

  &:hover {
    cursor: pointer;
    color: ${props =>
      props.active ? themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse})  
      : themed({ light: props.theme.text.default, dark:props.theme.textd.default })};
  }
`;

export const MetaSubtitle = styled(Link)`
  ${metaSubtitleStyles};
`;

export const MetaSubtitleText = styled.span`
  display: flex;

  ${metaSubtitleStyles} &:hover {
    cursor: auto;
    color: ${props =>
      props.active ? 
      themed({ light: props.theme.text.reverse , dark: props.theme.textd.reverse })
      : themed({ light: props.theme.text.alt, dark: props.theme.textd.alt})};
  }
`;

export const Timestamp = styled(MetaTitleText)`
  color: ${props =>
    props.active ? 
    themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
    : themed({ light: props.theme.text.alt, dark: props.theme.textd.alt})};
  font-weight: 400;
`;

export const NewThreadTimestamp = styled(MetaSubtitleText)`
  margin-left: 4px;
  color: ${props =>
    props.active ? themed({ light:props.theme.text.reverse , dark: props.theme.textd.reverse}) 
    : themed({ light: props.theme.brand.default, dark: props.theme.brandd.default})};
`;

export const MetaSubtitlePinned = styled(MetaSubtitleText)`
  color: ${props =>
    props.active ? themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
    : themed({ light: props.theme.special.default, dark:props.theme.speciald.default })};

  &:hover {
    color: ${props =>
      props.active ?
      themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse})  
      : themed({ light:props.theme.special.default , dark:props.theme.speciald.default })};
  }
`;

export const MetaSubtitleLocked = styled(MetaSubtitleText)`
  color: ${props =>
    props.active ? 
    themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
    : themed({ light:props.theme.text.secondary , dark: props.theme.textd.secondary})};

  &:hover {
    color: ${props =>
      props.active ? 
      themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
      : themed({ light: props.theme.text.secondary, dark: props.theme.textd.secondary})};
  }
`;

export const MetaSubtitleWatercooler = styled(MetaSubtitleText)`
  color: ${props =>
    props.active ? 
    themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
    : themed({ light: props.theme.space.default, dark:props.theme.spaced.default })};

  &:hover {
    color: ${props =>
      props.active ?  themed({ light: props.theme.text.reverse, dark: props.theme.textd.reverse}) 
      : themed({ light:props.theme.space.default , dark:props.theme.spaced.default })};
  }
`;

export const Divider = styled.span`
  margin: 0 4px;
  color: ${props =>
    props.active ? themed({ light:props.theme.text.reverse , dark:props.theme.textd.reverse }) 
    : themed({ light: props.theme.text.placeholder, dark:props.theme.textd.placeholder })};
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${props => props.color(props.theme)};
  margin-right: 8px;
`;
