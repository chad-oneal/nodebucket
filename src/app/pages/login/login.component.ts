/*
============================================
; Title: login.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: login.component.ts
============================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../../shared/session.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Employee } from '../../shared/models/employee.interface';

// component
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// export class
export class LoginComponent implements OnInit {

  errorMessages: Message[] = []
  employee: Employee;

  loginForm: FormGroup = this.fb.group({
    empId: [
      null,
      Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")]),
    ],
  });

  // constructor
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private sessionService: SessionService) {
    this.employee = {} as Employee
  }

  ngOnInit(): void {
  }

  // login function
  login() {
    const empId = this.loginForm.controls['empId'].value

    // subscribe to session service
    this.sessionService.findEmployeeById(empId).subscribe({
      next: (res: any) => {
        if (res) {
          this.employee = res;
          this.cookieService.set('session_user', this.employee.empId.toString(), 1)
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1)
          this.router.navigate(['/'])
        } else {
          this.errorMessages = [
            { severity: 'error', summary: 'Error', detail: 'Please enter a valid empId to continue.' }
          ]
        }

      },
      // error message
      error: (err) => {
        console.error(err)
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message }
        ]
      }
    })
  }

}
