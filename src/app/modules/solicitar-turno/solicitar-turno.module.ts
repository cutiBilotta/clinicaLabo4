import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitarTurnoRoutingModule } from './solicitar-turno-routing.module';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CaptchaComponent } from 'src/app/components/captcha/captcha.component';
import { NavbarModule } from '../navbar/navbar.module';
@NgModule({
  declarations: [
    SolicitarTurnoComponent,CaptchaComponent, 

  ],
  imports: [
    CommonModule,
    SolicitarTurnoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     NgxCaptchaModule,NavbarModule

  ],
  exports:[NavbarModule],
  providers:[{ provide: 'siteKey', useValue: 'gestionTurnos' }]
})
export class SolicitarTurnoModule { }
