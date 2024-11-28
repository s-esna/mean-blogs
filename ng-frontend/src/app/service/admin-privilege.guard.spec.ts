import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminPrivilegeGuard } from './admin-privilege.guard';

describe('adminPrivilegeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminPrivilegeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
