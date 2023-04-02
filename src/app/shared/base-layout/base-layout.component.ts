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
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

// component
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
  providers: [MessageService, ConfirmationService]
})

// export class
export class BaseLayoutComponent implements OnInit {
  sessionName: string

  year: number

  //  constructor
  constructor(private cookieService: CookieService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.sessionName = this.cookieService.get('session_name')
    this.year = Date.now()
  }

  ngOnInit(): void {
  }

  // logout function
  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to proceed?',
      header: 'Log out confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cookieService.deleteAll()
        this.router.navigate(['/session/login'])
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Log out cancelled' });
            break
            case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Log out cancelled' });
            break
        }
      }
    })
  }
}