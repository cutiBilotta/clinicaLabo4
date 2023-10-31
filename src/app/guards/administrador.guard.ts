import { DataBaseService } from '../services/database.service';
import { Usuario } from '../classes/usuario';
import { switchMap, of } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';



export const AdministradorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const database = inject(DataBaseService);
  const router = inject(Router);

  return authService.getUserEmail().pipe(
    switchMap((userEmail) => {
      if (userEmail) {
        const email = userEmail;
        const usuarioEncontrado = database.usuarios.find((usuario: Usuario) => usuario.email == email);

        if (usuarioEncontrado && (usuarioEncontrado.perfil == 'administrador' || usuarioEncontrado.perfil == 'Administrador')) {
          console.log("Administrador True");
          return of(true); // Usuario administrador, permite el acceso
        }
      }

      // Si no es administrador o no hay un usuario autenticado, redirige a otra página o devuelve false según tus necesidades
      //router.navigate(['/login']); // Puedes redirigir a otra página
      return of(false);
    })
  );
};






