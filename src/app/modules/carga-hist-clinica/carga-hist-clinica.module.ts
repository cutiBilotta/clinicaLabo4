import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaHistClinicaRoutingModule } from './carga-hist-clinica-routing.module';
import { CargaHistClinicaComponent } from './carga-hist-clinica/carga-hist-clinica.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CargaHistClinicaComponent
  ],
  imports: [
    CommonModule,
    CargaHistClinicaRoutingModule,
    NavbarModule, FormsModule
  ],
  exports:[NavbarModule]
})
export class CargaHistClinicaModule { }
