import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mock-dashboard';
  sidebarstate : boolean = false;
  selectedTheme : string;

  constructor(
    private nbsidebarservice : NbSidebarService,
    private nbthemeservice : NbThemeService
  ) {}

  ngOnInit() {
    this.nbsidebarservice.onToggle()
    .subscribe(
      (data) => {
        this.sidebarstate = !this.sidebarstate;
      }
    )
  }

  toggle() {
    this.nbsidebarservice.toggle(true, 'left')
  }

  themeSelect(event){
    this.nbthemeservice.changeTheme(event);
  }
 }
