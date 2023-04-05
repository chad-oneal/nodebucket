/*
============================================
; Title: about.component.ts
; Author: Chad ONeal
; Date: 04/05/2023
; Description: about.component.ts
============================================
*/

// import statement
import { Component, OnInit } from '@angular/core';

// tells which component to use
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

// export class
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
