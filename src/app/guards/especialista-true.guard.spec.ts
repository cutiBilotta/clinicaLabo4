import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { especialistaTrueGuard } from './especialista-true.guard';

describe('especialistaTrueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => especialistaTrueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
