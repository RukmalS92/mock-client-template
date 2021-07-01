import { Action } from '@ngrx/store';

export enum LoadingActionTypes {
    loadingStart = '[Loading] start loading',
    loadingStop = '[Loading] stop loading' 
}

export class StartLoading implements Action {
  readonly type = LoadingActionTypes.loadingStart
}

export class StopLoading implements Action {
  readonly type = LoadingActionTypes.loadingStop
}

export type LoadingActions = StartLoading | StopLoading;

