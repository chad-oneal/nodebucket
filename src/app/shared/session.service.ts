/*
============================================
; Title: session.service.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: session.service.ts
============================================
*/

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// injectable
@Injectable({
  providedIn: 'root'
})

// export class
export class SessionService {

  // constructor
  constructor(private http: HttpClient) { }

  // findEmployeeById API
  findEmployeeById(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId)
  }
}
