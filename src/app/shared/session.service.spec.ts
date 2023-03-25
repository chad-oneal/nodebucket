/*
============================================
; Title: session.service.spec.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2032
; Description: session.service.spec.ts
============================================
*/

// import statements
import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';

// setup session service
describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
