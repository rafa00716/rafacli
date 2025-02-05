import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const excludedUrls = ['/auth/login'];
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }
  const authService = inject(AuthService);

  const accessToken = authService.getToken();

  if (accessToken) {
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
    return next(modifiedReq);
  }
  
  return next(req);
};
