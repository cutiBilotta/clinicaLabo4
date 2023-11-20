import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MisTurnosComponent, 
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    NavbarModule,
    FormsModule
  ],
  exports:[NavbarModule]

})
export class MisTurnosModule { }
