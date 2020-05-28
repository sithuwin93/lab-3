// @flow
export type ThemeType =
  | 'light'
  | 'dark';

type InitialState = {
  theme: string,
}

type ActionType = {
  type: 'CHANGE_THEME',
  value: any,
};
  
const initialState: InitialState = {
  theme: 'light',
};

export default function status(
  state: InitialState = initialState,
  action: ActionType
) {
  switch (action.type) {
    case 'CHANGE_THEME':
      return Object.assign({}, state, {
        theme: state.theme == 'light' ? 'dark': 'light',
      });
    default:
      return state;
  }
}
