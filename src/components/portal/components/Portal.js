import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';
import { canUseDOM } from 'exenv';
import { layers } from 'src/components/theme';

import { PORTAL_MOUNT_EVENT, PORTAL_UNMOUNT_EVENT } from '../constants';


const createContainer = (zIndex) => {
  const container = document.createElement('div');
  container.setAttribute('class', 'atlaskit-portal');
  container.setAttribute('style', `z-index: ${zIndex};`);
  return container;
};

const getBody = () => {
  invariant(document && document.body, 'cannot find document.body');
  return document.body;
};

/**
 * Reverses the name: zIndex object so we can quickly access it using the zIndex value as the key.
 */
const zIndexToName = Object.keys(layers).reduce((acc, name) => {
  const layerName = name;
  const value = layers[layerName]();
  acc[value] = layerName;
  return acc;
}, {});

const getLayerName = (zIndex) => {
  return Object.prototype.hasOwnProperty.call(zIndexToName, zIndex)
    ? zIndexToName[zIndex]
    : null;
};

const getEvent = (
  eventName,
  zIndex
)=> {
  const detail = {
    layer: getLayerName(Number(zIndex)),
    zIndex,
  };

  // In ie11 the CustomEvent object exists, but it cannot be used as a constructor
  if (typeof CustomEvent === 'function') {
    return new CustomEvent(eventName, {
      detail,
    });
  }
  // CustomEvent constructor API not supported (ie11)
  // Using `new Event` or `new CustomEvent` does not work in ie11
  const event = document.createEvent('CustomEvent');
  const params = {
    bubbles: true,
    cancellable: true,
    detail,
  };
  event.initCustomEvent(
    eventName,
    params.bubbles,
    params.cancellable,
    params.detail,
  );
  return event;
};

const firePortalEvent = (eventName, zIndex) => {
  const event = getEvent(eventName, zIndex);
  window.dispatchEvent(event);
};

const getPortalParent = () => {
  const parentElement = document.querySelector(
    'body > .atlaskit-portal-container',
  );
  if (!parentElement) {
    const parent = document.createElement('div');
    parent.setAttribute('class', 'atlaskit-portal-container');
    parent.setAttribute('style', `display: flex;`);
    getBody().appendChild(parent);
    return parent;
  }
  return parentElement;
};

// This is a generic component does two things:
// 1. Portals it's children using React.createPortal
// 2. Creates the DOM node container for the portal based on props
// 3. Ensures DOM the container creates it's own stacking context

class Portal extends React.Component {
  static defaultProps = {
    zIndex: 0,
  };

  state = {
    container: canUseDOM ? createContainer(this.props.zIndex) : undefined,
    portalIsMounted: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { container } = this.state;
    const { zIndex } = this.props;
    if (container && prevProps.zIndex !== zIndex) {
      const newContainer = createContainer(zIndex);

      getPortalParent().replaceChild(container, newContainer);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ container: newContainer });
    } else if (!prevState.container && container) {
      // SSR path
      getPortalParent().appendChild(container);
    }
  }

  componentDidMount() {
    const { container } = this.state;
    const { zIndex } = this.props;
    if (container) {
      getPortalParent().appendChild(container);
    } else {
      // SSR path
      const newContainer = createContainer(zIndex);
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ container: newContainer });
    }
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      portalIsMounted: true,
    });

    firePortalEvent(PORTAL_MOUNT_EVENT, Number(zIndex));
  }

  componentWillUnmount() {
    const { container } = this.state;
    const { zIndex } = this.props;
    if (container) {
      getPortalParent().removeChild(container);
      // clean up parent element if there are no more portals
      const portals = !!document.querySelector(
        'body > .atlaskit-portal-container > .atlaskit-portal',
      );
      if (!portals) {
        getBody().removeChild(getPortalParent());
      }
    }

    firePortalEvent(PORTAL_UNMOUNT_EVENT, Number(zIndex));
  }

  render() {
    const { container, portalIsMounted } = this.state;
    return container && portalIsMounted
      ? ReactDOM.createPortal(this.props.children, container)
      : null;
  }
}

export default Portal;
