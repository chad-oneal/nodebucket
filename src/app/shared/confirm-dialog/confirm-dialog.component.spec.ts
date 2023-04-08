/*
============================================
; Title: confirm-dialog.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/04/2023
; Description: confirm-dialog.component.spec.ts
============================================
*/

// import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';

// description and declaration of variables
describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
