import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  authenticate = '[Auth] authenticate user',
  unauthenticate = '[Auth] reject user'
}

export class AuthenticateUser implements Action {
  readonly type = AuthActionTypes.authenticate;
  constructor(public payload: { userermail : string, username : string, token : string }) { }
}

export class UnauthenticateUser implements Action {
  readonly type = AuthActionTypes.unauthenticate;
}

export type AuthActions = AuthenticateUser | UnauthenticateUser;

