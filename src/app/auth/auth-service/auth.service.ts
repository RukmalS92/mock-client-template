import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { AuthenticateUser, UnauthenticateUser } from 'src/app/actions/auth.actions';
import { ErrorhandlerService } from 'src/app/global-services/errorhandler.service';
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy{
  private signupurl = "http://localhost:3000/auth/signup";
  private signinurl = "http://localhost:3000/auth/signin";

  private signUpSubscription : Subscription = Subscription.EMPTY;
  private signInSubscription : Subscription = Subscription.EMPTY;
  
  constructor(
    private http : HttpClient,
    private erroHandler : ErrorhandlerService,
    private store : Store<State>,
    private toastr : NbToastrService
    ) { }

  signUpUser(username : string, useremail : string, password : string) {
    const userObj = {
      username : username,
      email : useremail,
      password : password
    }
    //auth token should send in header need look into it*********
    this.signUpSubscription = this.http.post(this.signupurl, userObj)
                .pipe(
                    retry(2),
                    map((res : HttpResponse<any>) => {
                      return res;
                    }),
                    catchError(error => of(error))
                )
                .subscribe(
                  (signupinfo : any) => {
                    console.log(signupinfo)
                    if(signupinfo.status === 'success'){
                      this.store.dispatch(new AuthenticateUser({userermail : signupinfo.email, username: signupinfo.username, token : signupinfo.token}));
                    }
                    else{
                      this.store.dispatch(new UnauthenticateUser());
                    }
                  }
                )
  }

  signInUser(useremail: string, password: string){
    const userObj = {
      email : useremail,
      password
    }
    this.signInSubscription = this.http.post(this.signinurl, userObj, {responseType : 'json', observe : 'body'})
            .pipe(
              retry(2),
              map(
                (res : any) => {
                  return res
                }
              ),
              catchError(this.erroHandler.handleError)
            )
            .subscribe(
              (response : any) => {
                if(response.status === 'success'){
                  this.store.dispatch(new AuthenticateUser({userermail : response.email, username: response.username, token : response.token}));
                }
                else{
                  this.store.dispatch(new UnauthenticateUser());
                }
              }
            )
  }

  ngOnInit() : void {

  }

  ngOnDestroy() : void {
    this.signUpSubscription.unsubscribe();
    this.signInSubscription.unsubscribe();
  }
}
