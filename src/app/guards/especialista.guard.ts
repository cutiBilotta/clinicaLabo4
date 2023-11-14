import { DataBaseService } from '../services/database.service';
import { Usuario } from '../classes/usuario';
import { switchMap, of } from 'rxjs';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const especialistaGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const database = inject(DataBaseService);
  const router = inject(Router);

  return authService.getUserEmail().pipe(
    switchMap((userEmail) => {
      if (userEmail) {
        console.log(userEmail);
        const email = userEmail;
        const usuarioEncontrado = database.usuarios.find((usuario: Usuario) => usuario.email == email);

        if (usuarioEncontrado && (usuarioEncontrado.perfil.toLocaleLowerCase()!= 'especialista')) {
          return of(true); // Usuario administrador, permite el acceso
        }
      }

  
      return of(false);
    })
  );
};
