import { Action, createAction } from '@ngrx/store';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

// ACTIONS
export const startLoading = createAction('[UI] Start Loading');
export const stopLoading = createAction('[UI] Stop Loading');

// REDUCER
export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case startLoading.type:
      return { isLoading: true };

    case stopLoading.type:
      return { isLoading: false };

    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
