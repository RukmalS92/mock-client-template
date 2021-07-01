import { Action } from '@ngrx/store';
import { LoadingActions, LoadingActionTypes } from '../actions/loading.actions';


export const loadingFeatureKey = 'loading';

export interface loadingState {
  isLoding : boolean
}

export const initialState: loadingState = {
  isLoding : false
};

export function loadingReducer(state = initialState, action: LoadingActions): loadingState {
  switch (action.type) {
    case LoadingActionTypes.loadingStart:
      const loadingStartState : loadingState = {
        isLoding : true
      }
      return loadingStartState;

    case LoadingActionTypes.loadingStop:
      const loadingStopState : loadingState = {
        isLoding : false
      }
      return loadingStartState;

    default:
      return state;

  }
}
