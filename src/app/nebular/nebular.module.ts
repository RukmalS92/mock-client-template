import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NebularRoutingModule } from './nebular-routing.module';
import { NbButtonModule, NbIconModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NbButtonGroupModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NebularRoutingModule,
    NbLayoutModule,
    NbThemeModule.forRoot({name : 'dark'}),
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule
  ],
  exports : [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule
  ]
})
export class NebularModule { }
