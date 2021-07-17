import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnauthenticateUser } from 'src/app/actions/auth.actions';
import { selectCurrentAuthState, State } from 'src/app/reducers';
import { MatInput } from '@angular/material/input'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private store : Store<State>,
    private router : Router,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/realtime').subscribe(data => console.log(data))
  }

}
