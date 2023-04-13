import { TestBed } from '@angular/core/testing';

import { AdminRoleGuard } from './admin-role.guard';

describe('AdminRoleGuardGuard', () => {
  let guard: AdminRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
