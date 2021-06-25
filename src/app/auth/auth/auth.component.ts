import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { State } from '../../reducers/index'
import { AuthenticateUser, UnauthenticateUser } from 'src/app/actions/auth.actions';
import { NgForm } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private signupSubscription : Subscription = Subscription.EMPTY;

  constructor(
    private authservice : AuthService,
    private store : Store<State>,
    private toastr : NbToastrService
    ) { }

  ngOnInit(): void {
    
  }

  signin(form : NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authservice.signInUser(email, password);
  }

}
