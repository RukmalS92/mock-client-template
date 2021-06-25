import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentAuthState, State } from 'src/app/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private store : Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(selectCurrentAuthState).subscribe(
      data => console.log(data)
    )
  }

}
