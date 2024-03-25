import { Action, createAction } from '@ngrx/store';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

// ACTIONS
export const setAuthenticated = createAction('[Auth] Set Authenticated');
export const setUnauthenticated = createAction('[Auth]] Set Unauthenticated');

// REDUCER
export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case setAuthenticated.type:
      return { isAuthenticated: true };

    case setUnauthenticated.type:
      return { isAuthenticated: false };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
