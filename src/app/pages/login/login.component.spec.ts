/*
============================================
; Title: login.component.spec.ts
; Author: Professor Krasso
: Modified by: Chad ONeal
; Date: 03/25/2023
; Description: login.component.spec.ts
============================================
*/

// import statements
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

// description and declaration of component
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // async function
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    // create component
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
