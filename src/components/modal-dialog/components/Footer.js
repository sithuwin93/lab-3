import React from 'react';
import Button from 'src/components/button-new';

import { Actions, ActionItem, Footer } from '../styled/Content';

const JustifyShim = (props) => <span {...props} />;


export default class ModalFooter extends React.Component {
  render() {
    const { actions, appearance, component, onClose, showKeyline } = this.props;
    const warning = 'You can provide `component` OR `actions`, not both.';

    if (!component && !actions) return null;
    if (component && actions) {
      console.warn(warning); // eslint-disable-line no-console
      return null;
    }
    if (component) {
      return React.createElement(component, {
        appearance,
        onClose,
        showKeyline,
      });
    }

    return (
      <Footer showKeyline={showKeyline}>
        <JustifyShim />
        <Actions>
          {actions
            ? actions.map(({ text, ...rest }, idx) => {
                const variant = idx !== 0 ? 'subtle' : appearance || 'primary';
                return (
                  <ActionItem key={text || idx}>
                    <Button appearance={variant} {...rest}>
                      {text}
                    </Button>
                  </ActionItem>
                );
              })
            : null}
        </Actions>
      </Footer>
    );
  }
}
