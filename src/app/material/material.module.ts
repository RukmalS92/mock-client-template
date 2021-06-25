import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    MatFormFieldModule,
  ],
  exports : [
    MatFormFieldModule
  ]
})
export class MaterialModule { }
