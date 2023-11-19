import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SolicitarTurnoModule } from '../solicitar-turno/solicitar-turno.module';
import { NavbarModule } from '../navbar/navbar.module';
@NgModule({
  declarations: [
    HomeComponent, 
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SolicitarTurnoModule,
    NavbarModule

  ],
  exports:[NavbarModule]
})
export class HomeModule { }
