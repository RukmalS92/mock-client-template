import { Action } from '@ngrx/store';

export enum TokenauthActionTypes {
  tokenAlive = '[TokenAuth] JWT Token is alive',
  tokenExpired = '[TokrnAuth] JWT Token is expired'
}

export class SetTokenAlive implements Action {
  readonly type = TokenauthActionTypes.tokenAlive;
  constructor(public payload : {token : string}){}
}

export class SetTokenExpired implements Action {
  readonly type = TokenauthActionTypes.tokenExpired
}


export type TokenauthActions =  SetTokenAlive | SetTokenExpired;

