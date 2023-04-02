/*
============================================
, Title: contact-us.component.ts
; Author: Chad ONeal
; Date: 03/30/2023
; Description: contact-us.component.ts
============================================
*/

// import statement
import { Component, OnInit } from '@angular/core';

// tells which css and html files to use
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

// export statement
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

