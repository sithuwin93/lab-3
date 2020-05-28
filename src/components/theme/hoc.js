import React from 'react';
import Theme from './components/Theme';

// Pre-executes the (global) theme and passes it as a prop to the supplied component.
// This is useful for ensuring that the current theme is accessible as props
// in styled-components.
export function withTheme(InnerComponent) {
  return function ComponentWithTheme(props) {
    return (
      <Theme.Consumer>
        {(tokens) => (
          <InnerComponent {...props} theme={tokens} />
        )}
      </Theme.Consumer>
    );
  };
}
