import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    RegistroComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [RegistroEspecialistaComponent, RegistroPacienteComponent],
})
export class RegistroModule { }
