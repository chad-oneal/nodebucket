/*
============================================
; Title: auth.guard.spec.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: auth.guard.spec.ts for nodebucket
============================================
*/

// import statements
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

// setup auth guard
describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
