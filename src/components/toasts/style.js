// @flow
import theme from 'shared/theme';
import styled, { keyframes } from 'styled-components';
import { MEDIA_BREAK } from 'src/components/layout';
import { themed } from 'src/components/theme';

export const ToastsContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 256px;
  background: transparent;
  pointer-events: none;
  z-index: 9997;

  @media (max-width: ${MEDIA_BREAK}px) {
    /* titlebars are ~56px */
    top: 60px;
    left: 0;
    right: 0;
    max-width: 100%;
  }
`;

const toastFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  5% {
    opacity: 1;
    transform: translateY(0px);
  }
  95% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-4px);
  }
`;

// TODO: refine toast styling

const Toast = styled.div`
  border-radius: 4px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  display: block;
  margin-bottom: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  opacity: 0;
  position: relative;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-name: ${toastFade};
  animation-timing-function: linear;
`;

export const ErrorToast = styled(Toast)`
  background-color: ${() => themed({ light:theme.warn.default , dark: theme.warnd.default})};
`;

export const SuccessToast = styled(Toast)`
  background-color: ${() => themed({ light:theme.success.default , dark:theme.successd.default })};
`;

export const NeutralToast = styled(Toast)`
  background-color: ${() => themed({ light:theme.text.alt , dark:theme.textd.alt })};
`;

export const NotificationToast = styled(Toast)`
  background-color: ${() => themed({ light: theme.bg.default, dark:theme.bgd.default })};
  color: ${() => themed({ light: theme.text.secondary, dark:theme.textd.secondary })};
`;
