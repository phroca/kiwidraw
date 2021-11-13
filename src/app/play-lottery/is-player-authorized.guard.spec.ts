import { TestBed } from '@angular/core/testing';

import { IsPlayerAuthorizedGuard } from './is-player-authorized.guard';

describe('IsPlayerAuthorizedGuard', () => {
  let guard: IsPlayerAuthorizedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPlayerAuthorizedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
