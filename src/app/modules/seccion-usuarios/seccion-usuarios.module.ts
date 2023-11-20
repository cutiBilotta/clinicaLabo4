import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios/seccion-usuarios.component';

import { RegistroModule } from '../registro/registro.module';
import { InformacionUsuariosComponent } from './informacion-usuarios/informacion-usuarios.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './turnos/turnos.component';
import { NavbarModule } from '../navbar/navbar.module';
import { HistoriasComponent } from './historias/historias.component';


@NgModule({
  declarations: [
    SeccionUsuariosComponent,
    InformacionUsuariosComponent,
    RegistroAdminComponent,
    TurnosComponent,
    HistoriasComponent
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule,
    RegistroModule,ReactiveFormsModule, NavbarModule,
    
  ],
  exports:[NavbarModule]
})
export class SeccionUsuariosModule { }
