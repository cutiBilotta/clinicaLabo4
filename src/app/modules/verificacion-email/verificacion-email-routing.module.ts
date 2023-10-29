import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvioMailVerificacionComponent } from './envio-mail-verificacion/envio-mail-verificacion.component';
const routes: Routes = [
  {
    path: '',
    component: EnvioMailVerificacionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificacionEmailRoutingModule { }
