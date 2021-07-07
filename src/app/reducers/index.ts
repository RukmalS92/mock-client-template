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
import { tokenAuthReducer, tokenState } from './tokenauth.reducer';


export interface State {
  auth : authState,
  loading : loadingState,
  tokenauth : tokenState
}

export const reducers: ActionReducerMap<State> = {
  auth : authReducer,
  loading : loadingReducer,
  tokenauth : tokenAuthReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectAuthState = (state : State) => state.auth;
export const selectCurrentAuthState = createSelector(selectAuthState,  state => state)

const selectloadingState = (state : State) => state.loading;
export const selectCurrentLoadingState = createSelector(selectloadingState, state => state.isLoding) 

const selectTokenState = (state : State) => state.tokenauth;
export const selectCurrentTokenState = createSelector(selectTokenState, state => state)