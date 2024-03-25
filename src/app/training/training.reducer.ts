import {
  createAction,
  createFeatureSelector,
  createSelector,
  props,
} from '@ngrx/store';
import { Exercise } from './exercise.model';

import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

// ACTIONS
export const setAvailableTrainings = createAction(
  '[Train] Set Available Trainings',
  props<{ payload: Exercise[] }>()
);
export const setFinishedTrainings = createAction(
  '[Train]] Set Finished Trainings',
  props<{ payload: Exercise[] }>()
);

export const startTraining = createAction(
  '[Train] Start Training',
  props<{ payload: string }>()
);
export const stopTraining = createAction('[Train] Stop Training');

// REDUCER
export function trainingReducer(state = initialState, action: any) {
  switch (action.type) {
    case setAvailableTrainings.type:
      return { ...state, availableExercises: action.payload };

    case setFinishedTrainings.type:
      return { ...state, finishedExercises: action.payload };

    case startTraining.type:
      return {
        ...state,
        activeTraining: state.availableExercises.find(
          (ex) => ex.id === action.payload
        ),
      };

    case stopTraining.type:
      return { ...state, activeTraining: null };

    default:
      return state;
  }
}

// SELECTORS
export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
