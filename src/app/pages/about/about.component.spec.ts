/*
============================================
; Title: about.component.ts
; Author: Chad ONeal
; Date: 04/05/2023
; Description: about.component.ts
============================================
*/

// import statement
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

// description and declaration of variables
describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
