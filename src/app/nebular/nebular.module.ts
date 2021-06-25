import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NebularRoutingModule } from './nebular-routing.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
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
    NbEvaIconsModule,
    NbSelectModule,
    NbCardModule,
    NbInputModule,
    NbToastrModule.forRoot(),
  ],
  exports : [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbCardModule,
    NbInputModule,
    NbToastrModule,
  ]
})
export class NebularModule { }
