import { useSelector } from 'react-redux';
import React from 'react';
import { layers } from 'src/components/theme/constants';
import Portal from 'src/components/portal';
import { ModalTransitionConsumer } from './ModalTransition';
import StackConsumer from './StackConsumer';
import Modal from './Modal';
import { ParabaikThemeProvider } from 'src/components/theme';

const ModalWrapper = (props) => {
  const { theme } = useSelector(state => state.theme)
  const onModalClosed = (onExited) => (e) => {
    if (onExited) {
      onExited();
    }
    if (props.onCloseComplete) {
      props.onCloseComplete(e);
    }
  };

  return (      
    <ModalTransitionConsumer>
      {({ isOpen, onExited }) => (
        <Portal zIndex={layers.modal()}>
          <StackConsumer isOpen={isOpen}>
            {naturalStackIndex => ( 
              <ParabaikThemeProvider mode={theme}>
                <Modal
                  {...props}
                  theme={theme}
                  isOpen={isOpen}
                  stackIndex={props.stackIndex || naturalStackIndex}
                  onCloseComplete={onModalClosed(onExited)}
                >
                  {props.children}
                </Modal>
              </ParabaikThemeProvider>            
            )}
          </StackConsumer>
        </Portal>
      )}
    </ModalTransitionConsumer>
  );
}

ModalWrapper.defaultProps = {
  autoFocus: true,
  scrollBehavior: 'inside',
  shouldCloseOnEscapePress: true,
  shouldCloseOnOverlayClick: true,
  isChromeless: false,
  width: 'medium',
  isHeadingMultiline: true,
  onClose: () => {},
}

export default ModalWrapper;
