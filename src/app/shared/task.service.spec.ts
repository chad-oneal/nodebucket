/*
============================================
; Title: task.service.spec.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/30/2023
; Description: task.service.spec.ts
============================================
*/

// Import statements
import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

// Testbed
describe('TaskService', () => {
  let service: TaskService;

  // Before each
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
