/*
============================================
; Title: base-layout.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 03/25/2023
; Description: base-layout.component.ts
============================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// component
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

// export class
export class BaseLayoutComponent implements OnInit {
  sessionName: string

  year: number

  //  constructor
  constructor(private cookieService: CookieService, private router: Router) {
    this.sessionName = this.cookieService.get('session_name')
    this.year = Date.now()
  }

  ngOnInit(): void {
  }

  // logout function
  logout() {
    this.cookieService.deleteAll()
    this.router.navigate(['/session/login'])
  }
}
