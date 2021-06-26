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
import { State } from 'src/app/reducers';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService implements OnDestroy{
  private signupurl = "http://localhost:3000/auth/signup";
  private signinurl = "http://localhost:3000/auth/signin";

  private signUpSubscription : Subscription = Subscription.EMPTY;
  private signInSubscription : Subscription = Subscription.EMPTY;
  
  constructor(
    private http : HttpClient,
    private erroHandler : ErrorhandlerService,
    private store : Store<State>,
    private notifications : NotificationService
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
                (res : any) => {
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
                }
              }
            )
  }

  ngOnDestroy() : void {
    this.signUpSubscription.unsubscribe();
    this.signInSubscription.unsubscribe();
  }
}
