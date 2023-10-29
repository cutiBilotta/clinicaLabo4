import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificacionEmailRoutingModule } from './verificacion-email-routing.module';
import { EnvioMailVerificacionComponent } from './envio-mail-verificacion/envio-mail-verificacion.component';

@NgModule({
  declarations: [EnvioMailVerificacionComponent],
  imports: [
    CommonModule,
    VerificacionEmailRoutingModule
  ]
})
export class VerificacionEmailModule { }
