/*
============================================
; Title: not-found.component.ts
; Author: Chad ONeal
; Date: 04/05/2023
; Description: for nodebucket
============================================
*/

// import statement
import { Component, OnInit } from '@angular/core';

// tells which component to use
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

// export class
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
