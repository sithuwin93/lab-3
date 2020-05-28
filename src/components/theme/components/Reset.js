import React from 'react';
import styled, { css } from 'styled-components';
import * as colors from '../colors';
import { createTheme } from '../utils/createTheme';

const orTextColor = (preferred) => (
  p,
) => p[preferred] || p.textColor;
const Div = styled.div`
  ${(p) => css`
    background-color: ${p.backgroundColor};
    color: ${p.textColor};

    a {
      color: ${orTextColor('linkColor')};
    }
    a:hover {
      color: ${orTextColor('linkColorHover')};
    }
    a:active {
      color: ${orTextColor('linkColorActive')};
    }
    a:focus {
      outline-color: ${orTextColor('linkColorOutline')};
    }
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: ${orTextColor('headingColor')};
    }
    h6 {
      color: ${orTextColor('subtleHeadingColor')};
    }
    small {
      color: ${orTextColor('subtleTextColor')};
    }
  `};
`;

export const ResetTheme = createTheme(
  () => ({
    backgroundColor: colors.N10A,
    linkColor: colors.B400,
    linkColorHover: colors.B300,
    linkColorActive: colors.B500,
    linkColorOutline: colors.B100,
    headingColor: colors.N800,
    subtleHeadingColor: colors.N200,
    subtleTextColor: colors.N200,
    textColor: colors.N900,
  }),
);


export function Reset(props) {
  return (
    <ResetTheme.Provider value={props.theme}>
      <ResetTheme.Consumer>
        {(tokens) => {
          return (
            <Div {...{ ...tokens, mode: undefined }} {...props}>
              {props.children}
            </Div>
          );
        }}
      </ResetTheme.Consumer>
    </ResetTheme.Provider>
  );
}
