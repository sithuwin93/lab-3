import React from 'react';

import Div from './styled';

export default class Blanket extends React.Component {
  static defaultProps = {
    canClickThrough: false,
    isTinted: false,
    onBlanketClicked: () => {},
  }

  render() {
    const { canClickThrough, isTinted, onBlanketClicked } = this.props;
    const onClick = canClickThrough ? undefined : onBlanketClicked;
    const containerProps = { canClickThrough, isTinted, onClick };

    return <Div {...containerProps} />;
  }
}
