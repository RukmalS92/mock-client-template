import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token : string = this.authService.getAuthToken();
    req = req.clone({
      setHeaders : {Autherization : `Bearer ${token}`}
    })

    return next.handle(req)
  }
}
