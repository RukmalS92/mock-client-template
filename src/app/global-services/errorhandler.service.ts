import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';

export interface httpErrorModel {
  errorStatus : number,
  errorStatusText : string,
  errorMessage : string,
  errorMessagefromServer : string,
  errorStatusTextfromServer : string,
  url : string
}

export interface normalErrorModel {
  errorMessage : string
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ErrorhandlerService{
  constructor() {  }

  handleError(error : any) {
    if(error instanceof HttpErrorResponse){
      console.log({httpError : `errormessage : ${error.message} and errorstatus : ${error.status}`})
      const errorObject : httpErrorModel = {
        errorMessage : error.message,
        errorMessagefromServer : error.error.message,
        errorStatusText : error.statusText,
        errorStatusTextfromServer: error.error.status,
        errorStatus : error.status,
        url : error.url
      }
      return new Observable((observer) => {
        observer.next({error : errorObject});
        observer.complete()
      })
    }
    else if(error instanceof ErrorEvent){
      console.log({normalError : `errormessage : ${error.message}`})
      const errorObject : normalErrorModel = {
        errorMessage : error.error.message
      }
      return new Observable((observer) => {
        observer.next({error : errorObject});
        observer.complete()
      })
    }
  }
}
