import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './auth/auth-guard/authguard.service';
import { AuthComponent } from './auth/auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {path : 'auth', component : AuthComponent, 
    children : 
      [
        {path : '', component : SigninComponent},
        {path : 'signup', component : SignupComponent},
        {path : 'signin', component : SigninComponent},
      ]},
  // {path : 'auth', component : AuthComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'dashboard', component : DashboardComponent, canActivate :[]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
