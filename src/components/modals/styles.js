// @flow
import theme from 'shared/theme';
import styled from 'styled-components';
import { zIndex } from '../globals';
import { isMobile } from 'src/helpers/utils';
import Icon from 'src/components/icon';
import { themed } from 'src/components/theme';

/*
  This is the global stylesheet for all modal components. Its styles will wrap
  all modal content, so we should be selective about what is included here
*/

const mobile = isMobile();
/*
  modalStyles are defined as a JS object because it gets passed in as inline
  styles to the react-modal component. Takes an optional maxWidth argument for
  desktop sizing.
*/
export const modalStyles = (maxWidth: number = 360) => {
  return {
    // dark background behind all modals
    overlay: {
      background: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: mobile ? 'flex-start' : 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflowY: 'visible',
      overflowX: 'hidden',
      zIndex: 9998,
      padding: '1.2rem',
    },
    // modal root
    content: {
      position: 'relative',
      background: '#ffffff',
      backgroundClip: 'padding-box',
      borderRadius: '12px',
      border: '0',
      padding: '0',
      zIndex: 9999,
      width: '100%',
      maxWidth: `${maxWidth}px`,
      top: 'auto',
      bottom: 'auto',
      left: 'auto',
      right: 'auto',
      backgroundColor: 'rgba(0,0,0,0)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  };
};

export const ModalBody = styled.div`
  /* modal content should always flow top-to-bottom. inner components can
  have a flex-row property defined */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  overflow: visible;
`;

export const Title = styled.div`
  font-weight: 800;
  font-size: 20px;
  line-height: 28px;
  color: ${() => themed({ light: theme.text.default, dark:theme.textd.default })};
`;

export const Header = styled.div`
  padding: 20px 24px 0;
  display: ${props => (props.noHeader ? 'none' : 'flex')};
  justify-content: space-between;
`;

export const ModalContent = styled.div``;

export const Footer = styled.div``;

export const CloseButton = styled(Icon)`
  position: absolute;
  right: 8px;
  top: 8px;
  z-index: ${zIndex.modal + 1};
  color: ${() => themed({ light:theme.text.placeholder , dark:theme.textd.placeholder })};

  &:hover {
    color: ${() => themed({ light: theme.warn.alt, dark: theme.warnd.alt})};
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: ${() => themed({ light: theme.text.default, dark: theme.textd.default})};
  padding: 8px 0 16px;
  line-height: 1.4;

  a {
    color: ${() => themed({ light: theme.brand.default, dark: theme.brandd.default})};
  }
`;

export const UpsellDescription = styled(Description)`
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid ${themed({ light: theme.success.border, dark: theme.successd.border})};
  background: ${() => themed({ light: theme.success.wash, dark: theme.successd.wash})};
  color: ${() => themed({ light: theme.success.dark, dark: theme.successd.dark})};

  a {
    color: ${() => themed({ light:theme.success.default , dark:theme.successd.default })};
    font-weight: 700;
    display: block;
    margin-top: 4px;
  }
`;

export const Notice = styled(Description)`
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 4px;
  background: ${() => themed({ light:theme.special.wash , dark:theme.speciald.wash })};
  border: 2px solid ${themed({ light: theme.special.border, dark: theme.speciald.border})};
  color: ${() => themed({ light: theme.special.dark, dark: theme.speciald.dark})};
`;
