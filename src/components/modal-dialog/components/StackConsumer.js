import React from 'react';
let stackConsumers = [];

class StackConsumer extends React.Component {
  state = {
    stackIndex: 0,
  };

  componentDidMount() {
    stackConsumers.forEach(updateFn => updateFn());
  }

  componentWillUnmount() {
    // This check will pass if the <Transition><Modal/></Transition> pattern has not been
    // implemented correctly. In this case, will still need to make sure we remove ourselves
    // from the stack list.
    if (stackConsumers.indexOf(this.update) !== -1) {
      stackConsumers = stackConsumers.filter(stack => stack !== this.update);
      stackConsumers.forEach(updateFn => updateFn());
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen && !this.props.isOpen) {
      stackConsumers = stackConsumers.filter(stack => stack !== this.update);
      stackConsumers.forEach(updateFn => updateFn());
    }
  }

  update = () => {
    const stackIndex = stackConsumers.indexOf(this.update);
    if (this.state.stackIndex !== stackIndex) {
      this.setState({ stackIndex });
    }
  };

  render() {
    if (stackConsumers.indexOf(this.update) === -1) {
      // add this instance to stack consumer list
      stackConsumers = [this.update, ...stackConsumers];
    }
    return this.props.children(this.state.stackIndex);
  }
}

export default StackConsumer;
