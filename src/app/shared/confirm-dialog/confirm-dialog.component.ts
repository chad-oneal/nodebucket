/*
============================================
; Title: confirm-dialog.component.ts
; Author: Professor Krasso
; Modified by: Chad ONeal
; Date: 04/07/2023
; Description: for nodebucket
============================================
*/

// import statement
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data.interface';

// tells which component to use
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

// Export class
export class ConfirmDialogComponent implements OnInit {
  dialogData: DialogData

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData =data
  }

  ngOnInit(): void {
  }
}
