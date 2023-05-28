import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree, CanActivateFn } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { NavigationPath } from 'src/app/core/navigation/models/navigation.interface';
import { UserModalService } from '../services/user-modal.service';

const isAuthFn = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  const userModalService = inject(UserModalService);

  return userAuthService.checkAuth().pipe(
    map((data) => {
      const route = router.url.split('/')[1];

      if (data) {
        return true;
      } else {
        if (
          route === NavigationPath.Cart ||
          route === NavigationPath.UserAccount
        ) {
          return router.parseUrl(NavigationPath.Flights);
        } else {
          userModalService.isUserModalOpen = true;
          return false;
        }
      }
    }),
    catchError(() => {
      const route = router.url.split('/')[1];

      userModalService.isUserModalOpen = true;

      if (
        route === NavigationPath.Cart ||
        route === NavigationPath.UserAccount
      ) {
        return of(router.parseUrl(NavigationPath.Flights));
      } else {
        return of(
          router.createUrlTree([], { queryParamsHandling: 'preserve' })
        );
      }
    })
  );
};

export const canActivate: CanActivateFn = isAuthFn;
export const canMatch: CanMatchFn = isAuthFn;
