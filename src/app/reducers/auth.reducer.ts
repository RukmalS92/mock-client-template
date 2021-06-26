import { Action } from '@ngrx/store';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface authState {
  isAuthenticate : boolean,
  useremail : string,
  username : string,
  token : string
}

export const initialState: authState = {
  isAuthenticate : false,
  useremail : "admin@admin.com",
  username : "admin",
  token : ""
};

export function authReducer(state = initialState, action: AuthActions): authState {
  switch (action.type) {
    case AuthActionTypes.authenticate:
      const authentcatedState : authState = {
        isAuthenticate : true,
        useremail : action.payload.useremail,
        username : action.payload.username,
        token : action.payload.token
      }
      return authentcatedState;

    case AuthActionTypes.unauthenticate:
      const unAuthentcatedState : authState = {
        isAuthenticate : true,
        useremail : "",
        username : "",
        token : ""
      }
      return unAuthentcatedState;


    default:
      return state;
  }
}
