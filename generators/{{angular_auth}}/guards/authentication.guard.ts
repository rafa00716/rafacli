import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.currentUser() === null) {
    authService.navigateLogin();
    return false;
  } else if (authService.currentUser() === undefined) {
    return authService.getProfile().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  } else {
    return true;
  }
};
