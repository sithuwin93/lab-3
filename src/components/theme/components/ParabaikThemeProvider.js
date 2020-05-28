import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import exenv from 'exenv';
import * as colors from '../colors';

import { CHANNEL } from '../constants';

// For forward-compat until everything is upgraded.
import Theme from './Theme';

function getStylesheetResetCSS(state) {
  const backgroundColor = colors.background(state);
  return `
    body { background: ${backgroundColor}; }
  `;
}


function buildThemeState(mode) {
  return { theme: { [CHANNEL]: { mode } } };
}

const LegacyReset = styled.div`
  background-color: ${colors.background};
  color: ${colors.text};

  a {
    color: ${colors.link};
  }
  a:hover {
    color: ${colors.linkHover};
  }
  a:active {
    color: ${colors.linkActive};
  }
  a:focus {
    outline-color: ${colors.linkOutline};
  }
  h1 {
    color: ${colors.heading};
  }
  h2 {
    color: ${colors.heading};
  }
  h3 {
    color: ${colors.heading};
  }
  h4 {
    color: ${colors.heading};
  }
  h5 {
    color: ${colors.heading};
  }
  h6 {
    color: ${colors.subtleHeading};
  }
  small {
    color: ${colors.subtleText};
  }
`;

export default class ParabaikThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = buildThemeState(props.mode);
  }

  // getChildContext = () => {
  //   return { hasParabaikThemeProvider: true };
  // }

  UNSAFE_componentWillMount() {
    if (!this.context.hasParabaikThemeProvider && exenv.canUseDOM) {
      const css = getStylesheetResetCSS(this.state);
      this.stylesheet = document.createElement('style');
      this.stylesheet.type = 'text/css';
      this.stylesheet.innerHTML = css;
      if (document && document.head) {
        document.head.appendChild(this.stylesheet);
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.mode !== this.props.mode) {
      const newThemeState = buildThemeState(newProps.mode);
      if (this.stylesheet) {
        const css = getStylesheetResetCSS(newThemeState);
        this.stylesheet.innerHTML = css;
      }
      this.setState(newThemeState);
    }
  }

  componentWillUnmount() {
    if (this.stylesheet && document && document.head) {
      document.head.removeChild(this.stylesheet);
      delete this.stylesheet;
    }
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;
    return (
      <Theme.Provider value={() => ({ mode: theme[CHANNEL].mode })}>
        <ThemeProvider theme={theme}>
          <LegacyReset>{children}</LegacyReset>
        </ThemeProvider>
      </Theme.Provider>
    );
  }
}
