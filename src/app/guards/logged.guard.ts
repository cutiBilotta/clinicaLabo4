import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const LoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        return false; 
      }
    })
  );
};