import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SolicitarTurnoModule } from '../solicitar-turno/solicitar-turno.module';

@NgModule({
  declarations: [
    HomeComponent,
    MisTurnosComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SolicitarTurnoModule
  ]
})
export class HomeModule { }
