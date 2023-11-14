import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { FormsModule } from '@angular/forms';
import { CaptchaComponent } from 'src/app/components/captcha/captcha.component';

@NgModule({
  declarations: [
    SolicitarTurnoComponent,CaptchaComponent
  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule, FormsModule

  ]
})
export class SolicitarTurnoModule { }
