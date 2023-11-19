import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';
@NgModule({
  declarations: [
    MiPerfilComponent, 
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    FormsModule,
    NavbarModule
  ],
  providers:[StorageService, AuthService],
  exports:[NavbarModule]
})
export class MiPerfilModule { }
