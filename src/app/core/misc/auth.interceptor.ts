import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // I managed to exceed the rate limit 🙀)
  // this should be skipped in case the environment file is not present
  const authToken = environment.githubToken;

  if (environment.githubToken !== undefined) {
    console.warn(
      'There is no auth token present in the environment file. Skipping the interceptor.'
    );
    return next(req);
  }

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(modifiedReq);
};
