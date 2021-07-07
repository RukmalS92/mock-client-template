import { Action } from '@ngrx/store';
import { TokenauthActions, TokenauthActionTypes } from '../actions/tokenauth.actions';

export const tokenauthFeatureKey = 'tokenauth';

export interface tokenState {
  isTokenAlive : boolean,
  token : string
}

export const initialState: tokenState = {
  isTokenAlive : false,
  token : ""
};

export function tokenAuthReducer(state = initialState, action: TokenauthActions): tokenState {
  switch (action.type) {
    case TokenauthActionTypes.tokenAlive:
      const tokenAuthState : tokenState = {
        isTokenAlive: true,
        token : action.payload.token
      }
      return tokenAuthState;

    case TokenauthActionTypes.tokenExpired:
      const tokenExpiredState : tokenState = {
        isTokenAlive: false,
        token : ""
      }

      return tokenExpiredState;

    default:
      return state;
  }
}
