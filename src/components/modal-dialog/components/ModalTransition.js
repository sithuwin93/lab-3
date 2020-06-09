import React from 'react';

const { Consumer, Provider } = React.createContext({
  isOpen: true,
  onExited: () => {},
});

// checks if children exist and are truthy
const hasChildren = (children) =>
  React.Children.count(children) > 0 &&
  React.Children.map(children, child => !!child).filter(Boolean).length > 0;

class Transition extends React.Component {
  state = {
    currentChildren: undefined,
  };

  static getDerivedStateFromProps(props, state) {
    const { currentChildren: previousChildren } = state;
    const exiting =
      hasChildren(previousChildren) && !hasChildren(props.children);
    return {
      currentChildren: exiting ? previousChildren : props.children,
    };
  }

  onExited = () => {
    this.setState({
      currentChildren: this.props.children,
    });
  };

  render() {
    return (
      <Provider
        value={{
          onExited: this.onExited,
          isOpen: hasChildren(this.props.children),
        }}
      >
        {this.state.currentChildren}
      </Provider>
    );
  }
}

export const ModalTransitionConsumer = Consumer;

export default Transition;
