import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NotificationService } from 'src/app/global-services/notification.service';
import { AuthService } from '../auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(
    private authservice : AuthService, 
    private router : Router,
    private notificationservice : NotificationService
    ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authservice.isAuth().isAuthenticate){
      return true;
    }
    else{
      this.router.navigate(['auth'])
        .then((value) => console.log(`naviagted to authentication. router return ${value}`))
        .catch((error) => this.notificationservice.warningNotificationSubject.next(error.message))
    }
      
  }
}
