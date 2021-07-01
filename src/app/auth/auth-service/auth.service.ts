import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, Subject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { AuthenticateUser, UnauthenticateUser } from 'src/app/actions/auth.actions';
import { ErrorhandlerService } from 'src/app/global-services/errorhandler.service';
import { NotificationService } from 'src/app/global-services/notification.service';
import { authState } from 'src/app/reducers/auth.reducer'
import { selectCurrentAuthState, State } from 'src/app/reducers';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService implements OnDestroy{
  private signupurl = "http://localhost:5000/auth/signup";
  private signinurl = "http://localhost:5000/auth/signin";

  private signUpSubscription : Subscription = Subscription.EMPTY;
  private signInSubscription : Subscription = Subscription.EMPTY;

  private currentAuthStatus : authState;
  
  constructor(
    private http : HttpClient,
    private erroHandler : ErrorhandlerService,
    private store : Store<State>,
    private notifications : NotificationService,
    private router : Router,
    ) {
      store.select(selectCurrentAuthState).subscribe(
        (auth : authState) => this.currentAuthStatus = auth
      )
     }

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
                      this.store.dispatch(new AuthenticateUser({useremail : signupinfo.email, username: signupinfo.username, token : signupinfo.token}));
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
                (res : HttpResponse<any>) => {
                  return res
                }
              ),
              catchError((e) => {
                return this.erroHandler.handleError(e)
              })
            )
            .subscribe(
              (response : any) => {
                if(response.error){
                  this.notifications.errorNotificationSubject.next(response.error)
                  this.store.dispatch(new UnauthenticateUser());
                }
                else{
                  this.notifications.successNotificationSubject.next(response.username);
                  this.store.dispatch(new AuthenticateUser({useremail : response.email, 
                                                            username: response.username, 
                                                            token : response.token}));
                  this.setAuthToken(response.token)
                  this.router.navigateByUrl('dashboard');
                }
              }
            )
  }

  private setAuthToken(token) {
    localStorage.setItem('token', token);
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  signOut() {
    this.store.dispatch(new UnauthenticateUser());
  }

  isAuth() {
    return this.currentAuthStatus;
  }

  ngOnDestroy() : void {
    this.signUpSubscription.unsubscribe();
    this.signInSubscription.unsubscribe();
  }
}
