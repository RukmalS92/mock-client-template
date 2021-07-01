import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotificationService } from './global-services/notification.service';
import { selectCurrentAuthState, State } from './reducers';
import { authState } from './reducers/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mock-dashboard';
  sidebarstate : boolean = false;
  selectedTheme : string;
  authData : Observable<authState>;

  constructor(
    private nbsidebarservice : NbSidebarService,
    private nbthemeservice : NbThemeService,
    private notificationservice : NotificationService,
  ) {

  }

  ngOnInit() {
    this.nbsidebarservice.onToggle()
    .subscribe(
      (data) => {
        this.sidebarstate = !this.sidebarstate;
      }
    );
  }

  toggle() {
    this.nbsidebarservice.toggle(true, 'left')
  }

  themeSelect(event){
    this.nbthemeservice.changeTheme(event);
  }
 }
