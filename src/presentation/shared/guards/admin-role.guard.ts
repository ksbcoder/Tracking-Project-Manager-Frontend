import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/base/utils/enums';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate, CanLoad {
  canLoad(route: Route): boolean | Observable<boolean> {
    return this.allowedRoles(route);
  }
  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    return this.allowedRoles(route);
  }

  private allowedRoles(route: Route | ActivatedRouteSnapshot) {
    const allowedRoles = route.data?.['allowedRoles'];
    const userRole = parseInt(localStorage.getItem('role') ?? '0');
    return Boolean(userRole && allowedRoles.includes(userRole));
  }
}

export function allowedRoles(allowedRoles: Roles[]) {
  return () => {
    const userRole = parseInt(localStorage.getItem('role') ?? '0');

    console.log(userRole);
    return Boolean(userRole && allowedRoles.includes(userRole));
  };
}
