import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { throwError } from 'rxjs';

interface errormodel {
  errorType : string,
  errorMessage : string
}

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService implements OnInit{

  constructor(private toaster : NbToastrService) { }

  ngOnInit() {
    this.toaster.show('rukmal', 'rrr', {status : 'danger'});
  }


  handleError(error : HttpErrorResponse) {
    console.log(error);
    // this.toaster.show('rukmal', 'rrr', {status : 'danger'});
    return throwError('');
  }
}
