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



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    NebularModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers : [AuthService]
})
export class AuthModule { }
