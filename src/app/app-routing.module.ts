import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorGuard } from './guards/administrador.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full'  
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./modules/bienvenida/bienvenida.module')
      .then(mod => mod.BienvenidaModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/registro/registro.module')
      .then(mod => mod.RegistroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'verificacion',
    loadChildren: () => import('./modules/verificacion-email/verificacion-email.module')
    .then(mod => mod.VerificacionEmailModule)
  },
  {
    path: 'seccion-usuarios',
    loadChildren: () => import('./modules/seccion-usuarios/seccion-usuarios.module')
    .then(mod => mod.SeccionUsuariosModule),
    canActivate : [AdministradorGuard]
  },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
