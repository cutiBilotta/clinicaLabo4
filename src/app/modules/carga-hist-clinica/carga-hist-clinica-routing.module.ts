import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaHistClinicaComponent } from './carga-hist-clinica/carga-hist-clinica.component';

const routes: Routes = [
  {
    path: '',
    component: CargaHistClinicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaHistClinicaRoutingModule { }
