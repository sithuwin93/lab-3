import React, { createContext } from 'react';

export function createTheme(defaultGetTokens){
  const emptyThemeFn = (getTokens, props) =>
    getTokens(props);

  const ThemeContext = createContext(defaultGetTokens);
  function Consumer(props) {
    const { children, ...themeProps } = props;
    return (
      <ThemeContext.Consumer>
        {theme => {
          const themeFn = theme || emptyThemeFn;
          // @ts-ignore See issue for more info: https://github.com/Microsoft/TypeScript/issues/10727
          // Argument of type 'Pick<ThemeProps & { children: (tokens: ThemeTokens) => ReactNode; }, Exclude<keyof ThemeProps, "children">>' is not assignable to parameter of type 'ThemeProps'.ts(2345)
          const tokens = themeFn(themeProps);
          return children(tokens);
        }}
      </ThemeContext.Consumer>
    );
  }

  function Provider(props) {
    return (
      <ThemeContext.Consumer>
        {themeFn => {
          const valueFn = props.value || emptyThemeFn;
          const mixedFn = (themeProps) =>
            valueFn(themeFn, themeProps);
          return (
            <ThemeContext.Provider value={mixedFn}>
              {props.children}
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  return { Consumer, Provider };
}
