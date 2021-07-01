import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth-service/auth.service';
import { NebularModule } from '../nebular/nebular.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ErrorhandlerService } from '../global-services/errorhandler.service';
import { AuthguardService } from './auth-guard/authguard.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    HttpClientModule,
    NebularModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers : [AuthService, AuthguardService, ]
})
export class AuthModule { }
