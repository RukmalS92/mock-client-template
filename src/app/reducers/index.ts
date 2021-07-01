import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { authReducer, authState } from './auth.reducer';
import { loadingReducer, loadingState } from './loading.reducer';


export interface State {
  auth : authState,
  loading : loadingState
}

export const reducers: ActionReducerMap<State> = {
  auth : authReducer,
  loading : loadingReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectAuthState = (state : State) => state.auth;
export const selectCurrentAuthState = createSelector(selectAuthState,  state => state)

const selectloadingState = (state : State) => state.loading;
export const selectCurrentLoadingState = createSelector(selectloadingState, state => state.isLoding) 