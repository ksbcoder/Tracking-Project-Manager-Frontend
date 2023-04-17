import { TestBed } from '@angular/core/testing';

import { HasRoleGuard } from './has-role.guard';
import { Route, ActivatedRouteSnapshot } from '@angular/router';

describe('HasRoleGuard', () => {
  let guard: HasRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access for users with allowed roles', () => {
    //Arrange
    spyOn(localStorage, 'getItem').and.returnValue('1'); // Admin
    const route = { data: { allowedRoles: [1] } } as Route;
    //Act And Assert
    expect(guard.canLoad(route)).toBeTrue();
    expect(guard.canActivate({ data: route.data } as ActivatedRouteSnapshot)).toBeTrue();
  });

  it('should prevent access if user role is not set', () => {
    //Arrange
    spyOn(localStorage, 'getItem').and.returnValue('0'); // Default
    const route = { data: { allowedRoles: [1, 2] } } as Route;
    //Act And Assert
    expect(guard.canLoad(route)).toBeFalse();
    expect(guard.canActivate({ data: route.data } as ActivatedRouteSnapshot)).toBeFalse();
  });
});
