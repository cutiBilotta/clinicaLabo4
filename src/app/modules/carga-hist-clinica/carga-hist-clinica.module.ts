import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaHistClinicaRoutingModule } from './carga-hist-clinica-routing.module';
import { CargaHistClinicaComponent } from './carga-hist-clinica/carga-hist-clinica.component';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    CargaHistClinicaComponent
  ],
  imports: [
    CommonModule,
    CargaHistClinicaRoutingModule,
    NavbarModule
  ],
  exports:[NavbarModule]
})
export class CargaHistClinicaModule { }
