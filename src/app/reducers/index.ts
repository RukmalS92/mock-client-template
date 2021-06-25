import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer, authState } from './auth.reducer';


export interface State {
  auth : authState
}

export const reducers: ActionReducerMap<State> = {
  auth : authReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectAuthState = (state : State) => state.auth;
export const selectCurrentAuthState = createSelector(selectAuthState,  state => state)